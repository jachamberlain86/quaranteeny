import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import cors = require('cors');
import dotenv = require('dotenv');
// eslint-disable-next-line import/first
import { Routes } from './routes';

createConnection()
  .then(async () => {
    dotenv.config();
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
