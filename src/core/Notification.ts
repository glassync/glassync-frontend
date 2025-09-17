import { NotificationType } from "./Enum";

export class Notification {
    private timestamp: Date;
    private type: NotificationType;

    constructor(type: NotificationType, timestamp?: Date) {
        this.type = type;
        this.timestamp = timestamp || new Date();
    }

    getTimestamp(): Date {
        return this.timestamp;
    }

    getType(): NotificationType {
        return this.type;
    }

    setTimestamp(timestamp: Date): void {
        this.timestamp = timestamp;
    }

    setType(type: NotificationType): void {
        this.type = type;
    }

    toString(): string {
        return `[${this.type}] ${this.timestamp.toISOString()}`;
    }
}

