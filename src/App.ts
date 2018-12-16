import { Component, Vue } from 'vue-property-decorator'
import template from '@/App.vue'
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import { Actions, Getters } from './enums'
import * as M from 'materialize-css'
var MC: any = M
@Component({
  mixins: [template],
  data () {
    return {}
  },
  mounted () {
    MC.AutoInit()
  },
  methods: {},
  computed: {},
  destroyed: function () {
    console.log('destroyed home')
  }
})
export default class App extends Vue { }
// export default {
//     name: "App",
//     components: {},
//     data() {
//         return {};
//     },
//     mounted() {
//         M.AutoInit();
//     },
//     methods: {},
//     computed: {}
// };
