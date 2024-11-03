namespace AngularApp1.Server.DTO
{
    public class UserDto
    {
   
        public string Name { get; set; }
        public string Email { get; set; }
        public string Role { get; set; } // e.g., "Admin", "User"
        public int? Status { get; set; } // e.g., "Active", "Inactive"
        public string Password { get; set; } // Password for creation/updating
     
    }
}
