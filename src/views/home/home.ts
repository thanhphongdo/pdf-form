import { Component, Vue } from 'vue-property-decorator'
import FirstFlow from '@/components/first_flow/first_flow.ts'
import template from './home.vue'

@Component({
  mixins: [template],
  components: {
    FirstFlow
  },
  data () {
    return {
      active: null,
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'
    }
  },
  destroyed: function () {
    console.log('destroyed home')
  }
})
export default class Home extends Vue { }
