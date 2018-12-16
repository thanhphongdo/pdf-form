<template>
<div class="container height-100">
    <div class="row height-100 display-flex flex-column justify-content-center margin-top-15">
        <div class="col s12 text-size-20 main-color-text">
            Chọn trình độ Anh Ngữ của bạn
        </div>
        <div class="col s12 overflow-auto flex-1">
            <div class="col s12" v-for="(item, index) in getLevelBySource(getSharedData('currentSource'))" :key="index">
                <button class="waves-effect waves-orange-lighten-1 btn-flat light-blue-text text-darken-4 width-100 btn-sub"
                    @click="selectLevel(item.id)">
                    {{item.name}}
                </button>
            </div>
        </div>
    </div>
</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss" src="./select_level.scss"></style>
