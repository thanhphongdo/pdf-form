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
import { AnswerType } from '../../enums'
import { formData } from './form_data'
import * as M from 'materialize-css'
import 'ag-grid-enterprise'
import { Grid, GridOptions, GridApi, ColDef, ColumnApi } from 'ag-grid-community'
// import {  } from 'ag-grid-enterprise';
import * as jQuery from 'jquery'
import { LicenseManager } from 'ag-grid-enterprise'
var pdfJS: PDFJSStatic = <any>PdfJSModule
var interact = require('interactjs')
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
  @Prop() private pagePerFormProp!: number;
  private pdfViewer !: PdfJSModule.PDFDocumentProxy;
  private pagination: Pagination = new Pagination();
  private formData: Array<QAInterface> = JSON.parse(JSON.stringify(formData));
  private showFormFlag: boolean = false;
  public getQAData!: GetQAData;
  public answer: any;
  private previewAnswerModal!: M.Modal;
  private gridOptions!: GridOptions;
  private previewGrid!: Grid;
  private pagePerForm: number = 1;
  data () {
    return {
      pagePerForm: this.pagePerFormProp || 1
    }
  }
  mounted () {
    // if(!this.pagePerFormProp) this.pagePerForm = this.pagePerFormProp;
    var self = this
    this.pagination = new Pagination(new PaginationConfig({
      enableLoading: true,
      getDataFunc: (page: number, perPage: number) => {
        self.showFormFlag = false
        self.formData = []
        return new Promise((resolve, reject) => {
          self.showWaiting()
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
            self.hideWaiting()
            return
          }
          if (page < 1) {
            self.pagination.config.page = 1
            self.hideWaiting()
            return
          }
          let formPageForm = (page - 1) * self.pagePerForm + 1
          let toPageForm = page * self.pagePerForm
          let renderPageArr = []
          let countpageForm = 1
          for (let i = formPageForm; i <= toPageForm; i++) {
            renderPageArr.push(self.renderForm(i, 'form' + countpageForm))
            countpageForm++
          }
          Promise.all(renderPageArr).then(() => {
            resolve()
          }).catch((errMessage) => {
            console.log(errMessage)
            reject()
          })
          // self.renderForm(page, 'form1').then(() => {
          //   resolve()
          // })
        })
      }
    }))

    this.previewAnswerModal = M.Modal.init(document.querySelector('#previewAnswerModal') as Element)
    window.onkeyup = (event) => {
      if (event.ctrlKey && event.keyCode == 39) {
        self.pagination.nextPage()
      }
      if (event.ctrlKey && event.keyCode == 37) {
        self.pagination.prevPage()
      }
    }
  }

  renderForm (page: number, formId: string) {
    var self = this
    var pdfScale = 1.5
    return new Promise((resolve, reject) => {
      var renderPDFContext = (<HTMLCanvasElement>document.getElementById(formId))
      return self.pdfViewer.getPage(page).then(page => {
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
        return page.render(renderContext).then((onResolve) => {
          resolve()
          setTimeout(() => {
            self.showFormFlag = true
          }, 100)
          setTimeout(() => {
            // document.getElementsByClassName('question')[0].getElementsByClassName('answer')[0].children[2].focus()
            if (self.formData && self.formData[0].answers[0].type == AnswerType.CHECKBOX) {
              $('.question').first().find('.answer').first().children().last().focus()
            }
            if (self.formData && self.formData[0].answers[0].type == AnswerType.TEXTBOX) {
              $('.question').first().find('.answer').find('input').focus()
            }
            self.hideWaiting()
          }, 200)
        }, errMessage => {
          reject(errMessage)
          self.hideWaiting()
        })
      }, errMessage => {
        self.hideWaiting()
        reject(errMessage)
      })
    })
  }

  canvasList () {
    let canvas: any[] = []
    for (let i = 0; i < this.pagePerForm; i++) {
      canvas.push({
        id: 'form' + (i + 1)
      })
    }
    return canvas
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
          self.pagination.config.numOfPage = pdf.numPages / self.pagePerForm
          self.pagination.firstPage()
        })
      }
      reader.readAsArrayBuffer(file[0])
    }
  }

  showAnswerPreview () {
    this.previewAnswerModal.open()
    var data = this.getQAData() as FormDataInterface[]
    var previewData: any[] = []
    var previewDataHeader: any[] = []
    data.forEach((item, index) => {
      var dataItem: any = {}
      dataItem.no = index
      item.qa.forEach(qaItem => {
        var col = 'Q' + qaItem.question.label + '_'
        qaItem.answers.forEach(ansItem => {
          if (!ansItem.type || ansItem.type == AnswerType.CHECKBOX) {
            dataItem[col + ansItem.label] = ansItem.checked ? ansItem.label : ''
          } else if (ansItem.type == AnswerType.TEXTBOX) {
            dataItem[col + ansItem.label] = ansItem.value
          }
        })
      })
      previewData.push(dataItem)
    })
    previewDataHeader.push({
      headerName: 'No.',
      field: 'no',
      width: 70,
      resizable: true,
      pinned: 'left',
      filter: 'agTextColumnFilter'
    })
    this.formData.forEach(item => {
      var col = 'Q' + item.question.label + '_'
      // var dataHeaderItem: any = {};
      item.answers.forEach(ansItem => {
        previewDataHeader.push({
          headerName: col + ansItem.label + ') ' + ansItem.content,
          field: col + ansItem.label,
          width: 100,
          resizable: true,
          filter: 'agTextColumnFilter'
        })
      })
    })
    if (!this.previewGrid) {
      this.gridOptions = {
        defaultColDef: {
          enableValue: true,
          enableRowGroup: true,
          enablePivot: true,
          sortable: true,
          filter: true
        },
        sideBar: true,
        columnDefs: previewDataHeader,
        enableRangeSelection: true,
        rowData: previewData
      }
      let eGridDiv: HTMLElement = <HTMLElement>document.querySelector('#previewDataGrid')
      this.previewGrid = new Grid(eGridDiv, this.gridOptions)
    } else {
      (this.gridOptions.api as GridApi).setRowData(previewData)
    }
    (this.gridOptions.columnApi as ColumnApi).autoSizeAllColumns();
    (this.gridOptions.api as GridApi).closeToolPanel()
    // (<any>window).x = this.gridOptions;
  }

  exportCsv () {
    var columnKeys = []
    for (var i = 0; i < (this.gridOptions.columnDefs as ColDef[]).length; i++) {
      columnKeys.push((this.gridOptions.columnDefs as ColDef[])[i].field)
    }
    columnKeys.splice(0, 1)
    var params = {
      skipHeader: false,
      skipFooters: true,
      skipGroups: true,
      fileName: 'export.csv'
    };
    (this.gridOptions.api as GridApi).exportDataAsCsv(params)
  }

  onAnswer (question: QuestionInterface) {
    this.formData[question.id].question = question
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
