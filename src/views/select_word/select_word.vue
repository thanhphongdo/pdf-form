<template>
<div class="height-100">
    <SelectWord v-if="getWordBySource(currentSource).length" :words="getWordBySource(currentSource)" :sourceId="currentSource"></SelectWord>
</div>
</template>
