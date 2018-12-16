<template>
  <Carousel ref="carousel">
    <div class="swiper-slide" v-for="(item, index) in words" :key="index">
      <WordComponent :word="item" :sourceId="sourceId" v-on:onSelected="onSelectedWord(item)"></WordComponent>
    </div>
  </Carousel>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss" src="./select_word.scss"></style>
