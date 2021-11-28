import { Lesson } from 'webuntis';
import { EventAttributes, GeoCoordinates } from 'ics';
import { getDateFromUntis } from './untis.util';
import { MD5 } from 'object-hash';

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

  const hashObject = {
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
    title: lesson.su.map(subject => subject.longname).join(', ')
  };

  return {
    start: [
      start.getFullYear(),
      start.getMonth() < 1 ? 1 : start.getMonth(),
      start.getDate(),
      start.getHours(),
      start.getMinutes()
    ],
    end: [
      end.getFullYear(),
      end.getMonth() < 1 ? 1 : end.getMonth(),
      end.getDate(),
      end.getHours(),
      end.getMinutes()
    ],
    title: lesson.su.map(subject => subject.longname).join(', '),
    description: `${lesson.lstext || 'No information'}\nTeacher: ${lesson.te
      .map(teacher => teacher.longname)
      .join(', ')}\nSubject: ${lesson.su
        .map(subject => subject.id)
        .join(', ')}\nClasses: ${lesson.kl
          .map(klass => klass.longname)
          .join(', ')}`,
    location: lesson.ro.map(room => room.name).join(' '),
    uid: MD5(hashObject)
  };
}
