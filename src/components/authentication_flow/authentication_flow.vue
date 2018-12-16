<template>
    <div class="height-100">
        <Login v-if="currentStep == 'LOGIN'" v-on:loginAction="onLoginAction"></Login>
        <Register v-if="currentStep == 'REGISTER'" v-on:registerAction="onRegisterAction"></Register>
    </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./authentication_flow.scss"></style>
