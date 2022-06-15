import {Component, OnDestroy, OnInit} from '@angular/core';
import {Note} from "../../model/note";
import {NoteService} from "../../services/note.service";
import {Subject} from "rxjs";
import {UUID} from "angular2-uuid";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  selectedNote: Note | undefined = undefined;
  notes: Note[] = [];

  destroy: Subject<any> = new Subject<any>();

  constructor(private noteService: NoteService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.noteService.getAll().subscribe(notes => this.notes = notes);
  }

  ngOnDestroy() {
    this.destroy.next(true);
  }

  add() {
    this.selectedNote = { uuid: UUID.UUID() } as Note;
    this.notes.unshift(this.selectedNote);
  }

  select(note: Note) {
    this.selectedNote = note;
  }

  save() {
    if (!this.selectedNote) {
      return;
    }
    let newNote = !this.selectedNote.uuid;
    if (newNote) {
      this.selectedNote.uuid = UUID.UUID();
      this.notes.push(this.selectedNote);
    }
    this.noteService.createOrUpdate(this.selectedNote).subscribe(result => {},
      error => {
        this.snackBar.open('Error Saving Note')
        this.noteService.getAll().subscribe(all => this.notes = all);
      });
    this.selectedNote = undefined;
  }

  delete(note: Note) {
    this.noteService.delete(note.uuid).subscribe(result => {
      let index = this.notes.findIndex(n => n.uuid === note.uuid);
      this.notes.splice(index, 1);
    }, error => {
      this.snackBar.open('Error Deleting Note')
      this.noteService.getAll().subscribe(all => this.notes = all);
    });
  }

  cancelEdit() {
    if (this.selectedNote && !this.selectedNote?.title && !this.selectedNote?.description) {
      this.delete(this.selectedNote);
    }
    this.selectedNote = undefined;
  }

}
