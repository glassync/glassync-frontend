import { RecurrenceInterval } from "./Enum";

export class Event {
    constructor(
        private _uid: number,
        private _title: string,
        private _description: string,
        private _date: Date,
        private _startTime: string,
        private _endTime: string,
        private _recurrenceInterval: RecurrenceInterval = RecurrenceInterval.NONE,
        private _recurrenceValue: number = 0
    ) {}

    get uid(): number {
        return this._uid;
    }

    get title(): string {
        return this._title;
    }

    get description(): string {
        return this._description;
    }

    get date(): Date {
        return this._date;
    }

    get startTime(): string {
        return this._startTime;
    }

    get endTime(): string {
        return this._endTime;
    }

    get recurrenceInterval(): RecurrenceInterval {
        return this._recurrenceInterval;
    }

    get recurrenceValue(): number {
        return this._recurrenceValue;
    }

    set uid(value: number) {
        this._uid = value;
    }

    set title(value: string) {
        this._title = value;
    }

    set description(value: string) {
        this._description = value;
    }

    set date(value: Date) {
        this._date = value;
    }

    set startTime(value: string) {
        if (/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)) {
            this._startTime = value;
        } else {
            throw new Error('Неверный формат времени. Используйте "HH:mm"');
        }
    }

    set endTime(value: string) {
        if (/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)) {
            this._endTime = value;
        } else {
            throw new Error('Неверный формат времени. Используйте "HH:mm"');
        }
    }

    set recurrenceInterval(value: RecurrenceInterval) {
        this._recurrenceInterval = value;
    }

    set recurrenceValue(value: number) {
        if (value >= 0) {
            this._recurrenceValue = value;
        } else {
            throw new Error('Значение интервала не может быть отрицательным');
        }
    }

    toString(): string {
        return `[${this._uid}] ${this._title} (${this._date.toLocaleDateString()} ${this._startTime}-${this._endTime})`;
    }
}