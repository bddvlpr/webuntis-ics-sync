import express, { Request, Response } from 'express';
import { logger } from '.';
import { ClassRoute } from './route/classes';
import { HomeworkRoute } from './route/homework';
import { CommonRoute } from './route';
import { HolidaysRoute } from './route/holidays';
import { TimetablesRoute } from './route/timetables';

export class Server {
  public app: express.Application;
  public routes: CommonRoute[];

  constructor() {
    this.app = express();
    this.routes = [
      new ClassRoute(this),
      new HomeworkRoute(this),
      new HolidaysRoute(this),
      new TimetablesRoute(this)
    ];
  }

  public async listen() {
    const appPort = process.env.PORT || process.env.EXPRESS_PORT;

    this.app.route('/').get(async (req: Request, res: Response) => {
      res.status(200).json({
        availableRoutes: this.routes.map(route => {
          return `/${route.name}/`;
        })
      });
    });

    this.app.listen(appPort, () => {
      logger.info(
        `API accessible at http://localhost:${appPort}/ or externally on port ${appPort}`
      );
    });
  }
}
