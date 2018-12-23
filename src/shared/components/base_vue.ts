import { Component, Prop, Vue } from 'vue-property-decorator'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { GetSharedData, SetSharedData } from '../../interfaces/index'
import * as jQuery from 'jquery'
var $: JQueryStatic = jQuery.default
@Component({
  name: 'BaseVue',
  computed: mapGetters(['getSharedData']),
  methods: {
    ...mapActions(['setSharedData'])
  }
})
export class BaseVue extends Vue {
  public getSharedData!: GetSharedData;

  public static jQuery = $;

  showWaiting () {
    $('.waiting').css('display', 'flex')
    $('body').css('overflow', 'hidden')
  }

  hideWaiting () {
    $('.waiting').css('display', 'none')
    $('body').css('overflow', 'auto')
  }
}
