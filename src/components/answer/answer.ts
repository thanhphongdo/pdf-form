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


  private prop: AnswerInterface = {};

  constructor() {
    super();
  }

  mounted() {
    var self = this;
    this.prop.type = this.type || 'checkbox';
    this.prop.width = this.width || 30;
    this.prop.height = this.height || 30;
    this.prop.x = this.x || 0;
    this.prop.y = this.y || 0;
    this.prop.label = this.label || '';
    this.prop.content = this.content || '';
    this.prop.value = this.value || null;
    this.prop.bgColor = this.bgColor || '#7cb342',
    this.prop.opacity= this.opacity || 0.2;
    this.prop.borderColor= this.borderColor || '#7cb342';
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
        self.prop.x = x;
        self.prop.y = y;
        self.prop.width = event.rect.width;
        self.prop.height = event.rect.height;
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
      self.prop.x = x;
      self.prop.y = y;
    }

    this.setPosition();
    this.setSize();
    this.setStyle();
  }
  
  getInfo(){
    console.log(this.prop);
  }

  setPosition() {
    (<HTMLDivElement>this.$refs.answer).style.transform = 'translate(' + (this.prop.x || 0) + 'px, ' + (this.prop.y || 0) + 'px)';
    (<HTMLDivElement>this.$refs.answer).setAttribute('data-x', (this.prop.x || 0) + '');
    (<HTMLDivElement>this.$refs.answer).setAttribute('data-y', (this.prop.y || 0) + '');
  }

  setSize() {
    (<HTMLDivElement>this.$refs.answer).style.width = (this.prop.width || 0) + 'px';
    (<HTMLDivElement>this.$refs.answer).style.height = (this.prop.height || 0) + 'px';
  }

  setStyle(){
    (<HTMLDivElement>this.$refs.answer).style.backgroundColor = this.hexToRgb(this.prop.bgColor as string, this.prop.opacity);
    (<HTMLDivElement>this.$refs.answer).style.border = '1px solid ' + this.hexToRgb(this.prop.borderColor as string, 1);
  }

  hexToRgb(hex: string, opacity?: number) {
    if (opacity == undefined) opacity = 1;
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return '';
    return 'rgba(' + parseInt(result[1], 16) + ',' + parseInt(result[2], 16) + ',' + parseInt(result[3], 16) + ',' + opacity + ')';
  }
}
