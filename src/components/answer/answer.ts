import { Component, Prop, Vue } from 'vue-property-decorator'
import template from './answer.vue'
import { AnswerInterface } from '../../interfaces/qa.interface'
import { mapGetters, mapActions } from 'vuex'
import { BaseVue } from '../../shared/components/index'
var interact = require('interactjs');

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
  computed: mapGetters([]),
  methods: {
    ...mapActions([])
  }
})
export default class Answer extends BaseVue {
  @Prop() private type!: string;
  @Prop() private width!: number;
  @Prop() private height!: number;
  @Prop() private x!: number;
  @Prop() private y!: number;
  @Prop() private bgColor!: string;
  @Prop() private opacity!: number;
  @Prop() private borderColor!: string;
  @Prop() private label!: string;
  @Prop() private content!: string;
  @Prop() private value!: any;
  @Prop() private checked!: boolean;


  private answerProp: AnswerInterface = {};

  constructor() {
    super();
  }

  data() {
    return {
      answerProp: {
        checked: this.checked || false,
        width: this.width || 30,
        height: this.height || 30,
        x: this.x || 0,
        y: this.y || 0,
        label: this.label || '',
        content: this.content || '',
        value: this.value || null,
        bgColor: this.bgColor || '#7cb342',
        opacity: this.opacity || 0.2,
        borderColor: this.borderColor || '#7cb342'
      }
    }
  }

  mounted() {
    var self = this;
    // this.answerProp.type = this.type || 'checkbox';
    // this.answerProp.width = this.width || 30;
    // this.answerProp.height = this.height || 30;
    // this.answerProp.x = this.x || 0;
    // this.answerProp.y = this.y || 0;
    // this.answerProp.label = this.label || '';
    // this.answerProp.content = this.content || '';
    // this.answerProp.value = this.value || null;
    // this.answerProp.bgColor = this.bgColor || '#7cb342',
    // this.answerProp.opacity= this.opacity || 0.2;
    // this.answerProp.borderColor= this.borderColor || '#7cb342';
    // this.answerProp.checked= this.checked || false;
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
        event.preventDefault();
      })
      .on('dragmove', dragMoveListener)
      .on('resizestart', function (event: any) {
        console.info('resizestart = ', event);
      })
      .on('resizemove', function (event: any) {
        var target = event.target,
          x = (parseFloat(target.getAttribute('data-x')) || 0),
          y = (parseFloat(target.getAttribute('data-y')) || 0);

        // update the element's style
        target.style.width = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';

        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.webkitTransform = target.style.transform =
          'translate(' + x + 'px,' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
        self.answerProp.x = x;
        self.answerProp.y = y;
        self.answerProp.width = event.rect.width;
        self.answerProp.height = event.rect.height;
      });


    function dragMoveListener(event: any) {
      var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

      // translate the element
      target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

      // update the posiion attributes
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
      self.answerProp.x = x;
      self.answerProp.y = y;
    }

    this.setPosition();
    this.setSize();
    this.setStyle();
  }

  getInfo() {
    console.log(this.answerProp);
  }

  check() {
    this.answerProp.checked = !this.answerProp.checked;
    if (this.answerProp.checked) {
      (this.answerProp.opacity as number) += 0.2;
    } else {
      (this.answerProp.opacity as number) -= 0.2;
    }
    this.setStyle();
  }

  setPosition() {
    (<HTMLDivElement>this.$refs.answer).style.transform = 'translate(' + (this.answerProp.x || 0) + 'px, ' + (this.answerProp.y || 0) + 'px)';
    (<HTMLDivElement>this.$refs.answer).setAttribute('data-x', (this.answerProp.x || 0) + '');
    (<HTMLDivElement>this.$refs.answer).setAttribute('data-y', (this.answerProp.y || 0) + '');
  }

  setSize() {
    (<HTMLDivElement>this.$refs.answer).style.width = (this.answerProp.width || 0) + 'px';
    (<HTMLDivElement>this.$refs.answer).style.height = (this.answerProp.height || 0) + 'px';
  }

  setStyle() {
    (<HTMLDivElement>this.$refs.answer).style.backgroundColor = this.hexToRgb(this.answerProp.bgColor as string, this.answerProp.opacity);
    (<HTMLDivElement>this.$refs.answer).style.border = '1px solid ' + this.hexToRgb(this.answerProp.borderColor as string, 1);
  }

  hexToRgb(hex: string, opacity?: number) {
    if (opacity == undefined) opacity = 1;
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return '';
    return 'rgba(' + parseInt(result[1], 16) + ',' + parseInt(result[2], 16) + ',' + parseInt(result[3], 16) + ',' + opacity + ')';
  }
}
