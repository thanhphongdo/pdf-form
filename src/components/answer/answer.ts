import { Component, Prop, Vue } from 'vue-property-decorator'
import template from './answer.vue'
import { AnswerInterface, GetQAData, FormDataInterface } from '../../interfaces/index'
import { mapGetters, mapActions } from 'vuex'
import { BaseVue } from '../../shared/components/index'
import { AnswerType } from '../../enums'
import * as jQuery from 'jquery'
var interact = require('interactjs')
var $: JQueryStatic = jQuery.default

export interface AnswerStyleInterface {
  bgColor?: string;
  opacity?: number;
  borderColor?: string;
}

@Component({
  name: 'Answer',
  components: {
  },
  mixins: [template],
  computed: mapGetters(['getQAData']),
  methods: {
    ...mapActions([])
  }
})
export default class Answer extends BaseVue {
  @Prop() private formIndex!: number;
  @Prop() private questionIndex!: number;
  // @Prop() private type!: string;
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
  // @Prop() private checked!: boolean;
  // @Prop() private autoIncrement!: boolean;

  @Prop() private answerConfig!: AnswerInterface;

  public answerProp: AnswerInterface = {};
  public getQAData!: GetQAData;

  constructor () {
    super()
  }

  data () {
    return {
      answerProp: {
        type: this.answerConfig.type || AnswerType.CHECKBOX,
        checked: this.answerConfig.checked || false,
        width: this.answerConfig.width || 30,
        height: this.answerConfig.height || 30,
        x: this.answerConfig.x || 0,
        y: this.answerConfig.y || 0,
        label: this.answerConfig.label || '',
        content: this.answerConfig.content || '',
        value: this.answerConfig.value || null,
        bgColor: this.answerConfig.bgColor || '#7cb342',
        opacity: this.answerConfig.opacity || 0.2,
        borderColor: this.answerConfig.borderColor || '#7cb342',
        autoIncrement: this.answerConfig.autoIncrement || false,
        incrementStep: this.answerConfig.incrementStep || 1
      }
    }
  }

  mounted () {
    var self = this
    if (this.answerProp.autoIncrement && this.answerProp.value == null) {
      var prevQAData = this.getQAData(this.formIndex - 1) as FormDataInterface
      if (prevQAData) {
        var value = parseInt(prevQAData.qa[this.questionIndex].answers[0].value as string)
        if (!isNaN(value)) this.answerProp.value = value + (this.answerProp.incrementStep as number)
      }
    }
    setTimeout(() => {
      self.$emit('answer', this.answerProp)
    }, 100)
    interact(this.$refs.answer)
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
        self.answerProp.x = x
        self.answerProp.y = y
        self.answerProp.width = event.rect.width
        self.answerProp.height = event.rect.height
      })

    function dragMoveListener (event: any) {
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
      self.answerProp.x = x
      self.answerProp.y = y
    }

    this.setPosition()
    this.setSize()
    this.setStyle()
  }

  getInfo () {
    console.log(this.answerProp)
  }

  check (check?: boolean) {
    if (this.answerProp.type == AnswerType.TEXTBOX) return
    var ascOpacity = 0.2
    if (this.answerProp.checked == check) ascOpacity = 0
    this.answerProp.checked = !this.answerProp.checked
    if (check != undefined) this.answerProp.checked = check
    if (this.answerProp.checked) {
      (this.answerProp.opacity as number) += ascOpacity
    } else {
      (this.answerProp.opacity as number) -= ascOpacity
    }
    this.$emit('answer', this.answerProp)
    this.setStyle()
  }

  checkByEnter () {
    this.check()
    if ($(this.$refs.answer).next().length) {
      $(this.$refs.answer).next().children().last().focus()
    } else {
      $(this.$refs.answer).parent().next().find('.answer').first().children().last().focus()
    }
  }

  onChangeTextBox (event: any) {
    // console.log(event);
    // this.answerProp.value = event.target.value
    this.$emit('answer', this.answerProp)
  }

  dbClickAnswer (event: KeyboardEvent) {
    event.stopPropagation()
  }

  checkAllKeyDown (event: KeyboardEvent) {
    this.$emit('checkAllKeyDown', event)
  }

  setPosition () {
    (<HTMLDivElement> this.$refs.answer).style.transform = 'translate(' + (this.answerProp.x || 0) + 'px, ' + (this.answerProp.y || 0) + 'px)';
    (<HTMLDivElement> this.$refs.answer).setAttribute('data-x', (this.answerProp.x || 0) + '');
    (<HTMLDivElement> this.$refs.answer).setAttribute('data-y', (this.answerProp.y || 0) + '')
  }

  setSize () {
    (<HTMLDivElement> this.$refs.answer).style.width = (this.answerProp.width || 0) + 'px';
    (<HTMLDivElement> this.$refs.answer).style.height = (this.answerProp.height || 0) + 'px'
  }

  setStyle () {
    (<HTMLDivElement> this.$refs.answer).style.backgroundColor = this.hexToRgb(this.answerProp.bgColor as string, this.answerProp.opacity);
    (<HTMLDivElement> this.$refs.answer).style.border = '1px solid ' + this.hexToRgb(this.answerProp.borderColor as string, 1)
  }

  hexToRgb (hex: string, opacity?: number) {
    if (opacity == undefined) opacity = 1
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (!result) return ''
    return 'rgba(' + parseInt(result[1], 16) + ',' + parseInt(result[2], 16) + ',' + parseInt(result[3], 16) + ',' + opacity + ')'
  }
}
