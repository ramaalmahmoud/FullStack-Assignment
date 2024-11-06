using AngularApp1.Server.Models;
using AngularApp1.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AngularApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivityController : ControllerBase
    {
        private readonly MyDbContext _db;
        private readonly ActivityLoggingService _logger;
        public ActivityController(MyDbContext db, ActivityLoggingService logger)
        {
            _db = db;
            _logger = logger;
        }

        [HttpGet("activity-logs")]
        public async Task<IActionResult> GetActivityLogs()
        {
            var logs = await _db.ActivityLogs.OrderByDescending(log => log.Timestamp).ToListAsync();
            return Ok(logs);
        }
        // GET: api/dashboard/overview
        [HttpGet("overview")]
        public async Task<IActionResult> GetDashboardOverview()
        {
            var totalUsers = await _db.Users.CountAsync();
            var totalTasks = await _db.Tasks.CountAsync();
            var completedTasks = await _db.Tasks.CountAsync(t => t.Status == "Completed");
            var pendingTasks = totalTasks - completedTasks;

            var stats = new
            {
                TotalUsers = totalUsers,
                TotalTasks = totalTasks,
                CompletedTasks = completedTasks,
                PendingTasks = pendingTasks
            };

            return Ok(stats);
        }
    }
}
