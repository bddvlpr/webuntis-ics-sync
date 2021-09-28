import express, { Request, Response } from 'express';
import { Server } from '../server';
import { CommonRoute } from '.';

export class HomeworkRoute extends CommonRoute {
  constructor(server: Server) {
    super(server, 'homework');
  }

  configureRoutes(): express.Application {
    this.server.app
      .route(`/${this.name}`)
      .get(async (req: Request, res: Response) => {
        res.status(200);
      });
    return this.server.app;
  }
}
