import { Person } from "./Person";

class EventMember {
  private user: Person;
  private event: Event;
  private attendanceConfirmed = false;

  constructor(user: Person, event: Event) {
    this.user = user;
    this.event = event;
  }

  public confirmAttendance(): void {
    // TODO
    // На диаграмме нет, но как будто бы нужно добавить
    this.attendanceConfirmed = true;
  }

  public cancelAttendance(): void {
    // TODO
    // На диаграмме нет, но как будто бы нужно добавить
    this.attendanceConfirmed = false;
  }
}
