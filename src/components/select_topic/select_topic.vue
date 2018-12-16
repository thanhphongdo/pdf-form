<template>
<div class="container height-100">
    <div class="row height-100 display-flex flex-column justify-content-center padding-top-15 padding-bottom-15">
        <div class="col s12 text-size-20 main-color-text">
            Chọn chủ đề bạn muốn học
        </div>
        <div class="col s12 overflow-auto flex-1">
            <div class="col s12" v-for="(item, index) in getTopicBySource('EoT3y7nabE')" :key="index">
                <button class="waves-effect waves-orange-lighten-1 btn-flat light-blue-text text-darken-4 width-100 btn-sub display-flex justify-content-center align-item-center"
                    @click="selectTopic({sourceId: 'EoT3y7nabE', levelId: item.id})">
                    <i v-if="item.checked" class="material-icons dp48">check</i>
                    <span>{{item.name}}</span>
                </button>
            </div>
        </div>
        <div class="col s12 margin-top-15">
            <button class="btn waves-effect waves-light red lighten-2 width-100" type="button" name="action" @click="nextTopic">Tiếp theo</button>
        </div>
    </div>
</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss" src="./select_topic.scss"></style>
