<template>
<div class="container height-100">
    <div v-validate="{'preventSubmit': true, 'checkSuccess': login}" class="row height-100 display-flex align-items-center">
        <form class="col s12">
            <div class="row no-margin-bottom">
                <div class="input-field col s12">
                    <input id="email" type="email" class="validate" name="email" v-model="email" data-error="email-error">
                    <label for="email">Email</label>
                    <span id="email-error" class="helper-text input-error-message"></span>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input id="password" type="password" class="validate" name="password" v-model="password" data-error="password-error">
                    <label for="password">Password</label>
                    <span id="password-error" class="helper-text input-error-message"></span>
                </div>
            </div>
            <div class="row margin-top-20">
                <div class="col s12">
                    <button class="btn waves-effect waves-light width-100" type="submit">
                        Đăng nhập
                    </button>
                </div>
            </div>
            <div class="row margin-top-20">
                <div class="col s12">
                    <button
                    class="waves-effect waves-orange-lighten-1 btn-flat light-blue-text text-darken-4 width-100 btn-sub"
                    type="submit"
                    @click="register">
                        Đăng ký tài khoản mới
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss" src="./login.scss"></style>
