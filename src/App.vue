<template>
<div id="app">
    <nav class="hide-on-med-and-down">
        <div class="nav-wrapper">
            <a href="#" class="brand-logo">Logo</a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li>
                    <router-link to="/">Home</router-link>
                </li>
                <li>
                    <router-link to="/about">About</router-link>
                </li>
            </ul>
        </div>
    </nav>
    <div class="container main-body">
        <div class="row height-100">
            <div class="col s12 height-100 no-padding">
                <router-view />
            </div>
        </div>
    </div>
    <footer class="page-footer main-footer no-padding hide-on-large-only">
        <div class="col l12">
            <ul class="tabs tabs-fixed-width z-depth-1 tabs-bottom">
                <li class="tab">
                    <a class="active display-flex flex-column">
                        <i class="fas fa-trophy"></i>
                        <span>Thống kê</span>
                    </a>
                </li>
                <li class="tab">
                    <a>
                        <i class="fas fa-tasks"></i>
                        <span>Nhiệm vụ</span>
                    </a>
                </li>
                <li class="tab">
                    <a>
                        <i class="fas fa-cog"></i>
                        <span>Cài đặt</span>
                    </a>
                </li>
            </ul>
        </div>
    </footer>
    <div class="waiting">
        <div class="preloader-wrapper big active">
            <div class="spinner-layer spinner-blue-only">
                <div class="circle-clipper left">
                    <div class="circle"></div>
                </div>
                <div class="gap-patch">
                    <div class="circle"></div>
                </div>
                <div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapActions
} from 'vuex'
import {
    mapGetters
} from 'vuex'
import {
    Actions,
    Getters
} from './enums'
export default {
    name: 'App',
    components: {},
    data() {
        return {}
    },
    mounted() {
        M.AutoInit()
    },
    methods: {},
    computed: {}
}
</script>
