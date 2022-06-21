<template>
  <div @click="add()"><span class="material-icons">add_circle</span></div>
  <div class="notes-container">
    <div v-if="addNote" class="note">
      <div class="note-content">
        <EditNote :value="addNote" @save="onAddSave()" @cancel="onAddCancel()"/>
      </div>
    </div>
    <div v-for="note in notes">
      <div v-if="selectedNote?.uuid !== note.uuid" class="note">
        <div class="note-content">
          <div class="note-header">
            <h3>{{note.title}}</h3>
            <span class="created">{{formatDate(note.created)}}</span>
            <div class="button-row">
              <div @click="edit(note)"><span class="material-icons">edit</span></div>
              <div @click="remove(note)"><span class="material-icons">delete</span></div>
            </div>
          </div>
          <div class="note-body">
            <p>{{note.description}}</p>
          </div>
        </div>
      </div>
      <div v-if="note.uuid === selectedNote?.uuid" class="note">
        <div class="node-content">
          <EditNote :value="selectedNote" @save="onEditSave()" @cancel="onEditCancel()"/>
        </div>
      </div>
    </div>
  </div>    
</template>

<script setup lang="ts">

import * as uuid from "uuid";
import type {Note} from '@/model/Note'
import EditNote from "./EditNote.vue";
import { DateTime } from "luxon";
import { ref } from 'vue';

const addNote = ref(null)
const selectedNote = ref(null)
const notes = ref([] as Note[]);

function formatDate(value: Date) {
  if (value) {
    return DateTime.fromJSDate(value).toLocaleString(DateTime.DATE_SHORT);
  }
}
function add() {
  if (selectedNote.value) {
    return;
  }
  addNote.value = { uuid: uuid.v4(), title: '', description: '', created: new Date()} as Note;
}
function edit(note: Note) {
  console.log('edit', note)
  if (addNote.value) {
    return;
  }
  selectedNote.value = Object.assign({}, note);
}
function remove(note: Note) {
  console.log('remove')
  if (!note) {
    return;
  }
  let index = notes.value.findIndex(n => n.uuid === note.uuid);
  notes.value.splice(index, 1);
}
function onAddSave() {
  notes.value.unshift(addNote.value);
  addNote.value = null;
}
function onAddCancel() {
  addNote.value = null;
}
function onEditSave() {
  let item = notes.value.find(n => n.uuid === selectedNote.value.uuid)
  if (!item) {
    return;
  }
  copyProps(item, selectedNote.value);
  selectedNote.value = null;
}
function onEditCancel() {
  selectedNote.value = null;
}
function copyProps(target: Note, source: Note) {
  target.uuid = source.uuid;
  target.title = source.title;
  target.description = source.description;
  target.created = source.created;
}

</script>

<style scoped>
  .notes-container {
    display: flex;
    flex-direction: row;
    flex-flow: wrap;
  }
  .note {
    width: 380px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    margin: 8px;
  }
  .note-content {
    margin: 8px;
    display: flex;
    flex-direction: column;
    width: 364px;
    word-break: break-all;
  }
  .note-header {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: baseline;
    word-break: break-all;
  }
  .button-row {
    display: flex;
    flex-direction: row;
  }
  .button-row > * {
    padding-right: 4px;
  }
  .material-icons {
    font-family: 'Material Icons', serif;
    font-weight: normal;
    font-style: normal;
    font-size: 24px;  /* Preferred icon size */
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
    color: coral;
    cursor: pointer;

    /* Support for all WebKit browsers. */
    -webkit-font-smoothing: antialiased;
    /* Support for Safari and Chrome. */
    text-rendering: optimizeLegibility;

    /* Support for Firefox. */
    -moz-osx-font-smoothing: grayscale;

    /* Support for IE. */
    font-feature-settings: 'liga';
  }
</style>