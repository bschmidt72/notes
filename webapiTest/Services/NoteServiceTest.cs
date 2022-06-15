using System;
using webapi.Model;
using webapi.Services;
using Xunit;

namespace webapiTest.Services
{
    public class NoteServiceTest
    {

        private NoteService SetupNoteService()
        {
            var noteService = new NoteService();
            noteService.DeleteAll();
            return noteService;
        }
        
        [Fact]
        public void TestCreateNotes()
        {
            var noteService = SetupNoteService();
            var notes = noteService.GetNotes();
            Assert.True(notes.Count == 0);
            
            var note1 = new Note()
            {
                Uuid = Guid.NewGuid(),
                Title = "Title 1",
                Description = "Description 1",
                Created = DateTime.Now
            };
            
            noteService.Save(note1);
            notes = noteService.GetNotes();
            Assert.True(notes.Count == 1);
            AssertNotesEqual(note1, notes[0]);
            
            var note2 = new Note()
            {
                Uuid = Guid.NewGuid(),
                Title = "Title 2",
                Description = "Description 2",
                Created = DateTime.Now
            };
            
            noteService.Save(note2);
            notes = noteService.GetNotes();
            Assert.True(notes.Count == 2);
            AssertNotesEqual(note1, notes[1]);
            AssertNotesEqual(note2, notes[0]);
        }

        [Fact]
        public void TestDeleteNotes()
        {
            var noteService = SetupNoteService();
            var notes = noteService.GetNotes();
            Assert.True(notes.Count == 0);
            
            var note1 = new Note()
            {
                Uuid = Guid.NewGuid(),
                Title = "Title 1",
                Description = "Description 1",
                Created = DateTime.Now
            };
            
            noteService.Save(note1);
            notes = noteService.GetNotes();
            Assert.True(notes.Count == 1);
            AssertNotesEqual(note1, notes[0]);
            
            var note2 = new Note()
            {
                Uuid = Guid.NewGuid(),
                Title = "Title 2",
                Description = "Description 2",
                Created = DateTime.Now
            };
            
            noteService.Save(note2);
            notes = noteService.GetNotes();
            Assert.True(notes.Count == 2);
            AssertNotesEqual(note1, notes[1]);
            AssertNotesEqual(note2, notes[0]);
            
            noteService.Delete(note1.Uuid.ToString());
            notes = noteService.GetNotes();
            Assert.True(notes.Count == 1);
            AssertNotesEqual(note2, notes[0]);
        }
        
        private void AssertNotesEqual(Note note1, Note note2)
        {
            Assert.Equal(note1.Uuid, note2.Uuid);
            Assert.Equal(note1.Title, note2.Title);
            Assert.Equal(note1.Description, note2.Description);
        }
    }
}