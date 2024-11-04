CREATE TABLE Users (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    Password NVARCHAR(100) NOT NULL
);

CREATE TABLE Tasks (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(200) NOT NULL,
    Description NVARCHAR(MAX),
    AssignedUserId INT,
    FOREIGN KEY (AssignedUserId) REFERENCES Users(Id)
);

CREATE TABLE Comments (
    Id INT PRIMARY KEY IDENTITY(1,1),
    TaskId INT NOT NULL,
    UserId INT NOT NULL,  -- Foreign key to Users table
    CommentText NVARCHAR(MAX) NOT NULL,
    Timestamp DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (TaskId) REFERENCES Tasks(Id),
    FOREIGN KEY (UserId) REFERENCES Users(Id)  -- Establish relationship with Users
);
ALTER TABLE Users
ADD HashedPassword NVARCHAR(255) NOT NULL
ALTER TABLE Users
ADD SaltPassword NVARCHAR(255) NOT NULL;

ALTER TABLE Users
ADD UserRoles NVARCHAR(50), -- Adjust size as needed
    Status INT DEFAULT 1;    -- Default to Active (1)
