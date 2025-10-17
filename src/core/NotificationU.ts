class NotificationU {
  timestamp: Date;
  type: NotificationType;
  event?: EventU;
  sender?: Person;

  constructor(
    timestamp: Date,
    type: NotificationType,
    event?: EventU,
    sender?: Person
  ) {
    this.timestamp = timestamp;
    this.type = type;
    this.event = event;
    this.sender = sender;
  }
}
