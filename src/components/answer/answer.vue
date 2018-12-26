<template>
<div ref="answer" class="resizable answer">
    <!-- <div class="resize-handle"></div>
    <div class="get-info position-absolute top-0 right-0 teal lighten-2 cursor-pointer" @click="getInfo" style="width: 8px; height: 8px"></div> -->
    <div v-if="answerProp.type == 'CHECKBOX'" class="width-100 height-100 display-flex padding-left-5 align-items-center answer-item" tabindex="0" @click="check()" @dblclick="dbClickAnswer($event)" @keyup.enter="checkByEnter">
        <span class="margin-right-5">{{label}}</span>
        <span>
            <i v-if="!answerProp.checked" class="far fa-square"></i>
            <i v-if="answerProp.checked" class="far fa-check-square"></i>
        </span>
    </div>
    <div v-if="answerProp.type == 'TEXTBOX'" class="width-100 height-100 display-flex padding-left-5 align-items-center answer-item">
        <span class="margin-right-5">{{label}}</span>
        <div>
            <input style="margin-left:1px; margin-top:1px; height: 16px; line-height: 16px; font-size:13px" @change="onChangeTextBox"/>
        </div>
    </div>
</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss" src="./answer.scss"></style>
