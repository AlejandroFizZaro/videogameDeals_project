This app is a videogame best deal search tool.

Purspose of this project is to implement the following features:
- Interact with a public API (if there is no good solution, data will be obtained and stored in a docker container db) - If API, there will be no implementation in the backend, otherwise, if db, data will be in the backend
- Manage as efficient as possible a docker database, mainly for user accounts and favourite lists
- Make the user login system secure, with a recover system and a token+hash of the passwords
- Develop a correct backend structure with the necessary features only
- After the backend is tested, make the frontend

Frontend:
- For no users, they can see the videogame deals in a general way, hottest deals, most relevant games, etc. 
- Users and admins will be able to:
    - Add favs to their games
    - Set alarms when the price go down
    - See the favourite list
    - Remove the account
- Admins will be able to:
    - Hide games
    - Add filters (i.e. adult games are hidden)
    - Remove users, block access
    - Remove other managers accounts
    - Remove itself


Steps to create backend environment:

- Postgres database:
    In the root project, run the following command in the terminal (docker is required):
    docker compose up
    Note: Running containters will change the host address according to the method: 
        - via docker compose up, the host will be 'localhost'. 
        - If the docker is started via docker desktop, the host will be 'host.internal.docker'. I will use the terminal so it will be easy to work out with both Windows SO and any Linux distro ( docker Desktop is not available in all Linux distros)

    Postrgres containter is available in 'localhost'

- backend database:
    Tbd if the backend run in a containter. As a reminder, it does not matter if the programming language is not Javascript. Backend, the database and the frontend are split, and different technology can be used as long as backend can understand data coming from the frontend and the database can understand data from the backend.