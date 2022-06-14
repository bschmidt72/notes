using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;
using webapi.Model;

namespace webapi.Services
{
    /// <summary>
    /// Service for Note CRUD operations
    /// </summary>
    public class NoteService
    {
        private readonly string _nodeStorePath = ".\\Nodes.json";

        private readonly ConcurrentList<Note> _store = new ConcurrentList<Note>();
        
        public NoteService()
        {
            ReadAll();
        }

        /// <summary>
        /// Serializes the notes into the store json file
        /// </summary>
        private void WriteAll()
        {
            var serializer = new JsonSerializer();
            using var sw = new StreamWriter(_nodeStorePath);
            using JsonWriter writer = new JsonTextWriter(sw);
            serializer.Serialize(writer, _store.ToList());           
        }
        
        /// <summary>
        /// Deserializes the notes from the store json file
        /// </summary>
        private void ReadAll()
        {
            if (!File.Exists(_nodeStorePath))
            {
                return;
            }
            var serializer = new JsonSerializer();         

            using var sw = new StreamReader(_nodeStorePath);
            using var reader = new JsonTextReader(sw);
            var notes = serializer.Deserialize<List<Note>>(reader);
            ResetStore(notes);
        }

        /// <summary>
        /// Gets the notes from the store
        /// </summary>
        /// <returns></returns>
        public List<Note> GetNotes()
        {
            return _store.ToList();
        }

        /// <summary>
        /// Creates or Updates a note in the store and writes the changes to the json store file
        /// </summary>
        /// <param name="note"></param>
        public void Save(Note note)
        {
            var storeNote = _store.FirstOrDefault(n => n.Uuid == note.Uuid);
            if (storeNote != null)
            {
                storeNote.Title = note.Title;
                storeNote.Description = note.Description;
            }
            else
            {
                _store.Add(note);
            }

            WriteAll();
        }

        /// <summary>
        /// Removes a note from the store and writes the changes to the store json file
        /// </summary>
        /// <param name="uuid"></param>
        public void Delete(string uuid)
        {
            var updatedNotes = _store.Where(n => n.Uuid.ToString() != uuid).ToList();
            ResetStore(updatedNotes);
            WriteAll();
        }

        private void ResetStore(IEnumerable<Note> notes)
        {
            _store.Clear();
            _store.AddRange(notes.OrderByDescending(note => note.Created));
        }
        
    }
}