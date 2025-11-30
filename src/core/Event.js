/* ToDo {
    Объяснить зачем у нас закомичен js файл, скомпилированный из ts.
    При изменении содержания ts файла у нас же автоматически js не перекомпилируется?
    Если за этим необходимо следить то как будто лишняя головная боль?
    Моё предложение удалить js файл из истории репозитория.
 }*/

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
var Enum_1 = require("./Enum");
var Event = /** @class */ (function () {
  function Event(
    uid,
    title,
    description,
    date,
    startTime,
    endTime,
    recurrenceInterval,
    recurrenceValue
  ) {
    if (recurrenceInterval === void 0) {
      recurrenceInterval = Enum_1.RecurrenceInterval.NONE;
    }
    if (recurrenceValue === void 0) {
      recurrenceValue = 0;
    }
    this.uid = uid;
    this.title = title;
    this.description = description;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
    this.recurrenceInterval = recurrenceInterval;
    this.recurrenceValue = recurrenceValue;
  }
  Event.prototype.getUID = function () {
    return this.uid;
  };
  Event.prototype.getTitle = function () {
    return this.title;
  };
  Event.prototype.getDescription = function () {
    return this.description;
  };
  Event.prototype.getDate = function () {
    return this.date;
  };
  Event.prototype.getStartTime = function () {
    return this.startTime;
  };
  Event.prototype.getEndTime = function () {
    return this.endTime;
  };
  Event.prototype.getRecurrenceInterval = function () {
    return this.recurrenceInterval;
  };
  Event.prototype.getRecurrenceValue = function () {
    return this.recurrenceValue;
  };
  Event.prototype.setUID = function (value) {
    this.uid = value;
  };
  Event.prototype.setTitle = function (value) {
    this.title = value;
  };
  Event.prototype.setDescription = function (value) {
    this.description = value;
  };
  Event.prototype.setDate = function (value) {
    this.date = value;
  };
  Event.prototype.setStartTime = function (value) {
    if (/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)) {
      this.startTime = value;
    } else {
      throw new Error('Неверный формат времени. Используйте "HH:mm"');
    }
  };
  Event.prototype.setEndTime = function (value) {
    if (/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)) {
      this.endTime = value;
    } else {
      throw new Error('Неверный формат времени. Используйте "HH:mm"');
    }
  };
  Event.prototype.setRecurrenceInterval = function (value) {
    this.recurrenceInterval = value;
  };
  Event.prototype.setRecurrenceValue = function (value) {
    if (value >= 0) {
      this.recurrenceValue = value;
    } else {
      throw new Error("Значение интервала не может быть отрицательным");
    }
  };
  return Event;
})();
exports.Event = Event;
