import { RecurrenceInterval } from "./Enum";

export class Event {
  private uid = 0;
  private title = "";
  private description = "";
  private date: Date = new Date();
  private startTime = "";
  private endTime = "";
  private recurrenceInterval: RecurrenceInterval = RecurrenceInterval.DAILY;
  private recurrenceValue = 1;
  private members: Map<number, boolean> = new Map();

  // region Конструкторы

  constructor() {
    // if needed
  }

  // endregion

  // region Геттеры

  public getUID(): number {
    return this.uid;
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

  public getRecurrenceInterval(): RecurrenceInterval {
    return this.recurrenceInterval;
  }

  public getRecurrenceValue(): number {
    return this.recurrenceValue;
  }

  public getCreatorUID() {
    return undefined;
  }

  public getReminderTimes() {
    return [];
  }

  public getMembers(): Map<number, boolean> {
    return this.members || [];
  }

  public setReminderTimes(times: number[]): void {
    // Заглушка: просто выводим в консоль
    console.log("Установлены напоминания:", times);
  }

  public setMembers(members: Map<number, boolean>) {
    this.members = members;
  }

  // endregion

  // region Сеттеры

  public setUID(value: number) {
    this.uid = value;
  }

  public setTitle(value: string) {
    this.title = value;
  }

  public setDescription(value: string) {
    this.description = value;
  }

  public setDate(value: Date) {
    this.date = value;
  }

  public setStartTime(value: string) {
    if (/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)) {
      this.startTime = value;
    } else {
      // throw new Error('Неверный формат времени. Используйте "HH:mm"');
    }
  }

  public setEndTime(value: string) {
    if (/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)) {
      this.endTime = value;
    } else {
      // throw new Error('Неверный формат времени. Используйте "HH:mm"');
    }
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

  public static async getEvents(
    userID: number,
    startDate: Date,
    endDate: Date
  ): Promise<Event[]> {
    function formateDate(d: Date) {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0"); // месяцы с 0
      const day = String(d.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    }

    const response = await fetch(`api/event/get/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_uid: userID,
        start_date: formateDate(startDate),
        end_date: formateDate(endDate),
        detailed: true,
      }),
    });

    if (!response.ok) {
      console.error("Error in events");
    }

    const data = await response.json();

    if (data.status !== 200) {
      throw new Error(`API error: ${data.status}`);
    }

    const eventsObject = data.events;
    const eventsArray: Event[] = [];

    for (const key of Object.keys(eventsObject)) {
      const eventData = eventsObject[key];
      const event = new Event();

      event.setUID(eventData.uid);
      event.setTitle(eventData.name);
      event.setDescription(eventData.description);

      const dateTimeString = `${eventData.date}T${eventData.time_start}`;
      event.setDate(new Date(dateTimeString));

      event.setStartTime(eventData.time_start);
      event.setEndTime(eventData.time_end);

      event.setRecurrenceInterval(
        Object.values(RecurrenceInterval).includes(
          eventData.recurrence_rule_type as RecurrenceInterval
        )
          ? (eventData.recurrence_rule_type as RecurrenceInterval)
          : RecurrenceInterval.NONE
      );

      event.setRecurrenceValue(eventData.recurrence_rule_interval || 1);

      const eventMembers: Map<number, boolean> = new Map();
      if (Array.isArray(eventData.notifications)) {
        eventData.notifications.forEach((userId: number) => {
          eventMembers.set(userId, true);
        });
      }

      event.setMembers(eventMembers);

      eventsArray.push(event);
    }

    return eventsArray;
  }

  // endregion
}
