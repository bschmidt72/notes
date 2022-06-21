<template>
  <div v-if="value" class="container">
    <div class="content">
      <h5>Title</h5>
      <input class="title" v-model="value.title">
      <h5>Description</h5>
      <textarea class="description" v-model="value.description"></textarea>
      <div class="buttons">
        <button @click="save()"><span class="material-icons">done</span></button>
        <button @click="cancel()"><span class="material-icons">close</span></button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const emit = defineEmits(['save', 'cancel'])
const props = defineProps(['value'])

function save() {
  emit('save');
}
function cancel() {
  emit('cancel')
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 364px;
}
.content {
  margin: 0 8px 8px 8px;
}
.content > * {
  width: 100%;
  margin-bottom: 8px;
}
.description {
  height: 100px;
}
</style>