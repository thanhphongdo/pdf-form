import { Component, Prop, Vue } from 'vue-property-decorator'
import template from './create_form.vue'
import { QuestionInterface, AnswerInterface, QAInterface, GetQAData, FormDataInterface } from '../../interfaces/index'
import { mapGetters, mapActions } from 'vuex'
import { BaseVue } from '../../shared/components/index'
import * as PdfJSModule from 'pdfjs-dist'
import { PDFJSStatic } from 'pdfjs-dist'
import { Pagination, PaginationConfig } from 'pagination-tools'
import Question from '@/components/question/question.ts'
import Answer from '@/components/answer/answer.ts'
import { formData } from './form_data'
import * as M from 'materialize-css'
var pdfJS: PDFJSStatic = <any>PdfJSModule
var interact = require('interactjs')
import { Grid, GridOptions, GridApi } from 'ag-grid-community';
import * as jQuery from 'jquery'
var $: JQueryStatic = jQuery.default

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
  public getQAData!: GetQAData;
  public answer: any;
  private previewAnswerModal!: M.Modal;
  private gridOptions!: GridOptions;
  mounted() {
    var self = this
    this.pagination = new Pagination(new PaginationConfig({
      enableLoading: true,
      getDataFunc: (page: number, perPage: number) => {
        var pdfScale = 1.5
        self.showFormFlag = false
        self.formData = []
        return new Promise((resolve, reject) => {
          self.showWaiting();
          setTimeout(() => {
            self.showFormFlag = true
            if (self.getQAData(page)) {
              self.formData = (self.getQAData(page) as FormDataInterface).qa
            } else {
              self.formData = JSON.parse(JSON.stringify(formData))
            }
          }, 200)
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
            setTimeout(() => {
              // document.getElementsByClassName('question')[0].getElementsByClassName('answer')[0].children[2].focus()
              $('.question').first().find('.answer').first().children().last().focus();
              self.hideWaiting();
            }, 200)
            page.render(renderContext).then(()=>{
              resolve()
            })
          })
        })
      }
    }))

    this.previewAnswerModal = M.Modal.init(document.querySelector('#previewAnswerModal') as Element);
    window.onkeyup = (event)=>{
      if(event.ctrlKey && event.keyCode == 39){
        self.pagination.nextPage();
      }
      if(event.ctrlKey && event.keyCode == 37){
        self.pagination.prevPage();
      }
    }
  }

  preview() {
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

  showAnswerPreview() {
    this.previewAnswerModal.open();
    var data = this.getQAData() as FormDataInterface[];
    var previewData: any[] = [];
    var previewDataHeader: any[] = [];
    data.forEach(item => {
      var dataItem: any = {};
      item.qa.forEach(qaItem => {
        var col = 'Q' + qaItem.question.id + '_';
        qaItem.answers.forEach(ansItem => {
          dataItem[col + ansItem.label] = ansItem.checked || false;
        })
      })
      previewData.push(dataItem)
    })
    this.formData.forEach(item => {
      var col = 'Q' + item.question.id + '_';
      // var dataHeaderItem: any = {};
      item.answers.forEach(ansItem => {
        previewDataHeader.push({
          headerName: col + ansItem.label, 
          field: col + ansItem.label,
          width: 80
        })
      })
    });
    this.gridOptions = {
      columnDefs: previewDataHeader,
      rowData: previewData
    };
    let eGridDiv: HTMLElement = <HTMLElement>document.querySelector('#previewDataGrid');
    new Grid(eGridDiv, this.gridOptions);
    // (<any>window).x = this.gridOptions;
  }

  exportCsv() {
    var params = {
      skipHeader: false,
      skipFooters: true,
      skipGroups: true,
      fileName: "export.csv"
    };
    (this.gridOptions.api as GridApi).exportDataAsCsv(params);
  }

  onAnswer(question: QuestionInterface) {
    for (var i = 0; i < this.formData.length; i++) {
      if (this.formData[i].question.id == question.id) {
        this.formData[i].answers = question.answers as AnswerInterface[]
      }
    }
    this.answer({
      qa: this.formData,
      id: this.pagination.config.page
    })
  }
}
