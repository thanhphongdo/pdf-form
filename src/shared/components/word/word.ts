import { Component, Prop, Vue } from 'vue-property-decorator'
import { BaseVue } from '../index'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import template from './word.vue'
import { Word } from '../../../models/index'
declare var Swiper: any
@Component({
  name: 'Word',
  mixins: [template],
  methods: {
    ...mapActions(['selectWord'])
  }
})
export default class WordCompenent extends BaseVue {
	@Prop() private word!: Word;
	@Prop() private sourceId!: string;
	private selectWord: any;

	mounted () {
	  console.log(this.word)
	}

	select () {
	  this.selectWord({ word: this.word, sourceId: this.sourceId })
	  this.$emit('onSelected', this.word)
	}
}
