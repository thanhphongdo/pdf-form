<template>
<div>
    <div class="padding-15 display-flex justify-content-center">
        <input id="pdf-file" ref="pdfFile" class="hide" type="file">
        <button type="button" class="waves-effect waves-light btn margin-right-5" @click="$refs.pdfFile.click()">Choose PDF File</button>
        <button type="button" class="waves-effect waves-light btn margin-right-5" @click="preview">Open</button>
        <button class="waves-effect waves-light btn" @click="showAnswerPreview">Preview Data</button>
    </div>
    <div>
        <div class="display-flex">
            <div class="flex-1"></div>
            <div>
                <div v-if="pagination && pagination.config" class="display-flex justify-content-center align-items-center padding-bottom-15">
                    <button :disabled="pagination.config.page == 1 || pagination.config.page > pagination.config.numOfPage" @click="pagination.prevPage()" class="waves-effect waves-light btn">Prev</button>
                    <span class="margin-left-15 margin-right-15">
                        <span>{{pagination.config.page}} / {{pagination.config.numOfPage || 0}}</span>
                    </span>
                    <button :disabled="pagination.config.page == pagination.config.numOfPage || pagination.config.page > pagination.config.numOfPage" @click="pagination.nextPage()" class="waves-effect waves-light btn">Next</button>
                </div>
                <div class="position-relative">
                    <canvas id="canvas" style="width: 300px; height: 500px"></canvas>
                    <div class="width-100 height-100 position-absolute top-0 left-0">
                        <div v-if="showFormFlag && formData && formData.length" id="resize-container">
                            <Question v-for="(item, index) in formData" :key="index" :width="item.question.width" :height="item.question.height" :x="item.question.x" :y="item.question.y" :answers="item.answers" v-on:answer="onAnswer">
                            </Question>
                        </div>
                    </div>
                </div>
                <div v-if="pagination && pagination.config && pagination.config.numOfPage" class="display-flex justify-content-center align-items-center padding-bottom-15">
                    <button :disabled="pagination.config.page == 1 || pagination.config.page > pagination.config.numOfPage" @click="pagination.prevPage()" class="waves-effect waves-light btn">Prev</button>
                    <span class="margin-left-15 margin-right-15">
                        <span>{{pagination.config.page}} / {{pagination.config.numOfPage || 0}}</span>
                    </span>
                    <button :disabled="pagination.config.page == pagination.config.numOfPage || pagination.config.page > pagination.config.numOfPage" @click="pagination.nextPage()" class="waves-effect waves-light btn">Next</button>
                </div>
            </div>
            <div class="flex-1"></div>
        </div>
    </div>

    <!-- Modal Structure -->
    <div ref="previewAnswerModal" id="previewAnswerModal" class="modal modal-fixed-footer width-80">
        <div class="modal-content display-flex flex-column">
            <h4>Preview Data</h4>
            <div class="flex-1">
                <div id="previewDataGrid" style="height: 100%;width: 100%" class="ag-theme-balham"></div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="modal-close waves-effect waves-green btn-flat" @click="exportCsv">Export CSV</button>
            <button class="modal-close waves-effect waves-green btn-flat" @click="previewAnswerModal.close()">Close</button>
        </div>
    </div>
</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss" src="./create_form.scss"></style>
