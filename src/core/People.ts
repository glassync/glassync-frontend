import { Profile } from "./Profile";
import { Person } from "./Person";

export class People {
  private static instance: People | null = null;
  //private people: Person[] = [];
  private profile: Profile;

  // TODO почему профиль?
  private constructor(profile: Profile) {
    this.profile = profile;
  }

  // public static getInstance(): People {
  //   if (!People.instance) {
  //     People.instance = new People();
  //   }
  //   return People.instance;
  // }

  public getPersonByUID(UID: number): Person | undefined {
    // TODO
    //return this.people.find(User => person.UID === UID);
    return undefined;
  }

  public static getPeopleByFilter(filter: PersonFilter): Person[] {
    // TODO
    return [];
  }
  //   return this.people.filter(person => {
  //     return (
  //       (!filter.name || person.name.includes(filter.name)) &&
  //       (!filter.surname || person.surname.includes(filter.surname)) &&
  //       (!filter.nickname || person.nickname.includes(filter.nickname)) &&
  //       (!filter.email || person.email.includes(filter.email))
  //     );
  //   });
  // }
}
