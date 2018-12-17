import { Component, Prop, Vue } from 'vue-property-decorator'
import template from './create_form.vue'
import { mapGetters, mapActions } from 'vuex'
import { BaseVue } from '../../shared/components/index'
import * as PdfJSModule from 'pdfjs-dist';
import { PDFJSStatic } from 'pdfjs-dist';
import { Pagination, PaginationConfig } from 'pagination-tools';
import Question from '@/components/question/question.ts'
var pdfJS: PDFJSStatic = <any>PdfJSModule;
var interact = require('interactjs');

@Component({
  name: 'CreateForm',
  components: {
    Question
  },
  mixins: [template],
  computed: mapGetters([]),
  methods: {
    ...mapActions([])
  }
})
export default class CreateForm extends BaseVue {

  private pdfViewer !: PdfJSModule.PDFDocumentProxy;
  private pagination: Pagination = new Pagination();
  mounted() {
    var self = this;
    this.pagination = new Pagination(new PaginationConfig({
      getDataFunc: (page: number, perPage: number) => {
        return new Promise((resolve, reject) => {
          if (page > self.pagination.config.numOfPage) {
            self.pagination.config.page = self.pagination.config.numOfPage;
            return;
          }
          if (page < 1) {
            self.pagination.config.page = 1;
            return;
          }
          var renderPDFContext = (<HTMLCanvasElement>document.getElementById('canvas'));
          self.pdfViewer.getPage(page).then(page => {
            var scale = renderPDFContext.width / page.getViewport(1).width;
            var viewport = page.getViewport(1);
            var renderContext: PdfJSModule.PDFRenderParams = {
              canvasContext: renderPDFContext.getContext('2d') as CanvasRenderingContext2D,
              viewport: viewport
            }
            renderPDFContext.width = viewport.width;
            renderPDFContext.height = viewport.height;
            renderPDFContext.style.width = viewport.width + 'px';
            renderPDFContext.style.height = viewport.height + 'px';
            page.render(renderContext);
            resolve();
          })
        })
      }
    }));
    // interact('.resizable')
    //   .draggable({})
    //   .resizable({
    //     preserveAspectRatio: false,
    //     edges: {
    //       left: true,
    //       right: '.resize-handle',
    //       bottom: '.resize-handle',
    //       top: true
    //     }
    //   })
    //   .on('dragstart', function (event: any) {
    //     event.preventDefault();
    //   })
    //   .on('dragmove', dragMoveListener)
    //   .on('resizestart', function (event: any) {
    //     console.info('resizestart = ', event);
    //   })
    //   .on('resizemove', function (event: any) {
    //     console.info('resizemove = ', event);
    //     var target = event.target,
    //       x = (parseFloat(target.getAttribute('data-x')) || 0),
    //       y = (parseFloat(target.getAttribute('data-y')) || 0);

    //     // update the element's style
    //     target.style.width = event.rect.width + 'px';
    //     target.style.height = event.rect.height + 'px';

    //     // translate when resizing from top or left edges
    //     x += event.deltaRect.left;
    //     y += event.deltaRect.top;

    //     target.style.webkitTransform = target.style.transform =
    //       'translate(' + x + 'px,' + y + 'px)';

    //     target.setAttribute('data-x', x);
    //     target.setAttribute('data-y', y);
    //   });


    // function dragMoveListener(event: any) {
    //   var target = event.target,
    //     // keep the dragged position in the data-x/data-y attributes
    //     x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
    //     y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    //   // translate the element
    //   target.style.webkitTransform =
    //     target.style.transform =
    //     'translate(' + x + 'px, ' + y + 'px)';

    //   // update the posiion attributes
    //   target.setAttribute('data-x', x);
    //   target.setAttribute('data-y', y);
    // }
  }

  preview() {
    var self = this;
    var file = (<HTMLInputElement>document.getElementById('pdf-file')).files as FileList;
    if (file && file.length) {
      var reader = new FileReader();
      reader.onload = data => {
        var fileResult = data.target as FileReader;
        var pdf = pdfJS.getDocument({
          data: new Uint8Array(fileResult.result as ArrayBuffer)
        }).then(pdf => {
          self.pdfViewer = pdf;
          self.pagination.config.numOfPage = pdf.numPages;
          self.pagination.firstPage();
        })
      }
      reader.readAsArrayBuffer(file[0]);
    }
  }

}
