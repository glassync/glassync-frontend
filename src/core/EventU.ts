class EventU {
  private UID: number;
  private title: string;
  private description: string;
  private date: Date;
  private startTime: string;
  private endTime: string;
  private repeatIntervalType: TimeInterval;
  private repeatIntervalValue: number;
  private reminderTimeType: TimeInterval;
  private reminderTimeValue: number;
  private user: Person;
  private eventMembers?: EventMember[];

  constructor(
    UID: number,
    title: string,
    description: string,
    date: Date,
    startTime: string,
    endTime: string,
    repeatIntervalType: TimeInterval,
    repeatIntervalValue: number,
    reminderTimeType: TimeInterval,
    reminderTimeValue: number,
    user: Person
  ) {
    this.UID = UID;
    this.title = title;
    this.description = description;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
    this.repeatIntervalType = repeatIntervalType;
    this.repeatIntervalValue = repeatIntervalValue;
    this.reminderTimeType = reminderTimeType;
    this.reminderTimeValue = reminderTimeValue;
    this.user = user;
  }

  public addEventMember(member: EventMember): void {
    // TODO
    // На диаграмме нет, но как будто бы нужно добавить
  }

  public addEventMembers(members: EventMember[]): void {
    // TODO
    // На диаграмме нет, но как будто бы нужно добавить
  }

  public getEventMembers(): EventMember[] {
    // TODO
    // На диаграмме нет, но как будто бы нужно добавить
    //return this.eventMembers;
    return [];
  }

  public getUID(): number {
    return this.UID;
  }

  public getTitle(): string {
    return this.title;
  }

  public getDescription(): string {
    return this.description;
  }

  public getDate(): Date {
    return this.date;
  }

  public getStartTime(): string {
    return this.startTime;
  }

  public getEndTime(): string {
    return this.endTime;
  }

  public getRepeatIntervalType(): TimeInterval {
    return this.repeatIntervalType;
  }

  public getRepeatIntervalValue(): number {
    return this.repeatIntervalValue;
  }

  public getReminderTimeType(): TimeInterval {
    return this.reminderTimeType;
  }

  public getReminderTimeValue(): number {
    return this.reminderTimeValue;
  }

  public getUser(): Person {
    return this.user;
  }
}
