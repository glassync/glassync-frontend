import { NotificationType } from "./Enum";

export class Notification {
  private timestamp: Date;
  private type: NotificationType;

  // region Конструкторы

  constructor(type: NotificationType, timestamp?: Date) {
    this.type = type;
    this.timestamp = timestamp || new Date();
  }

  // endregion

  // region Геттеры

  public getTimestamp(): Date {
    return this.timestamp;
  }

  public getType(): NotificationType {
    return this.type;
  }

  // endregion

  // region Сеттеры

  public setTimestamp(timestamp: Date): void {
    this.timestamp = timestamp;
  }

  public setType(type: NotificationType): void {
    this.type = type;
  }

  // endregion
}
