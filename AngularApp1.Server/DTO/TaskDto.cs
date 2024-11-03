namespace AngularApp1.Server.DTO
{
    public class TaskDto
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public int? AssignedUserId { get; set; }

        public string? Status { get; set; } // e.g., 'Pending', 'In Progress', 'Completed'
        public DateTime? DueDate { get; set; }
    }
}
