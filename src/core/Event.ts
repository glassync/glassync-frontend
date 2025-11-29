import { RecurrenceInterval } from "./Enum";

export class Event {
  private uid: number;
  private title: string;
  private description: string;
  private date: Date;
  private startTime: string;
  private endTime: string;
  private recurrenceInterval: RecurrenceInterval;
  private recurrenceValue: number;

  // region Конструкторы

  constructor(
    uid: number,
    title: string,
    description: string,
    date: Date,
    startTime: string,
    endTime: string,
    recurrenceInterval: RecurrenceInterval = RecurrenceInterval.NONE,
    recurrenceValue = 0
  ) {
    this.uid = uid;
    this.title = title;
    this.description = description;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
    this.recurrenceInterval = recurrenceInterval;
    this.recurrenceValue = recurrenceValue;
  }

  // endregion

  // region Геттеры

  public getUID(): number {
    return this.uid;
  }

  public getTitle(): string {
    return this.title;
  }
  public getTitle(): string {
    return this.title;
  }

  public getDescription(): string {
    return this.description;
  }
  public getDescription(): string {
    return this.description;
  }

  public getDate(): Date {
    return this.date;
  }
  public getDate(): Date {
    return this.date;
  }

  public getStartTime(): string {
    return this.startTime;
  }
  public getStartTime(): string {
    return this.startTime;
  }

  public getEndTime(): string {
    return this.endTime;
  }
  public getEndTime(): string {
    return this.endTime;
  }

  public getRecurrenceInterval(): RecurrenceInterval {
    return this.recurrenceInterval;
  }
  public getRecurrenceInterval(): RecurrenceInterval {
    return this.recurrenceInterval;
  }

  public getRecurrenceValue(): number {
    return this.recurrenceValue;
  }
  public getRecurrenceValue(): number {
    return this.recurrenceValue;
  }

  // endregion

  // region Сеттеры

  public setUID(value: number) {
    this.uid = value;
  }

  public setTitle(value: string) {
    this.title = value;
  }
  public setTitle(value: string) {
    this.title = value;
  }

  public setDescription(value: string) {
    this.description = value;
  }
  public setDescription(value: string) {
    this.description = value;
  }

  public setDate(value: Date) {
    this.date = value;
  }
  public setDate(value: Date) {
    this.date = value;
  }

  public setStartTime(value: string) {
    if (/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)) {
      this.startTime = value;
    } else {
      throw new Error('Неверный формат времени. Используйте "HH:mm"');
    }
  }
  public setStartTime(value: string) {
    if (/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)) {
      this.startTime = value;
    } else {
      throw new Error('Неверный формат времени. Используйте "HH:mm"');
    }
  }

  public setEndTime(value: string) {
    if (/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)) {
      this.endTime = value;
    } else {
      throw new Error('Неверный формат времени. Используйте "HH:mm"');
    }
  }
  public setEndTime(value: string) {
    if (/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)) {
      this.endTime = value;
    } else {
      throw new Error('Неверный формат времени. Используйте "HH:mm"');
    }
  }

  public setRecurrenceInterval(value: RecurrenceInterval) {
    this.recurrenceInterval = value;
  }
  public setRecurrenceInterval(value: RecurrenceInterval) {
    this.recurrenceInterval = value;
  }

  public setRecurrenceValue(value: number) {
    if (value >= 0) {
      this.recurrenceValue = value;
    } else {
      throw new Error("Значение интервала не может быть отрицательным");
    }
  }

  // endregion
}
