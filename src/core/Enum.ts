export enum RecurrenceInterval {
  NONE = "none",
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  YEARLY = "yearly",
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
  NO_RELATION = "not_friends",
  SENT_FRIEND_REQUEST = "friend_request_sent",
  FRIEND_REQUEST_RECEIVED = "friend_request_received",
  PENDING_RESPONSE_TO_REQUEST = "PENDING_RESPONSE_TO_REQUEST",
  FRIEND = "friends",
  all = "all",
  userself = "self",
}
