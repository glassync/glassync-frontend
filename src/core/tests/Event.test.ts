import { Event } from "../Event";
import { RecurrenceInterval } from "../Enum";

const testEvent = new Event(
  1,
  "Тестовое событие",
  "Это описание тестового события",
  new Date("2023-12-31"),
  "10:00",
  "11:30",
  RecurrenceInterval.WEEKLY,
  2
);

console.log("UID:", testEvent.getUID());
console.log("Title:", testEvent.getTitle());
console.log("Description:", testEvent.getDescription());
console.log("Date:", testEvent.getDate());
console.log("Start Time:", testEvent.getStartTime());
console.log("End Time:", testEvent.getEndTime());
console.log("Recurrence Interval:", testEvent.getRecurrenceInterval());
console.log("Recurrence Value:", testEvent.getRecurrenceValue());

try {
  testEvent.setTitle("Обновленное событие");
  testEvent.setDescription("Обновленное описание");
  testEvent.setDate(new Date("2024-01-01"));
  testEvent.setStartTime("14:00");
  testEvent.setEndTime("15:30");
  testEvent.setRecurrenceInterval(RecurrenceInterval.MONTHLY);
  testEvent.setRecurrenceValue(3);

  console.log("\nПосле обновления:");
  console.log("Title:", testEvent.getTitle());
  console.log("Description:", testEvent.getDescription());
  console.log("Date:", testEvent.getDate());
  console.log("Start Time:", testEvent.getStartTime());
  console.log("End Time:", testEvent.getEndTime());
  console.log("Recurrence Interval:", testEvent.getRecurrenceInterval());
  console.log("Recurrence Value:", testEvent.getRecurrenceValue());

  console.log("\nТестируем валидацию:");

  console.log("\n#1 Время начала - 25:00");
  try {
    testEvent.setStartTime("25:00");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Ошибка при установке времени начала:", error.message);
    } else console.log("Неизвестная ошибка:", error);
  }

  console.log("\n#2 Время конца - 12:60");
  try {
    testEvent.setEndTime("12:60");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Ошибка при установке времени окончания:", error.message);
    } else console.log("Неизвестная ошибка:", error);
  }

  console.log("\n#3 Повторяемое значение - отрицательное число");
  try {
    testEvent.setRecurrenceValue(-5);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Ошибка при установке значения интервала:", error.message);
    } else console.log("Неизвестная ошибка:", error);
  }
} catch (error) {
  console.error("Произошла ошибка:", error);
}

const nonRecurrentEvent = new Event(
  2,
  "Одноразовое событие",
  "Событие без повторений",
  new Date("2023-12-25"),
  "09:00",
  "10:00",
  RecurrenceInterval.NONE,
  0
);

console.log("\nОдноразовое событие:");
console.log("Recurrence Interval:", nonRecurrentEvent.getRecurrenceInterval());
console.log("Recurrence Value:", nonRecurrentEvent.getRecurrenceValue());
