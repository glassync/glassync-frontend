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

  public async confirmAttendance(): Promise<void> {
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
        console.error("Ошибка api/event/action ", response.status);
        return;
      }

      const data = await response.json();

      if (data.message == "Invitation accepted" && data.status == 200) {
        this.attendanceConfirmed = true;
      } else {
        console.error(`${data.status}: ${data.message}`);
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
      return;
    }
  }

  public async cancelAttendance(): Promise<void> {
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
        return;
      }

      const data = await response.json();

      if (data.message == "Invitation declined" && data.status == 200) {
        this.attendanceConfirmed = false;
      } else {
        console.error(`${data.status}: ${data.message}`);
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
      return;
    }
  }
}
