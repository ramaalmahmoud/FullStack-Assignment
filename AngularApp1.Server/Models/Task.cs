using System;
using System.Collections.Generic;

namespace AngularApp1.Server.Models;

public partial class Task
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public int? AssignedUserId { get; set; }

    public string Status { get; set; } = null!;

    public DateTime? DueDate { get; set; }

    public virtual User? AssignedUser { get; set; }

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();
}
