export enum RecurrenceInterval {
  NONE = "NONE",
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
}

export enum NotificationType {
  FRIEND_INVITE = "FRIEND_INVITE",
  EVENT_INVITE = "EVENT_INVITE",
}

export enum UserRelationship {
  FRIEND = "FRIEND",
  COLLEAGUE = "COLLEAGUE ",
  FAMILY = "FAMILY",
  SUBORDINATE = "SUBORDINATE",
  DIRECTOR = "DIRECTOR",
  OTHER = "OTHER",
  BLOCKED = "BLOCKED",
}

export enum RelationToAuthorizedUser {
  NO_RELATION = "NO_RELATION",
  SENT_FRIEND_REQUEST = "SENT_FRIEND_REQUEST",
  PENDING_RESPONSE_TO_REQUEST = "PENDING_RESPONSE_TO_REQUEST",
  FRIEND = "FRIEND",
  all = "all",
  userself = "self",
}
