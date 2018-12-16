import { Component, Prop, Vue } from 'vue-property-decorator'
import template from './hello_world.vue'

@Component({
  name: 'HelloWorld',
  mixins: [template]
})
export default class HelloWorld extends Vue {
    @Prop() private msg!: string;
}
