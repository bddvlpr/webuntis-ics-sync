import express, { Request, response, Response } from 'express';
import { Server } from '../server';
import { CommonRoute } from '.';
import { untis } from '..';

export class HolidaysRoute extends CommonRoute {
  constructor(server: Server) {
    super(server, 'holidays');
  }

  configureRoutes(): express.Application {
    this.server.app
      .route(`/${this.name}`)
      .get(async (req: Request, res: Response) => {
        res.status(200).json(await untis.getHolidays());
      });
    return this.server.app;
  }
}
