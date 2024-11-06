using AngularApp1.Server.Models;

namespace AngularApp1.Server.Services
{
    public class ActivityLoggingService
    {
        private readonly MyDbContext _context;
        private readonly ILogger<ActivityLoggingService> _logger;

        public ActivityLoggingService(MyDbContext context, ILogger<ActivityLoggingService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async System.Threading.Tasks.Task LogActivityAsync(string action, int userId)
        {
            // Create a new activity log entry
            var log = new ActivityLog
            {
                Action = action,
                UserId = Convert.ToString(userId),
                Timestamp = DateTime.UtcNow
            };

            // Log the action to the database
            _context.ActivityLogs.Add(log);
            await _context.SaveChangesAsync();

            // Optionally log to other systems (console, file, etc.)
            _logger.LogInformation($"Activity: {action}, User: {userId}, Timestamp: {DateTime.UtcNow}");
        }


    }
}
