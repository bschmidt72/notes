import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import {of} from "rxjs";
import {Note} from "../../model/note";
import {NoteService} from "../../services/note.service";
import {MatSnackBar} from "@angular/material/snack-bar";

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let note1: Note;

  beforeEach(async () => {
    note1 = {
      uuid: 'uuid1',
      title: 'Note 1',
      description: 'Note 1',
      created: new Date()
    } as Note
    const noteServiceStub = {
      getAll() {
        return of([note1]);
      },
      delete(uuid: string) {
        return of(true);
      },
      createOrUpdate(note: Note) {
        return of(note);
      }
    };
    const snackbarStub = {
        open(message: string) {}
    }

    await TestBed.configureTestingModule({
      declarations: [ MainComponent ],
      providers: [ { provide: NoteService, useValue: noteServiceStub },
        { provide: MatSnackBar, useValue: snackbarStub }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return note', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.notes).toEqual([ note1 ]);
    });
  });

  it('should add note', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.notes).toEqual([ note1 ]);
      component.add();
      expect(component.notes.length == 2);
      expect(component.notes[0].title === undefined);
      expect(component.notes[0].description === undefined);
      expect(component.notes[0].uuid !== undefined);
      expect(component.notes[0]).toBe(component.selectedNote as Note);
    });
  });

  it('should select note', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.notes).toEqual([ note1 ]);
      component.select(component.notes[0]);
      expect(component.notes[0]).toBe(component.selectedNote as Note);
    });
  });

  it('should save note', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.notes).toEqual([ note1 ]);
      component.select(component.notes[0]);
      expect(component.notes[0]).toBe(component.selectedNote as Note);
      // @ts-ignore
      component.selectedNote.title = 'new Title';
      // @ts-ignore
      component.selectedNote.description = 'new Description';
      component.save();
      expect(component.notes[0].title === 'new Title');
      expect(component.notes[0].description === 'new Description');
    });
  });

  it('should should not save note on cancel', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.notes).toEqual([ note1 ]);
      component.select(component.notes[0]);
      expect(component.notes[0]).toBe(component.selectedNote as Note);
      // @ts-ignore
      component.selectedNote.title = 'new Title';
      // @ts-ignore
      component.selectedNote.description = 'new Description';
      component.cancelEdit();
      expect(component.notes[0].title === 'Note 1');
      expect(component.notes[0].description === 'Note 1');
    });
  });

  it('should delete note', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.notes).toEqual([ note1 ]);
      component.delete(component.notes[0]);
      expect(component.notes.length === 0);
    });
  })
});
