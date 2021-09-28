import { untis } from '..';

export function getDateFromUntis(date: string, time?: string): Date {
  if (time) {
    return new Date(
      parseInt(date.substr(0, 4)),
      parseInt(date.substr(4, 2)),
      parseInt(date.substr(6, 2)),
      parseInt(time.substr(0, time.length > 3 ? 2 : 1)),
      parseInt(time.substr(time.length > 3 ? 2 : 1))
    );
  }
  return new Date(
    parseInt(date.substr(0, 4)),
    parseInt(date.substr(4, 2)),
    parseInt(date.substr(6, 2))
  );
}

export async function validateSession() {
  if (!(await untis.validateSession())) {
    console.warn('Session has expired. Relogging in...');
    untis.login();
  }
}
