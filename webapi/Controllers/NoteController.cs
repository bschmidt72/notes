using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using webapi.Model;
using webapi.Services;

namespace webapi.Controllers
{
    /// <summary>
    /// Controller for Note CRUD Operations
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    public class NoteController : ControllerBase
    {
        private readonly NoteService _noteService;
        
        public NoteController(NoteService noteService)
        {
            _noteService = noteService;
        }

        /// <summary>
        /// Retrieves all notes
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<Note> GetAll()
        {
            return _noteService.GetNotes();
        }

        /// <summary>
        /// Deletes a note
        /// </summary>
        /// <param name="uuid">uuid of the note to be deleted</param>
        [HttpDelete("{uuid}")]
        public void Delete(string uuid)
        {
            _noteService.Delete(uuid);
        }

        /// <summary>
        /// Creates or updates a note
        /// </summary>
        /// <param name="note"></param>
        /// <returns></returns>
        [HttpPost]
        public Note Save([FromBody] Note note)
        {
            _noteService.Save(note);
            return note;
        }
    }
}