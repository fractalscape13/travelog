# Travelog

#### _May 2020_
#### By _**Joseph Wangemann**_

## Description
_App to store info about travel destinations_

## Specs / Screen Shots
* On page load, a user will see...
![Name](./src/assets/image.png?raw=true "Image description")


## Installation/Setup Instructions
This project uses MongoDb Atlas as a database and Express-Sessions for authentication persistence.  It requires a user to create a .env file in the root directory of this project which will contain three values:
  * CONNECTION_STRING = 'Your unique connection string from MongoDb Atlas goes here'
  * SESSION_SECRET = 'Your unique session secret goes here. It can be any string'
  * apiPort = Whatever port you want the back-end to run on goes here. It will be a number, not a string. Example: 8000

To run this project, you will:
  * Get a connection string from MongoDb Atlas
  * Clone the repository: `git clone https://github.com/fractalscape13/travelog`
  * In the root project directory, run `npm install` to install all dependencies. 
  * You will open two terminals and navigate to the root directory.  In one terminal you will run the back-end `npx nodemon`, and in the other you will run the front-end `npm start`
  *Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Technologies Used
* React
* create-react-app
* Redux / React-Redux
* React-Router
* Express / Express-Session
* Node
* Nodemon
* MongoDb
* Mongoose
* Bcrypt
* Axios
* Multer
* Body Parser
* Cors
* Dotenv

## Known Bugs/Contact

_If you have any questions or comments at all, please submit a pull request._

### License

*This webpage is licensed under the MIT license.*

Copyright (c) 2020 **_Joseph Wangemann**