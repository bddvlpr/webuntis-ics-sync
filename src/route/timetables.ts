import express, { Request, response, Response } from 'express';
import { Server } from '../server';
import { CommonRoute } from '.';
import { untis } from '..';
import { Lesson } from 'webuntis';
import { convertLessonsToEvents } from '../util/lesson.util';
import * as ics from 'ics';
import { validateSession } from '../util/untis.util';

export class TimetablesRoute extends CommonRoute {
  constructor(server: Server) {
    super(server, 'timetables');
  }

  configureRoutes(): express.Application {
    this.server.app
      .route(`/${this.name}`)
      .get(async (req: Request, res: Response) => {
        res.status(404).json({
          success: false
        });
      });
    this.server.app
      .route(`/${this.name}/:classId`)
      .get(async (req: Request, res: Response) => {
        try {
          await validateSession();

          let classId: number = parseInt(req.params.classId);
          let lessons: Lesson[] = await untis.getTimetableForRange(
            new Date(new Date().setDate(new Date().getDate() - 7)),
            new Date(new Date().setDate(new Date().getDate() + 30)),
            classId,
            1
          );

          var events = ics.createEvents(convertLessonsToEvents(lessons));

          if (events.error) {
            res.status(500).json({ success: false, error: events.error });
            return;
          }

          res.status(200).send(events.value);
        } catch (e: any) {
          res.status(500).json({
            success: false,
            message: e.message || e
          });
        }
      });
    return this.server.app;
  }
}
