# Zuddl_Assignment
Zuddle assignment of task board
<h1>Questions :</h1>
<h3>How would your tables and apis change for the following scenarios. What tables and api endpoints would you add? Which tables and api endpoints would need to be updated?</h3>

<h4>1.If a user can create and edit stages for a particular board. For example instead of Open > In Progress > Done if they want the stages of their task board to be Read > Working > Reviewing > Completed</h4>
I have added the delete board option so that the user can remove existig task boards and an Add board button to add new board with new tasks.

<h4>2.If users can comment on tasks</h4>
Tables: Introduce a new table to store task comments, linking them to specific tasks.
New tables: TaskComments, including fields like task_id, user_id, comment_text, and timestamp.
API Endpoints: Create new endpoints to manage task comments.
New endpoints: /api/tasks/:taskId/comments for creating, retrieving, updating, or deleting comments associated with a task

<h4>3.How will you do error handling?</h4>
For error handling, you should implement proper status codes and error messages in your API responses. Common HTTP status codes include 400 (Bad Request), 404 (Not Found), 401 (Unauthorized), and 500 (Internal Server Error), among others.
Use try-catch blocks or middleware to capture and handle errors in your server-side code. Log errors for debugging and consider sending user-friendly error messages in API responses.
Implement validation checks on the client and server sides to ensure data integrity and prevent invalid input.
