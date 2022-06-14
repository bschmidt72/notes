using System;

namespace webapi.Model
{
    public class Note
    {
        public Guid Uuid { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime Created { get; set; }
    }
}