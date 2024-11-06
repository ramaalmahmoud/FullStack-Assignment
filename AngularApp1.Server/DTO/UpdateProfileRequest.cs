namespace AngularApp1.Server.DTO
{
    public class UpdateProfileRequest
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string? OldPassword { get; set; } // New field for old password
        public string? NewPassword { get; set; }
    }
}
