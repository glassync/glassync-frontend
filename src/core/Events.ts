import { Profile } from "./Profile";
import { Person } from "./Person";
import { Event } from "./Event";

export class Events {
  private static instance: Events | null = null;
  //private events: EventU[] = [];
  // private profile: Profile;

  public static getInstance(): Events {
    if (!Events.instance) {
      Events.instance = new Events();
    }
    return Events.instance;
  }

  private constructor() {
    // Инициализация если нужно будет
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
