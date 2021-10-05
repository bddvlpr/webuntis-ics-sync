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

export function getLocationFromRoom(
  lesson: Lesson
): GeoCoordinates | undefined {
  let fullRoom = lesson.ro.map(room => room.name).join(' ');
  if (fullRoom.includes('ELL')) {
    return {
      lat: 51.230195,
      lon: 4.416088
    };
  } else if (fullRoom.includes('NOO')) {
    return {
      lat: 51.230266,
      lon: 4.414185
    };
  }
  return undefined;
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
    description: `${lesson.lstext || 'No information'}\nTeacher: ${lesson.te
      .map(teacher => teacher.longname)
      .join(', ')}\nSubject: ${lesson.su
      .map(subject => subject.id)
      .join(', ')}\nClasses: ${lesson.kl
      .map(klass => klass.longname)
      .join(', ')}`,
    location: lesson.ro.map(room => room.name).join(' '),
    geo: getLocationFromRoom(lesson),
    uid: MD5(hashObject)
  };
}
