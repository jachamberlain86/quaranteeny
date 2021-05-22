## Getting started

Run `git clone https://github.com/jachamberlain86/quarantiny.git`.

Run `npm install` from the root project folder.


### Server
Make sure you have postgres installed. Run `createdb quaranteeny`.


In the server folder, create a `.env` file based on `.env.example` and a `ormconfig.env` file based on `ormconfig.env.example`.

### Client
In the client folder, create a `.env` file based on `.env.example`.

### Start the app
Start the server by running `npm start` from `/server`.

Start the client by running `npm start` from `/client`.


## Tech Stack

![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge&logoWidth=40)![React](https://img.shields.io/badge/-ReactJS-61DAFB?logo=react&logoColor=white&style=for-the-badge&logoWidth=40)![Redux](https://img.shields.io/badge/-Redux%20Toolkit-764ABC?logo=redux&logoColor=white&style=for-the-badge&logoWidth=40)![Express](https://img.shields.io/badge/-express-000000?logo=express&logoColor=white&style=for-the-badge&logoWidth=40)![Express](https://img.shields.io/badge/-PostgreSQL-336791?logo=postgresql&logoColor=white&style=for-the-badge&logoWidth=40)

**Front End**

Quaranteeny has been built with:

* [React](https://reactjs.org/): View components have all been made with react v17

* [Redux](https://redux.js.org/): User state was handled by redux v7. Redux Toolkit v1.5 was used.

* [Konva](https://konvajs.org/): A canvas framework for dealing with the game visuals. v7 

* [Howler.js](https://howlerjs.com/): For working with audio files v2

**Back End**

Our server and database setup uses the following tech:

* [Express](https://expressjs.com/)

* [Type ORM](https://typeorm.io/#/)

* [PostgreSQL](https://www.postgresql.org/)