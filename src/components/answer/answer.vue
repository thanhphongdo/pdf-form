<template>
<div ref="answer" class="resizable answer">
    <div class="resize-handle"></div>
    <div class="get-info position-absolute top-0 right-0 teal lighten-2 cursor-pointer" style="width: 8px; height: 8px"></div>
    <div class="width-100 height-100 display-flex padding-left-5 align-items-center answer-item" tabindex="0" @click="check()" @keyup.enter="check">
        <span class="margin-right-5">{{label}}</span>
        <i v-if="!answerProp.checked" class="far fa-square"></i>
        <i v-if="answerProp.checked" class="far fa-check-square"></i>
    </div>
</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss" src="./answer.scss"></style>
