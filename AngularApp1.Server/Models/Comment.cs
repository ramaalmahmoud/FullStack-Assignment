using System;
using System.Collections.Generic;

namespace AngularApp1.Server.Models;

public partial class Comment
{
    public int Id { get; set; }

    public int TaskId { get; set; }

    public int UserId { get; set; }

    public string CommentText { get; set; } = null!;

    public DateTime Timestamp { get; set; }

    public virtual Task Task { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
