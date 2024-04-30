- This is a Task App that allows below operations:
  - Steps to run:
    1. Clone the repository
    2. Run `npm install`
    3. Run `npm run dev`
    4. Open Postman and hit the below routes

## Desclaimer:
    - This app is not yet deployed on any cloud platform, so you can run it locally and test the routes using Postman
    - You can use the below routes to test the app
    - I have not setup the test cases for this app, but I have tested the routes using Postman
    - I am using MongoDB as the database, so you need to have MongoDB installed on your machine or you can use MongoDB Atlas
    - I have used JWT for authentication, so you need to pass the token in the header for the routes that require authentication

## Below are the routes that are supported by the Task App:

### User Routes
  - Create a User
    - Route : `http://localhost:3000/api/v1/users`
    - Method : `POST`
    - Body : 
      ```json
      {
        "name": "User 1",
        "email": "user@gamil.com",
        "password": "password"
      }
     ```

 - Login User
    - Route : `http://localhost:3000/api/v1/users/login`
    - Method : `POST`
    - Body : 
        ```json
        {
            "email": "user@gamil.com",
            "password": "password"
        }
        ``` 
    This will return a token which you can use to access the other routes

 - Update user profile
    - Route : `http://localhost:3000/api/v1/users/:userId/update`
    - Method : `PUT`
    - Body : 
      ```json
      {
        "email": "new_email",
        "password": "new_password",
        "userName": "new_userName"
      }
      ```      
        
 - Logout User
    - Route : `http://localhost:3000/api/v1/users/logout`
    - Method : `POST`
    - Body : 
      ```json
      {
        "email": "user@gamil.com",
        "password": "password"
      }
     ```



### Task Routes
  - Create a Task
    - Route : `http://localhost:3000/api/v1/tasks`
    - Method : `POST`
    - Body : 
      ```json
      {
        "title": "Task 1",
        "description": "Task 1 Description",
        "dueDate": "2021-12-31",
      }
      ```

  - List all Tasks assigned to you
    - Route : `http://localhost:3000/api/v1/tasks/all`
    - Method : `GET`
    

    - Filter tasks with status
        - Route :  `http://localhost:3000/api/v1/tasks?status=status_val`
    
    - Search tasks by title or description
        - Route : `http://localhost:3000/api/v1/tasks?search=keyword`
    

    
  - Update Task Status  => Supporeted statuses are => ['open', 'in-progress', 'hold', 'completed']
    - Route : `http://localhost:3000/api/v1/tasks/:taskId`
    - Method : `PUT`
    - Body : 
      ```json
      {
        "status": "completed"
      }
      ```
    - Mark a Task as Done/Undone
    - Change the priority of a Task
    - Change the title, description 
    - If you will pass empty title or description, it will not update the title or description


  - Add comments to the task or add attachment to the task 
    - Route : `http://localhost:3000/api/v1/:taskId/comment`
    - Method : `POST`
    - Body : 
      ```json
      {
        "comment": "Task 1 Comment",
        "attachment": "Task 1 Attachment"
      }
      ```
  - Assign a Task to a another member of the team
    - Route : `http://localhost:3000/api/v1/:taskId/assign`
    - Method : `POST`
    - Body : 
      ```json
      {
        "assignedTo": "user_id"
      }
      ```

### Teams Routes:
    - Create a team
        - Route : `http://localhost:3000/api/v1/teams`
        - Method : `POST`
        - Body : 
        ```json
        {
            "teamName" : "abc", 
            "members": ["user_id1", "user_id2"]
        }
        ```

    - Add a new team member
        - Route : `http://localhost:3000/api/v1/teams/:teamId/add-member`
        - Method : `POST`
        - Body : 
        ```json
        {
            "memberId" : "user_id", 
        }
        ```