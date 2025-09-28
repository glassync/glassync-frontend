import { RecurrenceInterval } from "./Enum";

export class Event {
  private uid = 0;
  private title = "";
  private description = "";
  private date: Date = new Date();
  private startTime = "";
  private endTime = "";
  private creatorID = 0;
  private recurrenceInterval: RecurrenceInterval = RecurrenceInterval.NONE;
  private recurrenceValue = 0;
  private members: Map<number, boolean> = new Map();
  private notifications: number[] = [];

  // region Конструкторы

  constructor() {
    // if needed
  }

  // endregion

  public static formatTime(timeStr: string): string {
    if (!timeStr) return "00:00:00"; // Если строка пустая

    // Разбиваем строку по двоеточиям
    const parts = timeStr.split(":");

    // Берем только часы и минуты (первые 2 части)
    const hours = parts[0]?.padStart(2, "0") || "00";
    const minutes = parts[1]?.padStart(2, "0") || "00";

    // Форматируем в HH:MM:00
    return `${hours}:${minutes}:00`;
  }

  // region Геттеры
  public getNotifications(): number[] {
    return this.notifications;
  }

  public setNotifications(newNotifications: number[]): void {
    this.notifications = newNotifications;
  }

  public getCreatorID(): number {
    return this.creatorID;
  }

  public setCreatorID(newCreatorID: number): void {
    this.creatorID = newCreatorID;
  }
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
    return Event.formatTime(this.startTime);
  }

  public getEndTime(): string {
    return Event.formatTime(this.endTime);
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
    this.startTime = Event.formatTime(value);
  }

  public setEndTime(value: string) {
    this.endTime = Event.formatTime(value);
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
        start_date: formateDate(startDate) + "T00:00:00",
        end_date: formateDate(endDate) + "T23:59:59",
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

      event.setUID(eventData.id);
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

      event.setRecurrenceValue(eventData.recurrence_rule_interval || 0);

      const eventMembers: Map<number, boolean> = new Map();
      if (Array.isArray(eventData.notifications)) {
        eventData.notifications.forEach((userId: number) => {
          eventMembers.set(userId, true);
        });
      }

      event.setMembers(eventMembers);
      event.setCreatorID(eventData.creator_id);
      event.setNotifications(eventData.notifications);

      eventsArray.push(event);
    }

    return eventsArray;
  }

  public async sendEventInvite(): void {
    const response = await fetch(`api/event/action/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event_id: this.getUID(),
        action: "invite",
        extra_data: {
          user_id: this.getCreatorID(),
        },
      }),
    });
  }

  public static async getEventsByIDs(eventIDs: number): Promise<Event> {
    const response = await fetch(`api/event/get/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event_uids: [eventIDs],
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
    const eventKey = Object.keys(eventsObject)[0]; // "18"
    const eventData = eventsObject[eventKey];
    const event = new Event();

    event.setUID(eventData.id);
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

    event.setRecurrenceValue(eventData.recurrence_rule_interval || 0);

    const eventMembers: Map<number, boolean> = new Map();
    if (Array.isArray(eventData.notifications)) {
      eventData.notifications.forEach((userId: number) => {
        eventMembers.set(userId, true);
      });
    }

    event.setMembers(eventMembers);
    event.setCreatorID(eventData.creator_id);
    event.setNotifications(eventData.notifications);

    console.log("Return event: ", event);
    return event;
  }

  // endregion
}
