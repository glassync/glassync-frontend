import { Person } from "./Person";
import { Event } from "./Event";

class EventMember {
  private user: Person;
  private event: Event;
  private attendanceConfirmed = false;

  constructor(user: Person, event: Event) {
    this.user = user;
    this.event = event;
  }

  public async confirmAttendance(): Promise<string | undefined> {
    try {
      const response = await fetch(`api/event/action`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_id: this.event.getUID(),
          action: "accept_invite",
        }),
      });

      if (!response.ok) {
        console.error(`Ошибка api/event/action ${response.status}`);
        return `Ошибка api/event/action ${response.status}`;
      }

      const data = await response.json();

      if (data.message == "Invitation accepted" && data.status == 200) {
        this.attendanceConfirmed = true;
        return "Invitation accepted";
      } else {
        console.error(`${data.status}: ${data.message}`);
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
      return `Ошибка сети ${error}`;
    }
  }

  public async cancelAttendance(): Promise<string | undefined> {
    try {
      const response = await fetch(`api/event/action`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_id: this.event.getUID(),
          action: "decline_invite",
        }),
      });

      if (!response.ok) {
        console.error("Ошибка api/event/action ", response.status);
        return `Ошибка api/event/action ${response.status}`;
      }

      const data = await response.json();

      if (data.message == "Invitation declined" && data.status == 200) {
        this.attendanceConfirmed = false;
        return "Invitation declined";
      } else {
        console.error(`${data.status}: ${data.message}`);
        return `${data.status}: ${data.message}`;
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
      return `Ошибка сети ${error}`;
    }
  }
}
