import { Component, Prop, Vue } from 'vue-property-decorator'
import { BaseVue } from '../index'
import template from './carousel.vue'
declare var Swiper: any
@Component({
  name: 'Carousel',
  mixins: [template]
})
export default class Carousel extends BaseVue {
	@Prop() private msg!: string;
	private swiper: any;

	mounted () {
	  var self = this
	  setTimeout(() => {
	    self.swiper = new Vue.prototype.Swiper('.swiper-container')
	  }, 1000)
	}

	removeSlideAt (index: number) {
	  this.swiper.removeSlide(index)
	}

	removeCurrentSlide () {
	  this.swiper.removeSlide(this.swiper.activeIndex)
	}
}
