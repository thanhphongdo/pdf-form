import { Component, Vue } from 'vue-property-decorator'
import template from './home.vue'
import CreateForm from '@/components/create_form/create_form.ts';

@Component({
  mixins: [template],
  components: {
    CreateForm
  },
  data () {
    return {
    }
  },
  destroyed: function () {
  }
})
export default class Home extends Vue { }
