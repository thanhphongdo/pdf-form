<template>
<div ref="question" class="resizable question" tabindex="1" @dblclick="checkAll" @keydown="checkAllKeyDown($event)">
    <div class="resize-handle"></div>
    <div class="get-info position-absolute top-0 right-0 teal lighten-2 cursor-pointer" @click="getInfo" style="width: 8px; height: 8px"></div>
    <template v-if="questionProp.answers && questionProp.answers.length">
        <Answer v-for="(ans, index) in questionProp.answers" :key="index" :answerConfig="ans" :questionIndex="questionIndex" ref="answer" :formIndex="formIndex"  v-on:answer="onAnswer" v-on:checkAllKeyDown="checkAllKeyDown($event)"></Answer>
        <!-- :width="ans.width" :height="ans.height" :x="ans.x" :y="ans.y" :label="ans.label" :type="ans.type" :checked="ans.checked" :value="ans.value" :autoIncrement="ans.autoIncrement" -->
    </template>
    <!-- <slot></slot> -->
</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss" src="./question.scss"></style>
