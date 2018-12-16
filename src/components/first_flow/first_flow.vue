<template>
<div class="height-100">
    <AuthenticationFlow v-if="step == 'AUTHEN'" step="LOGIN" v-on:authenAction="onAuthenAction"></AuthenticationFlow>
    <SelectLevel v-if="step == 'SELECT_LEVEL'" v-on:selectLevelAction="onSelectLevelAction"></SelectLevel>
    <SelectTopic v-if="step == 'SELECT_TOPIC'" v-on:selectTopicAction="onSelectTopicAction"></SelectTopic>
    <SelectWord v-if="step == 'SELECT_WORD'"></SelectWord>
</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss" src="./first_flow.scss"></style>
