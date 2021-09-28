import dotenv from 'dotenv';
import WebUntis from 'webuntis';
import winston, { Logger } from 'winston';
import { Server } from './server';
import { getDateFromUntis } from './util/untis.util';

export const logger: Logger = winston.createLogger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  )
});
export let untis: WebUntis;
export const server: Server = new Server();

(async () => {
  dotenv.config();
  untis = new WebUntis(
    process.env.SERVICE_UNTIS_SCHOOL || '',
    process.env.SERVICE_UNTIS_USERNAME || '',
    process.env.SERVICE_UNTIS_PASSWORD || '',
    process.env.SERVICE_UNTIS_BASEURL || ''
  );

  await untis.login();
  await server.listen();
})();
