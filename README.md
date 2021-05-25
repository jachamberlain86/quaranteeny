<p align="center">
<img width="1000" alt="Quaranteeny start menu" src="https://github.com/jachamberlain86/content-assets/blob/931e879f0f98a738fa7ce967bd74ebbe0b72c1bb/quaranteeny-start.png">
</p>

<code><img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge"></code>
<code><img alt="CSS3" src="https://img.shields.io/badge/-CSS3-1572B6?logo=css3&logoColor=white&style=for-the-badge"></code>
<code><img alt="React" src="https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white&style=for-the-badge"></code>
<code><img alt="Redux Toolkit" src="https://img.shields.io/badge/-Redux%20Toolkit-764ABC?logo=redux&logoColor=white&style=for-the-badge"></code>
<code><img alt="Express" src="https://img.shields.io/badge/-Express-000000?logo=express&logoColor=white&style=for-the-badge"></code>
<code><img alt="PostgreSQL" src="https://img.shields.io/badge/-PostgreSQL-336791?logo=postgresql&logoColor=white&style=for-the-badge"></code>
<code><img alt="TypeORM" src="https://img.shields.io/badge/-TypeORM-E83524?logoColor=white&style=for-the-badge"></code>
<code><img alt="Jest" src="https://img.shields.io/badge/-Jest-C21325?logo=jest&logoColor=white&style=for-the-badge"></code>

# Quaranteeny: Stay inside to survive!

<a href="https://youtu.be/ODmWVrwjDgc">
       <p align="center">
<img width="700" alt="Quaranteeny video" src="https://github.com/jachamberlain86/content-assets/blob/931e879f0f98a738fa7ce967bd74ebbe0b72c1bb/quaranteeny-poster.png">
</p>
</a>

## The Game

Giant crabs have taken over and lockdown has been enforced! You must help Quaranteeny stay inside their flat and away from pinching claws. Keep them happy, healthy, and well-fed. Neglect quaranteeny's needs for too long and they will venture outdoors...

Players must keep quaranteeny's hunger, energy, and health meters within safe parameters. If any of these three meters are too low for too long, it's game over.
Behind these three visible meters are many hidden ones. Players only get hints as to what they are, and must pay attention to quaranteeny's thoughts in order to react appropriately. Give quaranteeny too much or too little of anything and game changing conditions will be applied.

<p align="center">
<img width="700" alt="Quaranteeny night" src="https://github.com/jachamberlain86/content-assets/blob/931e879f0f98a738fa7ce967bd74ebbe0b72c1bb/quaranteeny-night.png">
</p>

Navigate quaranteeny's flat using either a mouse or keyboard and interact with the furniture within. You can even leave quaranteeny to make their own decisions, though they rarely know what's best for them. Play in real time and watch the days pass by or choose one of the increased speeds to make things a little more stressful. How long can you help quaranteeny survive?

Quaranteeny was built in lockdown conditions. We no longer remember what outside looks like...


## Tech Stack

**Front End**

Quaranteeny has been written in TypeScript and built with:

* [React](https://reactjs.org/)

* [Redux](https://redux.js.org/)

* [Konva](https://konvajs.org/)

* [Howler.js](https://howlerjs.com/)


**Back End**

Our server and database setup has been built with the following tech:

* [Express](https://expressjs.com/)

* [Type ORM](https://typeorm.io/#/)

* [PostgreSQL](https://www.postgresql.org/)


**Testing**

All unit tests have been written using Jest:

* [Jest](https://jestjs.io/)


<p align="center">
<img width="700" alt="Quaranteeny crabs" src="https://github.com/jachamberlain86/content-assets/blob/931e879f0f98a738fa7ce967bd74ebbe0b72c1bb/quaranteeny-crabs.png">
</p>

## Getting started

Run `git clone https://github.com/jachamberlain86/quaranteeny.git`.

Run `npm install` from the root project folder.


### Server

Make sure you have postgreSQL installed. Run `createdb quaranteeny`.

In the server folder, create a `.env` file based on `.env.example` and a `ormconfig.env` file based on `ormconfig.env.example`.

### Client

In the client folder, create a `.env` file based on `.env.example`.

### Start the app

Start the server by running `npm start` from `/server`.

Start the client by running `npm start` from `/client`.

<p align="center">
<img width="700" alt="Quaranteeny day" src="https://github.com/jachamberlain86/content-assets/blob/931e879f0f98a738fa7ce967bd74ebbe0b72c1bb/quaranteeny-day.png">
</p>

## To Do

* Refactor the game's main loop to use requestAnimationFrame instead of Date.now() and setInterval()
* Redistribute state stored across slices, in components, and data files to make better use of Redux
* Refactor Redux to act more like an event handler, reworking helper functions to be reducers
* Improve database security
* Deploy via Heroku
* Add meaningful values to the conditions object
* Balance meters at all gameplay speeds
* Extend personality system, quaranteeny randomisation, and flat status conditions


## Built By
| <img src="https://avatars.githubusercontent.com/u/74981447?v=4" width="70" alt="James"/> | <img src="https://avatars.githubusercontent.com/u/5665940?v=4" width="70" alt="Roman" /> | <img src="https://avatars.githubusercontent.com/u/74319526?v=4" width="70" alt="Ro" /> | <img src="https://avatars.githubusercontent.com/u/78158497?v=4" width="70" alt="Ross" />
--- | --- | --- | ---
**James Chamberlain** | **Roman Duda** | **Ro Thomas** | **Ross Curry**
[LinkedIn](https://www.linkedin.com/in/chambermade/) | [LinkedIn](https://www.linkedin.com/in/roman-duda-52287a52/) | [LinkedIn](https://www.linkedin.com/in/romthomas/) | [LinkedIn](https://www.linkedin.com/in/ross-curry/)
[GitHub](https://github.com/jachamberlain86) | [GitHub](https://github.com/romduda) | [GitHub](https://github.com/someonera) | [GitHub](https://github.com/RossCurry)
