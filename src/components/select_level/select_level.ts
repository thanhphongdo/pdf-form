import { Component, Prop, Vue } from 'vue-property-decorator'
import { BaseVue } from '../../shared/components/index'
import template from './select_level.vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { Level } from '../../models/index'
import { GetLevelBySource, SetLevelBySource, GetSharedData } from '../../interfaces/index'

@Component({
	name: 'SelectLevel',
	mixins: [template],
	computed: mapGetters(['getLevelBySource']),
	methods: {
		...mapActions(['setLevelBySource', 'test'])
	}
})
export default class SelectLevel extends BaseVue {
	@Prop() private msg!: string;

	getLevelBySource!: GetLevelBySource;

	setLevelBySource!: SetLevelBySource;

	test: any;

	mounted() {
		var self = this;
		this.showWaiting();
		this.setLevelBySource('EoT3y7nabE').then(data => {
			self.hideWaiting();
		}).catch(err => {
			self.hideWaiting();
		})
		this.test()
	}

	selectLevel(levelId: string) {
		this.$emit('selectLevelAction', {
			levelId: levelId
		});
		this.showWaiting();
	}
}
