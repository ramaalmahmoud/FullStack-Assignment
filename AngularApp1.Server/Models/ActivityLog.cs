using System;
using System.Collections.Generic;

namespace AngularApp1.Server.Models;

public partial class ActivityLog
{
    public int Id { get; set; }

    public string Action { get; set; } = null!;

    public string UserId { get; set; } = null!;

    public DateTime Timestamp { get; set; }
}
