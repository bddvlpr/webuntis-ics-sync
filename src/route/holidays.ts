import express, { Request, response, Response } from 'express';
import { Server } from '../server';
import { CommonRoute } from '.';
import { untis } from '..';
import { validateSession } from '../util/untis.util';

export class HolidaysRoute extends CommonRoute {
  constructor(server: Server) {
    super(server, 'holidays');
  }

  configureRoutes(): express.Application {
    this.server.app
      .route(`/${this.name}`)
      .get(async (req: Request, res: Response) => {
        await validateSession();
        res.status(200).json(await untis.getHolidays());
      });
    return this.server.app;
  }
}
