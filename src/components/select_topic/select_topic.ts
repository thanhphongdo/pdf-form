import { Component, Prop, Vue } from 'vue-property-decorator'
import { BaseVue } from '../../shared/components/index'
import template from './select_topic.vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { Topic } from '../../models/index'
import { GetTopicBySource, SetTopicBySource } from '../../interfaces/index'

@Component({
  name: 'SelectTopic',
  mixins: [template],
  computed: mapGetters(['getTopicBySource']),
  methods: {
    ...mapActions(['setTopicBySource', 'selectTopic'])
  }
})
export default class SelectTopic extends BaseVue {
	@Prop() private msg!: string;

	getTopicBySource!: GetTopicBySource;

	setTopicBySource!: SetTopicBySource;
	selectTopic: any;

	mounted () {
    var self = this;
	  this.setTopicBySource('EoT3y7nabE').then(data => {
			self.hideWaiting();
		}).catch(err => {
			self.hideWaiting();
		})
	}

	nextTopic () {
	  this.$emit('selectTopicAction', {

	  })
	}

  // selectTopic(){
  //     this.setTopicBySource('EoT3y7nabE');
  //     // this.$emit('selectTopicAction', {
  //     //     Topic: ''
  //     // })
  // }
}
