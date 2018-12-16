<template>
<div class="width-100 border-radius-10 margin-15 padding-15 display-flex flex-column word-background" style="height: 350px">
    <div class="text-size-14 white-text">Select 1 of 8</div>
    <div class="flex-1 padding-top-15 padding-bottom-15 display-flex flex-column">
        <div class="center-align text-size-24 white-text">{{word.text}}</div>
        <div class="center-align text-size-16 padding-top-15 white-text">{{word.textVi}}</div>
        <div class="center-align text-size-14 text-italic white-text">/ˈsimpəl/</div>
        <div class="flex-1 display-flex align-items-center justify-content-center">
            <div class="border-radius-50 border border-width-2 border-color-yellow-accent-4 display-flex align-items-center justify-content-center" style="width: 50px; height: 50px" @click="$refs.voice.play()">
                <i class="fas fa-volume-up text-size-30 yellow-text text-accent-4"></i>
            </div>
            <video ref="voice" style="display:none" controls autoplay="false" name="media">
          <source :src="word.voiceEn.url" type="audio/wav">
        </video>
        </div>
    </div>
    <div>
        <button
        class="waves-effect waves-light btn-small yellow accent-4 width-50"
        @click="select"
      >Chọn {{word.checked}}</button>
    </div>
</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss" src="./word.scss"></style>
