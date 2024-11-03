using AngularApp1.Server.DTO;
using AngularApp1.Server.Models;
using AngularApp1.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AngularApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly MyDbContext _db;
        private readonly TokenGenerator _tokenGenerator;

        public UsersController(MyDbContext db, TokenGenerator tokenGenerator)
        {
            _db = db;
            _tokenGenerator = tokenGenerator;
        }
        [HttpPost("login")]
        public IActionResult Login([FromForm] loginUserDTO model)
        {
            // Step 1: Check if the user exists and has an active status
            var user = _db.Users.FirstOrDefault(x => x.Email == model.Email && x.Status == 1);
            if (user == null)
            {
                return Unauthorized("Invalid username, password, or inactive account.");
            }
            // Decode stored hash and salt from Base64 to byte[]
            byte[] passwordHash = Convert.FromBase64String(user.HashedPassword);
            byte[] passwordSalt = Convert.FromBase64String(user.SaltPassword);
            // Step 2: Verify the password using hash and salt
            if (!PasswordHasher.VerifyPasswordHash(model.Password, passwordHash, passwordSalt))
            {
                return Unauthorized("Invalid username or password.");
            }

            // Step 3: Retrieve the role(s) from the UserRoles column
            var roles = user.UserRoles.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries).ToList();

            // Step 4: Generate a token
            var token = _tokenGenerator.GenerateToken(user.Name, roles);

            // Step 5: Return the token and user information
            return Ok(new
            {
                Token = token,
                UserId = user.Id,
                UserRoles = roles,
                Status = user.Status
            });
        }

        // Task 1: Create User
        [HttpPost("CreateUser")]
        public async Task<IActionResult> CreateUser([FromForm] UserDto model)
        {
            if (model == null)
            {
                return BadRequest("User data is required.");
            }

            byte[] passwordHash, passwordSalt;
            PasswordHasher.CreatePasswordHash(model.Password, out passwordHash, out passwordSalt);

            var user = new User
            {
                Name = model.Name,
                Email = model.Email,
                UserRoles = model.Role ?? "User", // Default role
                Status = model.Status ?? 1, // Default status
                Password = model.Password,
                HashedPassword = Convert.ToBase64String(passwordHash), // Convert hash to base64
                SaltPassword = Convert.ToBase64String(passwordSalt) // Convert salt to base64
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            return Ok(user);
        }
        // Task 2: Get All Users
        [HttpGet("GetAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _db.Users.ToListAsync();
            return Ok(users);
        }

        [HttpGet("GetUserById/{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
        [HttpDelete("DeleteUser/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _db.Users.Remove(user);
            await _db.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("UpdateUser/{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromForm] UserDto model)
        {
            // Check if the model is provided
            if (model == null)
            {
                return BadRequest("User data is required.");
            }

            // Find the user in the database
            var user = await _db.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            // Update user fields
            user.Name = model.Name ?? user.Name;
            user.Email = model.Email ?? user.Email;
            user.UserRoles = model.Role ?? user.UserRoles; // Update role if provided
            user.Status = model.Status ?? user.Status; // Update status if provided

            // Check if password is provided and update it
            if (!string.IsNullOrWhiteSpace(model.Password))
            {
                byte[] passwordHash, passwordSalt;
                PasswordHasher.CreatePasswordHash(model.Password, out passwordHash, out passwordSalt);

                user.HashedPassword = Convert.ToBase64String(passwordHash); // Update hash
                user.SaltPassword = Convert.ToBase64String(passwordSalt);   // Update salt
            }

            // Save changes to the database
            await _db.SaveChangesAsync();

            return Ok(user);
        }


    }
}
