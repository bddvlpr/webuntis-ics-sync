import { Lesson } from 'webuntis';
import { EventAttributes } from 'ics';
import { getDateFromUntis } from './untis.util';

export function convertLessonsToEvents(lessons: Lesson[]): EventAttributes[] {
  let convertedLessons: EventAttributes[] = [];
  for (let lesson in lessons) {
    convertedLessons.push(convertLessonToEvent(lessons[lesson]));
  }
  return convertedLessons;
}

export function convertLessonToEvent(lesson: Lesson): EventAttributes {
  let start = getDateFromUntis(String(lesson.date), String(lesson.startTime));
  let end = getDateFromUntis(String(lesson.date), String(lesson.endTime));

  return {
    start: [
      start.getFullYear(),
      start.getMonth(),
      start.getDate(),
      start.getHours(),
      start.getMinutes()
    ],
    end: [
      end.getFullYear(),
      end.getMonth(),
      end.getDate(),
      end.getHours(),
      end.getMinutes()
    ],
    title: lesson.su.map(subject => subject.longname).join(', '),
    description: `${lesson.lstext || 'No information'}`,
    location: lesson.ro.map(room => room.name).join(' ')
  };
}
