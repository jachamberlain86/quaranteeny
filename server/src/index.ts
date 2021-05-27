import 'reflect-metadata';
import { createConnection, getConnectionOptions } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import cors = require('cors');
import dotenv = require('dotenv');
// eslint-disable-next-line import/first
import { Routes } from './routes';

dotenv.config();

getConnectionOptions()
  .then((connectionOptions) => {
    // In production we use process.env.DATABASE_URL for the connection details.
    // Heroku rotates the DATABASE_URL periodically, which is why we can't just
    // use TYPEORM_URL.
    Object.assign(connectionOptions, { url: process.env.DATABASE_URL });
    return connectionOptions;
  })
  .then((connectionOptions) => {
    createConnection(connectionOptions)
      .then(async () => {
        const { PORT } = process.env;

        // create express app
        const app = express();
        app.use(cors());
        app.use(bodyParser.json());

        // register express routes from defined application routes
        Routes.forEach((route) => {
          (app as express.Express)[route.method](
            route.route,
            (req: Request, res: Response, next: express.NextFunction) => {
              // eslint-disable-next-line
          const result = new (route.controller as any)()[route.action](
                req,
                res,
                next
              );
              if (result instanceof Promise) {
                result.then((outcome) =>
                  outcome !== null && outcome !== undefined
                    ? res.send(outcome)
                    : undefined
                );
              } else if (result !== null && result !== undefined) {
                res.json(result);
              }
            }
          );
        });

        // start express server
        app.listen(PORT || 3001);
        // eslint-disable-next-line no-console
        console.log(`Express server listening on port ${PORT || 3001}`);
      })
      // eslint-disable-next-line no-console
      .catch((error) => console.log(error));
  });
