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
        // PUT: api/Tasks/UpdateTaskStatus/{taskId}
        [HttpPut("UpdateTaskStatus/{taskId}")]
        public async Task<IActionResult> UpdateTaskStatus(int taskId, [FromBody] TaskStatusUpdateDto updateDto)
        {
            // Fetch the task by ID
            var task = await _db.Tasks.FindAsync(taskId);

            // Check if the task exists
            if (task == null)
            {
                return NotFound(new { message = "Task not found." });
            }

            // Update the status of the task
            task.Status = updateDto.Status;

            // Save the changes to the database
            await _db.SaveChangesAsync();

            // Return success response
            return Ok(new { message = "Task status updated successfully." });
        }
        [HttpGet("GetTaskDetails/{taskId}")]
        public async Task<IActionResult> GetTaskDetails(int taskId)
        {
            try
            {
                var task = await _db.Tasks
                    .Include(t => t.Comments)
                    .FirstOrDefaultAsync(t => t.Id == taskId);

                if (task == null)
                {
                    return NotFound(new { message = "Task not found." });
                }

                return Ok(task);
            }
            catch (Exception ex)
            {
                // Log the exception or output to the console for debugging
                Console.WriteLine($"Error retrieving task details: {ex.Message}");
                return StatusCode(500, new { message = "An error occurred while retrieving task details." });
            }
        }
        [HttpPost("AddComment")]
        public async Task<IActionResult> AddComment([FromBody] CommentDto commentDto)
        {
            var task = await _db.Tasks.FindAsync(commentDto.TaskId);
            if (task == null)
            {
                return NotFound(new { message = "Task not found." });
            }

            var comment = new Comment
            {
                TaskId = commentDto.TaskId,
                CommentText = commentDto.Content,
                Timestamp = DateTime.UtcNow,
                UserId = commentDto.UserId
            };

            _db.Comments.Add(comment);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Comment added successfully." });
        }

        // Supporting DTO
        public class CommentDto
        {
            public int TaskId { get; set; }
            public int UserId { get; set; }
            public string Content { get; set; }
        }


    }
}
