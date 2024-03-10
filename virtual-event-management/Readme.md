- This is a Task App that allows below operations:
  - Steps to run:
    1. Clone the repository
    2. Run `npm install`
    3. Run `npm run dev`
    4. Open Postman and hit the below routes
    5. Make sure to have a `.env` file with below variables copied from `.env.example`

  - To run the tests
    - Run `npm run test`
 
  - All test cases won't pass as I have authorized the user based on the role and the user is authorized to perform the operations based on the role.

  - Register a User
    - Route : `http://localhost:3000/users/signup`
    - Method : `POST`
    - Body : 
      ```json
      {
       "name": "Clark Kent",
	   "email": "clark@superman.com",
	   "password": "Krypt()n8",
      }
      ```

  - Login a User
    - Route : `http://localhost:3000/users/login`
    - Method : `POST`
    - Body : 
      ```json
      {
	   "email": "clark@superman.com",
	   "password": "Krypt()n8",
      }
      ```
    
  - Get all events 
    - Route : `http://localhost:3000/events`
    - Method : `GET`
    - Header : `Authorization: Bearer <token>`
    - token : The token received after login
    - This will return all the events

  - Get a single events
    - Route : `http://localhost:3000/events/:id`
    - Method : `GET`
    - Header : `Authorization: Bearer <token>`
    - token : The token received after login
    - This will return signle event

  - Create an event
    - Route : `http://localhost:3000/events`
    - Method : `POST`
    - Header : `Authorization: Bearer <token>`
    - token : The token received after login
    - Body : 
      ```json
      {
        "date": "2023/03/09 13:00:00",
        "time": "2023/03/09 14:00:00",
        "duration": "2 hour",
        "description": "This is a dummy event 2"
      }
      ```
    - This will create an event user needs to authenticated and his role should be organizer.

   - Register for an event
    - Route : `http://localhost:3000/events/:id/register`
    - Method : `POST`
    - Header : `Authorization: Bearer <token>`
    - token : The token received after login
    - This will register the user for that particular event.

  - Update an event
    - Route : `http://localhost:3000/events/:id`
    - Method : `PUT`
    - Header : `Authorization: Bearer <token>`
    - token : The token received after login
    - This will update the event based on the id and return the updated event also it makes sure that the user is the owner of the event and user is organizer of the event.

  - Delete an event
    - Route : `http://localhost:3000/events/:id`
    - Method : `DELETE`
    - Header : `Authorization: Bearer <token>`
    - token : The token received after login
    - This will delete the event based on the id and return the deleted event also it makes sure that the user is the owner of the event and user is organizer of the event.
  

    
 
