import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Note} from "../../model/note";

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.scss']
})
export class NoteEditComponent implements OnInit {

  @Input()
  value: Note = {} as Note;

  @Output()
  valueChange: EventEmitter<Note> = new EventEmitter<Note>();

  @Output()
  onCancel: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  onSave: EventEmitter<Note> = new EventEmitter<Note>();

  workValue: Note = {} as Note;

  constructor() { }

  ngOnInit(): void {
    if (!this.value) {
      this.value = {} as Note;
    }
    Object.assign(this.workValue, this.value);
  }

  update() {
    Object.assign(this.value, this.workValue);
    this.value.created = new Date();
    this.valueChange.emit(this.value);
    this.onSave.emit(this.value);
  }

  cancel() {
    Object.assign(this.workValue, this.value);
    this.onCancel.emit(true);
  }
}
