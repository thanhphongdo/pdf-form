import { Component, Prop, Vue } from 'vue-property-decorator'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { BaseVue } from '../../shared/components/base_vue'
import template from './first_flow.vue'
import { AuthenAction, LearningSourceEmit, GetTopicBySource, GetSharedData } from '../../interfaces/index'
import { FirstFlowStep } from '../../enums'
import AuthenticationFlow from '@/components/authentication_flow/authentication_flow.ts'
import SelectLevel from '@/components/select_level/select_level.ts'
import SelectTopic from '@/components/select_topic/select_topic.ts'
import SelectWord from '@/components/select_word/select_word.ts'
import { currentUser } from '../../services/parse'
import { LearningSourceService } from '../../services/index'
import { Topic } from '../../models/index'

@Component({
  name: 'FirstFlow',
  computed: mapGetters(['getTopicBySource']),
  components: {
    AuthenticationFlow,
    SelectLevel,
    SelectTopic,
    SelectWord
  },
  mixins: [template]
})
export default class FirstFlow extends BaseVue {
	@Prop() private msg!: string;
	private step: string = FirstFlowStep.AUTHEN;
	private learningSource: LearningSourceEmit = {};
	getTopicBySource!: GetTopicBySource;

	mounted () {
	  if (currentUser()) {
	    console.log(currentUser())
	    this.step = FirstFlowStep.SELECT_LEVEL
	  }
	  this.learningSource.sourceId = this.getSharedData('currentSource')
	}

	onAuthenAction (event: AuthenAction) {
	  console.log('onAuthenAction')
	  if (event.success) {
	    this.step = event.step
	  }
	}

	onSelectLevelAction (event: LearningSourceEmit) {
	  console.log('onSelectLevelAction')
	  this.step = FirstFlowStep.SELECT_TOPIC
	  this.learningSource.levelId = event.levelId
	}

	onSelectTopicAction (event: LearningSourceEmit) {
	  var self = this
	  this.learningSource.topicId = event.topicId
	  var topicIds = <Array<string>> this.getTopicBySource(this.learningSource.sourceId || '').filter(value => {
	    return value.checked
	  }).map(value => {
	    return value.id
	  })
	  LearningSourceService.learnSource(this.learningSource.sourceId, this.learningSource.levelId, topicIds).then(data => {
	    // console.log((<Topic>data[0].topic).name);
	    // self.step = FirstFlowStep.SELECT_WORD;
	    this.$router.push('/select-word')
	  }).catch(err => {
	    console.log(err)
	  })
	}
}
