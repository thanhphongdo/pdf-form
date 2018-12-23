import { Component, Prop, Vue } from 'vue-property-decorator'
import template from './create_form.vue'
import { QuestionInterface, AnswerInterface, QAInterface } from '../../interfaces/qa.interface'
import { mapGetters, mapActions } from 'vuex'
import { BaseVue } from '../../shared/components/index'
import * as PdfJSModule from 'pdfjs-dist'
import { PDFJSStatic } from 'pdfjs-dist'
import { Pagination, PaginationConfig } from 'pagination-tools'
import Question from '@/components/question/question.ts'
import Answer from '@/components/answer/answer.ts'
import { formData } from './form_data'
// import * as jQuery from 'jquery'
// var $: JQueryStatic = jQuery.default
import * as M from 'materialize-css'
var pdfJS: PDFJSStatic = <any>PdfJSModule
var interact = require('interactjs')
// var MC: any = M

@Component({
  name: 'CreateForm',
  components: {
    Question,
    Answer
  },
  mixins: [template],
  computed: mapGetters(['getQAData']),
  methods: {
    ...mapActions(['answer'])
  }
})
export default class CreateForm extends BaseVue {
  private pdfViewer !: PdfJSModule.PDFDocumentProxy;
  private pagination: Pagination = new Pagination();
  private formData: Array<QAInterface> = JSON.parse(JSON.stringify(formData));
  private showFormFlag: boolean = false;
  public getQAData: any;
  public answer: any;
  private previewAnswerModal!: M.Modal;
  mounted () {
    var self = this
    this.pagination = new Pagination(new PaginationConfig({
      getDataFunc: (page: number, perPage: number) => {
        var pdfScale = 1.5
        self.showFormFlag = false
        self.formData = []
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            self.showFormFlag = true
            if (self.getQAData(page)) {
              self.formData = self.getQAData(page).qa
            } else {
              self.formData = JSON.parse(JSON.stringify(formData))
            }
          }, 200)
          console.log(111)
          if (page > self.pagination.config.numOfPage) {
            self.pagination.config.page = self.pagination.config.numOfPage
            return
          }
          if (page < 1) {
            self.pagination.config.page = 1
            return
          }
          var renderPDFContext = (<HTMLCanvasElement>document.getElementById('canvas'))
          self.pdfViewer.getPage(page).then(page => {
            var scale = renderPDFContext.width / page.getViewport(pdfScale).width
            var viewport = page.getViewport(pdfScale)
            var renderContext: PdfJSModule.PDFRenderParams = {
              canvasContext: renderPDFContext.getContext('2d') as CanvasRenderingContext2D,
              viewport: viewport
            }
            renderPDFContext.width = viewport.width
            renderPDFContext.height = viewport.height
            renderPDFContext.style.width = viewport.width + 'px'
            renderPDFContext.style.height = viewport.height + 'px'
            setTimeout(() => {
              self.showFormFlag = true
            }, 100)
            page.render(renderContext)
            resolve()
          })
        })
      }
    }))

    // this.previewAnswerModal = M.Modal.init(document.querySelector('#previewAnswerModal') as Element);
  }

  preview () {
    var self = this
    var file = (<HTMLInputElement>document.getElementById('pdf-file')).files as FileList
    if (file && file.length) {
      var reader = new FileReader()
      reader.onload = data => {
        var fileResult = data.target as FileReader
        var pdf = pdfJS.getDocument({
          data: new Uint8Array(fileResult.result as ArrayBuffer)
        }).then(pdf => {
          self.pdfViewer = pdf
          self.pagination.config.numOfPage = pdf.numPages
          self.pagination.firstPage()
        })
      }
      reader.readAsArrayBuffer(file[0])
    }
  }

  showAnswerPreview () {
    // this.previewAnswerModal.open();
  }

  onAnswer (question: QuestionInterface) {
    for (var i = 0; i < this.formData.length; i++) {
      if (this.formData[i].question.id == question.id) {
        this.formData[i].answers = question.answers as AnswerInterface[]
      }
    }
    this.answer({
      qa: this.formData,
      id: this.pagination.config.page
    })
    console.log(this.formData)
  }
}
