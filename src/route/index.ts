import express from 'express';
import { logger } from '..';
import { Server } from '../server';

export abstract class CommonRoute {
  server: Server;
  name: string;

  constructor(server: Server, name: string) {
    this.server = server;
    this.name = name;
    this.configureRoutes();
    logger.info(`Registered route /${this.name}/`);
  }

  getName(): string {
    return this.name;
  }

  abstract configureRoutes(): express.Application;
}
