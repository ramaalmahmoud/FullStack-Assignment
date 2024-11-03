using AngularApp1.Server.DTO;
using AngularApp1.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AngularApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly MyDbContext _db;
        public TasksController(MyDbContext db)
        {
            _db = db;
        }
       
        [HttpPost("CreateTask")]
        public async Task<IActionResult> CreateTask([FromForm] TaskDto taskDto)
        {
            // Validate taskDto
            //if (taskDto == null)
            //{
            //    return BadRequest("Task data is required.");
            //}

            var user = await _db.Users.FindAsync(taskDto.AssignedUserId);

            if (user == null)
            {
                return BadRequest("Assigned user not found.");
            }

            var task = new Models.Task
            {
                Title = taskDto.Title,
                Description = taskDto.Description,
                AssignedUserId = taskDto.AssignedUserId,
                AssignedUser = user, // Correctly assign the user object here
                Status = taskDto.Status,
                DueDate = taskDto.DueDate
            };

            _db.Tasks.Add(task);
            await _db.SaveChangesAsync();

            return Ok(task);
        }

        [HttpGet("GetTasks")]
        public async Task<IActionResult> GetTasks()
        {
            var tasks = await _db.Tasks.ToListAsync();
            return Ok(tasks);
        }

        [HttpGet("GetTask/{id}")]
        public async Task<IActionResult> GetTask(int id)
        {
            var task = await _db.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }
            return Ok(task);
        }
        [HttpPut("UpdateTask/{id}")]
        public async Task<IActionResult> UpdateTask(int id, [FromForm] TaskDto model)
        {
            var task = await _db.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            // Update task properties based on the model
            task.Title = model.Title??task.Title;
            task.Description = model.Description?? task.Description;

            // Assign AssignedUserId from the model, not the full AssignedUser object
            task.AssignedUserId = model.AssignedUserId ?? task.AssignedUserId; // This should be an integer representing the User ID

            task.Status = model.Status?? task.Status;
            task.DueDate = model.DueDate?? task.DueDate;

            await _db.SaveChangesAsync();
            return Ok(task);
        }

        [HttpGet("GetUserTasks/{userId}")]
        public async Task<IActionResult> GetUserTasks(int userId)
        {
            var userTasks = await _db.Tasks
                .Where(task => task.AssignedUserId == userId)
                .ToListAsync();

            return Ok(userTasks);
        }

    }
}
