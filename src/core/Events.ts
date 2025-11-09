import { Profile } from "./Profile";
import { Person } from "./Person";
import { Event } from "./Event";

class Events {
  private static instance: Events | null = null;
  //private events: EventU[] = [];
  private profile: Profile;

  // TODO почему профиль?
  private constructor(profile: Profile) {
    this.profile = profile;
  }

  // public static getInstance(): Events {
  //   if (!Events.instance) {
  //     Events.instance = new Events();
  //   }
  //   return Events.instance;
  // }

  public getEvent(UID: number): Event | undefined {
    // TODO
    //return this.events.find(event => event.getUID() === UID);
    return undefined;
  }

  public getUserEvents(user: Person, startTime: Date, endTime: Date): Event[] {
    // TODO
    //return this.events.filter(event => event.getStartTime() >= startTime && event.getEndTime() <= endTime);
    return [];
  }

  public getEvents(startTime: Date, endTime: Date): Event[] {
    // TODO
    //return this.events.filter(event => event.getStartTime() >= startTime && event.getEndTime() <= endTime);
    return [];
  }

  private requestEvents(startTime: Date, endTime: Date): Event[] {
    // TODO
    return [];
  }

  // private requestEvent(UID: number): EventU {
  // TODO
  //   return ;
  // }
}
