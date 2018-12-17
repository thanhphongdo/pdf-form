<template>
<div>
    Create form
    <input id="pdf-file" type="file" />
    <button type="button" @click="preview">Preview</button>
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
                        <div id="resize-container">
                            <!-- <div class="resizable" id="firstResizable">resize me<div class="resize-handle"></div>
                            </div>
                            <div class="resizable" style="left: 200px">resize me<div class="resize-handle"></div>
                            </div> -->
                            <Question></Question>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-1"></div>
        </div>
    </div>
</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss" src="./create_form.scss"></style>
