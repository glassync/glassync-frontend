"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationToAuthorizedUser =
  exports.UserRelationship =
  exports.NotificationType =
  exports.RecurrenceInterval =
    void 0;
var RecurrenceInterval;
(function (RecurrenceInterval) {
  RecurrenceInterval["NONE"] = "NONE";
  RecurrenceInterval["DAILY"] = "DAILY";
  RecurrenceInterval["WEEKLY"] = "WEEKLY";
  RecurrenceInterval["MONTHLY"] = "MONTHLY";
  RecurrenceInterval["YEARLY"] = "YEARLY";
})(
  RecurrenceInterval || (exports.RecurrenceInterval = RecurrenceInterval = {})
);
var NotificationType;
(function (NotificationType) {
  NotificationType["FRIEND_INVITE"] = "FRIEND_INVITE";
  NotificationType["EVENT_INVITE"] = "EVENT_INVITE";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
var UserRelationship;
(function (UserRelationship) {
  UserRelationship["FRIEND"] = "FRIEND";
  UserRelationship["COLLEAGUE"] = "COLLEAGUE ";
  UserRelationship["FAMILY"] = "FAMILY";
  UserRelationship["SUBORDINATE"] = "SUBORDINATE";
  UserRelationship["DIRECTOR"] = "DIRECTOR";
  UserRelationship["OTHER"] = "OTHER";
  UserRelationship["BLOCKED"] = "BLOCKED";
})(UserRelationship || (exports.UserRelationship = UserRelationship = {}));
var RelationToAuthorizedUser;
(function (RelationToAuthorizedUser) {
  RelationToAuthorizedUser["NO_RELATION"] = "NO_RELATION";
  RelationToAuthorizedUser["SENT_FRIEND_REQUEST"] = "SENT_FRIEND_REQUEST";
  RelationToAuthorizedUser["PENDING_RESPONSE_TO_REQUEST"] =
    "PENDING_RESPONSE_TO_REQUEST";
  RelationToAuthorizedUser["FRIEND"] = "FRIEND";
})(
  RelationToAuthorizedUser ||
    (exports.RelationToAuthorizedUser = RelationToAuthorizedUser = {})
);
