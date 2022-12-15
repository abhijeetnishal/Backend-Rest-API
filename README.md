# RestAPI using Node.js and Express

> ### Example Node (Express + Mongoose) codebase containing real world examples (CRUD, auth, etc).

# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- Create a .env file and add mongoDB uri, secret key and other secure information according to project
- `npm run dev` to start the local server

## Application Structure

- `server.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `controller/` - This folder contains functions related to signup, login, etc.
- `routes/` - This folder contains the route definitions for our API.
- `database/` - This folder contains the schema definitions for our Mongoose models.
- `static/` - This folder conatains a static files such as html, css, etc.

## Authentication

Requests are authenticated using the `Authorization` header with a valid JWT. We define two express middlewares in `middleware/auth.js` that can be used to authenticate requests. The `required` middleware configures the `express-jwt` middleware using our application's secret and will return a 401 status code if the request cannot be authenticated. The payload of the JWT can then be accessed from `req.payload` in the endpoint. The `optional` middleware configures the `express-jwt` in the same way as `required`, but will *not* return a 401 status code if the request cannot be authenticated.

## To Test API's
- Install Postman or any API testing application. You can visit: https://www.postman.com/downloads/
- Open Postman and enter any API endpoints mentioned below:
- List of available routes: <br/>
- Auth routes: <br/>
  POST api/auth/signup - Signup <br/>
  POST api/auth/login - Signin  <br/>
  
- Passowds routes: <br/>
  POST api/passwords/ - Create a Passwods with website name  <br/>
  GET api/passwords - Get all website names with there password in encrypted manner <br/>
  GET api/passwords/:id - Get a particular website name with password in decrypted manner  <br/>
  PUT api/passwords/:id - Update website name and password of Particular userid  <br/>
  DELETE api/passwords/:id - Delete website name with password of Particular userid <br/>

<br />
