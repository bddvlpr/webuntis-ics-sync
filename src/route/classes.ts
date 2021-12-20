import express, { Request, Response } from 'express';
import { Server } from '../server';
import { CommonRoute } from '.';
import { untis } from '..';
import { validateSession } from '../util/untis.util';

export class ClassRoute extends CommonRoute {
  constructor(server: Server) {
    super(server, 'classes');
  }

  configureRoutes(): express.Application {
    this.server.app
      .route(`/${this.name}`)
      .get(async (req: Request, res: Response) => {
        await validateSession();
        res.status(404).json(await untis.getClasses());
      });
    return this.server.app;
  }
}
