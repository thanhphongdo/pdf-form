import { Component, Vue } from 'vue-property-decorator'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { GetWordBySource, SetWordBySource } from '../../interfaces/index'
import { Word } from '../../models/index'
import SelectWord from '@/components/select_word/select_word.ts'
import template from './select_word.vue'

@Component({
  mixins: [template],
  computed: mapGetters(['getWordBySource']),
  methods: {
    ...mapActions(['setWordBySource'])
  },
  components: {
    SelectWord
  },
  data () {
    return {

    }
  },
  destroyed: function () {
    console.log('destroyed home')
  }
})
export default class Home extends Vue {
    setWordBySource !: SetWordBySource;
    getWordBySource !: GetWordBySource;
    words: Array<Word> = [];
    currentSource:string = 'EoT3y7nabE';

    mounted () {
      var self = this
      this.setWordBySource('EoT3y7nabE')
    }
}
