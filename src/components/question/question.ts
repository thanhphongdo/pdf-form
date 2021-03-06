import { Component, Prop, Vue } from 'vue-property-decorator'
import template from './question.vue'
import { QuestionInterface, AnswerInterface, GetQAData } from '../../interfaces/index'
import { mapGetters, mapActions } from 'vuex'
import { BaseVue } from '../../shared/components/index'
import Answer from '@/components/answer/answer.ts'
import { AnswerType } from '../../enums'
import * as jQuery from 'jquery'
var interact = require('interactjs')
var $: JQueryStatic = jQuery.default

@Component({
  name: 'Question',
  components: {
    Answer
  },
  mixins: [template],
  computed: mapGetters(['getQAData']),
  methods: {
    ...mapActions([])
  }
})
export default class Question extends BaseVue {
  @Prop() private id!: number;
  @Prop() private formIndex!: number;
  @Prop() private questionIndex!: number;
  // @Prop() private width!: number;
  // @Prop() private height!: number;
  // @Prop() private x!: number;
  // @Prop() private y!: number;
  // @Prop() private bgColor!: string;
  // @Prop() private opacity!: number;
  // @Prop() private borderColor!: string;
  // @Prop() private label!: string;
  // @Prop() private content!: string;
  // @Prop() private value!: any;
  @Prop() private answers!: AnswerInterface[];
  // @Prop() private defaultCheckAll!: boolean;
  @Prop() private questionConfig!: QuestionInterface;

  private questionProp: QuestionInterface = {};
  private checkAllFlag: boolean = false;
  public getQAData!: GetQAData;

  data () {
    var data: {
      questionProp?: QuestionInterface
    } = {
      questionProp: {
        id: this.id,
        width: this.questionConfig.width || 30,
        height: this.questionConfig.height || 30,
        x: this.questionConfig.x || 0,
        y: this.questionConfig.y || 0,
        label: this.questionConfig.label || '',
        content: this.questionConfig.content || '',
        value: this.questionConfig.value || null,
        bgColor: this.questionConfig.bgColor || '#7cb342',
        opacity: this.questionConfig.opacity || 0.1,
        borderColor: this.questionConfig.borderColor || '#7cb342',
        answers: this.answers || [],
        defaultCheckAll: this.questionConfig.defaultCheckAll || false
      }
    }
    return data
  }

  mounted () {
    var self = this
    if (this.questionProp.defaultCheckAll) {
      this.questionProp.defaultCheckAll = false
      this.checkAll()
      this.onAnswer
    }
    interact(this.$refs.question)
      .draggable({})
      .resizable({
        preserveAspectRatio: false,
        edges: {
          left: true,
          right: '.resize-handle',
          bottom: '.resize-handle',
          top: true
        }
      })
      .on('dragstart', function (event: any) {
        event.preventDefault()
      })
      .on('dragmove', dragMoveListener)
      .on('resizestart', function (event: any) {
      })
      .on('resizemove', function (event: any) {
        var target = event.target

        var x = (parseFloat(target.getAttribute('data-x')) || 0)

        var y = (parseFloat(target.getAttribute('data-y')) || 0)

        // update the element's style
        target.style.width = event.rect.width + 'px'
        target.style.height = event.rect.height + 'px'

        // translate when resizing from top or left edges
        x += event.deltaRect.left
        y += event.deltaRect.top
        target.style.webkitTransform = target.style.transform =
          'translate(' + x + 'px,' + y + 'px)'

        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
        self.questionProp.x = x
        self.questionProp.y = y
        self.questionProp.width = event.rect.width
        self.questionProp.height = event.rect.height
      })

    function dragMoveListener (event: any) {
      // console.log('drag')
      var target = event.target

      // keep the dragged position in the data-x/data-y attributes

      var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx

      var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

      // translate the element
      target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)'

      // update the posiion attributes
      target.setAttribute('data-x', x)
      target.setAttribute('data-y', y)
      self.questionProp.x = x
      self.questionProp.y = y
    }

    this.setPosition()
    this.setSize()
    this.setStyle()
  }

  checkAll () {
    this.checkAllFlag = !this.checkAllFlag;
    (this.$refs.answer as Answer[]).forEach(item => {
      item.check(this.checkAllFlag)
    })
  }

  checkAllKeyDown (event: KeyboardEvent) {
    if (event.shiftKey && event.ctrlKey && event.keyCode == 65) {
      event.preventDefault()
      this.checkAllFlag = true
      this.checkAll()
      return
    }
    if (event.ctrlKey && event.keyCode == 65) {
      event.preventDefault()
      this.checkAllFlag = false
      this.checkAll()
      $(this.$refs.question).children().last().first().children().last().focus()
      return
    }
    (this.$refs.answer as Answer[]).forEach(item => {
      if (<string>item.answerProp.label && (<string>item.answerProp.label).toLowerCase() == event.key) {
        item.check()
        $(item.$el).first().children().last().focus()
      }
    })
    if (!isNaN(parseInt(event.key)) && (this.$refs.answer as Answer[])[parseInt(event.key) - 1]) {
      (this.$refs.answer as Answer[])[parseInt(event.key) - 1].check()
      $((this.$refs.answer as Answer[])[parseInt(event.key) - 1].$el).first().children().last().focus()
    }
  }

  onAnswer (answer: AnswerInterface) {
    var self = this
    var answers = this.questionProp.answers as AnswerInterface[]
    for (var i = 0; i < answers.length; i++) {
      if (answers[i].label == answer.label) {
        answers[i] = answer
        break
      }
    }
    setTimeout(() => {
      (self.$refs.answer as Answer[]).forEach(item => {
        self.checkAllFlag = true
        self.checkAllFlag = self.checkAllFlag && (item.answerProp.checked as boolean)
      })
    }, 100)
    this.questionProp.answers = answers
    this.questionProp.defaultCheckAll = false
    this.$emit('answer', this.questionProp)
  }

  getInfo () {
    console.log(this.questionProp)
  }

  setPosition () {
    (<HTMLDivElement> this.$refs.question).style.transform = 'translate(' + (this.questionProp.x || 0) + 'px, ' + (this.questionProp.y || 0) + 'px)';
    (<HTMLDivElement> this.$refs.question).setAttribute('data-x', (this.questionProp.x || 0) + '');
    (<HTMLDivElement> this.$refs.question).setAttribute('data-y', (this.questionProp.y || 0) + '')
  }

  setSize () {
    (<HTMLDivElement> this.$refs.question).style.width = (this.questionProp.width || 0) + 'px';
    (<HTMLDivElement> this.$refs.question).style.height = (this.questionProp.height || 0) + 'px'
  }

  setStyle () {
    (<HTMLDivElement> this.$refs.question).style.backgroundColor = this.hexToRgb(this.questionProp.bgColor as string, this.questionProp.opacity);
    (<HTMLDivElement> this.$refs.question).style.border = '1px solid ' + this.hexToRgb(this.questionProp.borderColor as string, 1)
  }

  hexToRgb (hex: string, opacity?: number) {
    if (opacity == undefined) opacity = 1
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (!result) return ''
    return 'rgba(' + parseInt(result[1], 16) + ',' + parseInt(result[2], 16) + ',' + parseInt(result[3], 16) + ',' + opacity + ')'
  }
}
