<template>
<div>
    <div>
        Create form
        <input id="pdf-file" type="file">
        <button type="button" @click="preview">Preview</button>
        <!-- <a class="waves-effect waves-light btn">Modal</a> -->
    </div>
    <div>
        <div class="display-flex">
            <div class="flex-1"></div>
            <div>
                <div v-if="pagination && pagination.config" class="display-flex justify-content-space-beetween padding-bottom-15">
                    <button @click="pagination.prevPage()" class="waves-effect waves-light btn">Prev</button>
                    <span>{{pagination.config.page}} / {{pagination.config.perPage}}</span>
                    <button @click="pagination.nextPage()" class="waves-effect waves-light btn">Next</button>
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
            </div>
            <div class="flex-1"></div>
        </div>
    </div>

    <!-- Modal Structure -->
    <!-- <div ref="previewAnswerModal" id="previewAnswerModal" class="modal modal-fixed-footer">
        <div class="modal-content">
            <h4>Modal Header</h4>
            <p>A bunch of text</p>
        </div>
        <div class="modal-footer">
            <button class="modal-close waves-effect waves-green btn-flat" @click="previewAnswerModal.close()">Agree</button>
        </div>
    </div> -->
</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss" src="./create_form.scss"></style>
