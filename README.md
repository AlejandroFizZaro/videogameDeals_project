This project is a website that can interact with an external API. The project has the following structure:

## Goal
- Demonstrate my experience in Express JS and the most used middlewares (cors, json, routes, express validator)
- Data base creation, including a user, favourite games, and JWT session database
- API REST creation for interating with the database. 
- Implement a login system in the website that rely on the following standards:
    - Json Web Token generation on login and storage in database
    - Password hashing in database with the most common methods (password hashing, password comparer)
- Create a website using NextJs and using Typescript for typing protection
    - Creation of client side components that interact with a public API and extract data
    - Creation of forms for making API calls for registering accounts and logging into the site

## Stack
### Backend:
- Express.js : Destructuring the app in routes that destructure into controllers, which interact with the Docker Postgres database
- JWT: The token will be generated after login. Important to notice that adding sensitive data to a JWT token is not a good decision. Tokens are coded, but not encrypter. On the internet, coded strings can be decoded easily.
- bcrypt: On user registration, the password will be hashed and added to the database. The comparer from this library is used on login in order to grant access.
- Database:
    - Portgres js library. 
    - Postgres docker container
    - Tables:
      - user: id, userName, email, password (hashed)
      - favourites: id, gameId, userId (foreign key)
      - sessions : id, token, userId (foreign key)

### Frontend:
- Stack: Next JS

## Initialize project:

### Backend: 
#### .env file
Before initializing the backend, it is necessary to create a .env file. This file contain sensitive data from the container or other tools (data such as passwords, ports, IP addresses). In case this project code is used in other project, please make sure that .gitignore mention this file. 
Create the .env file in the backend folder and fill the following data:

    DB_USER=postgres
    DB_PASSWORD=mysecretpassword
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=postgres

    JWT_ISS=https://gamedeals.com/api/v1
    JWT_AUD=https://gamedeals.com
    TOKEN_PRIVATE_KEY=FG)S>M/k~1Pw5>K7&]-2mIe=[g!mIRczw5

Secondly, go to the backend folder, open a console and type the following commands:
#### Postgres docker:
    Docker compose up
#### Express:
    npm install
    npm run dev
### Frontend: Go to the frontend folder, open a console and type the following command:
    npm run dev

