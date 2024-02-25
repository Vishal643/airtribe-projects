- This is a Task App that allows below operations:
  - Steps to run:
    1. Clone the repository
    2. Run `npm install`
    3. Run `npm run dev`
    4. Open Postman and hit the below routes
    5. Make sure to have a `.env` file with below variables copied from `.env.example`

  - To run the tests
    - Run `npm run test`

  - Register a User
    - Route : `http://localhost:3000/users/signup`
    - Method : `POST`
    - Body : 
      ```json
      {
       "name": "Clark Kent",
	   "email": "clark@superman.com",
	   "password": "Krypt()n8",
	   "preferences": ["movies", "comics"],
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
    
  - Get user news preferences 
    - Route : `http://localhost:3000/users/preferences`
    - Method : `GET`
    - Header : `Authorization: Bearer <token>`
    - token : The token received after login
    - This will return the news preferences of the user

  - Update users news preferences 
    - Route : `http://localhost:3000/users/preferences`
    - Method : `PUT`
    - Header : `Authorization: Bearer <token>`
    - token : The token received after login
    - This will update the news preferences of the user

  - Get news based on users preferences 
    - Route : `http://localhost:3000/news`
    - Method : `GET`
    - Header : `Authorization: Bearer <token>`
    - token : The token received after login
    - This will return the news based on users preferences

    
 
