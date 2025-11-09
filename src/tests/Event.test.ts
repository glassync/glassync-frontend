// import { RecurrenceInterval } from '../core/Enum';
// import { Event } from '../core/Event';
//
// describe('Event Class', () => {
//   const testDate = new Date('2024-05-20');
//   let event: Event;
//
//   beforeEach(() => {
//     event = new Event(
//       1,
//       'Тестовое событие',
//       'Описание события',
//       testDate,
//       '10:00',
//       '11:30',
//       RecurrenceInterval.WEEKLY,
//       2
//     );
//   });
//
//   // Тесты на инициализацию
//   describe('Initialization', () => {
//     it('Событие с повторением', () => {
//       expect(event.uid).toBe(1);
//       expect(event.title).toBe('Тестовое событие');
//       expect(event.description).toBe('Описание события');
//       expect(event.date).toEqual(testDate);
//       expect(event.startTime).toBe('10:00');
//       expect(event.endTime).toBe('11:30');
//       expect(event.recurrenceInterval).toBe(RecurrenceInterval.WEEKLY);
//       expect(event.recurrenceValue).toBe(2);
//     });
//
//     it('Событие без повторения', () => {
//       const defaultEvent = new Event(
//         2,
//         'Событие без повторения',
//         'Описание',
//         testDate,
//         '09:00',
//         '10:00'
//       );
//
//       expect(defaultEvent.recurrenceInterval).toBe(RecurrenceInterval.NONE);
//       expect(defaultEvent.recurrenceValue).toBe(0);
//     });
//   });
//
//   // Тесты на валидацию
//   describe('Validation', () => {
//     it('Неверный формат времени в первой половине', () => {
//       expect(() => {
//         event.startTime = '25:00';
//       }).toThrow('Неверный формат времени. Используйте "HH:mm"');
//
//       expect(() => {
//         event.startTime = '10:60';
//       }).toThrow('Неверный формат времени. Используйте "HH:mm"');
//     });
//
//     it('Неверный формат времени во второй половине', () => {
//       expect(() => {
//         event.endTime = '24:30';
//       }).toThrow('Неверный формат времени. Используйте "HH:mm"');
//     });
//
//     it('Отрицательное значение интервала', () => {
//       expect(() => {
//         event.recurrenceValue = -1;
//       }).toThrow('Значение интервала не может быть отрицательным');
//     });
//   });
//
//   // Тесты на сеттеры
//   describe('Setters', () => {
//     it('Установка UID', () => {
//       event.uid = 2;
//       expect(event.uid).toBe(2);
//     });
//
//     it('Установка названия', () => {
//       event.title = 'Новое название';
//       expect(event.title).toBe('Новое название');
//     });
//
//     it('Установка даты', () => {
//       const newDate = new Date('2024-05-21');
//       event.date = newDate;
//       expect(event.date).toEqual(newDate);
//     });
//
//     it('Установка интервала', () => {
//       event.recurrenceInterval = RecurrenceInterval.DAILY;
//       expect(event.recurrenceInterval).toBe(RecurrenceInterval.DAILY);
//     });
//   });
// });
