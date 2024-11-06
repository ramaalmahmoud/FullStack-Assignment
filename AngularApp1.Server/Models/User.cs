using System;
using System.Collections.Generic;

namespace AngularApp1.Server.Models;

public partial class User
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string HashedPassword { get; set; } = null!;

    public string SaltPassword { get; set; } = null!;

    public string? UserRoles { get; set; }

    public int? Status { get; set; }

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual ICollection<Task> Tasks { get; set; } = new List<Task>();
}
