class PlatformNotification {
  private UID: number;
  private name: string;
  private active: boolean;
  private identifier: string;
  private profile: Profile;

  constructor(
    UID: number,
    name: string,
    active: boolean,
    identifier: string,
    profile: Profile
  ) {
    this.UID = UID;
    this.name = name;
    this.active = active;
    this.identifier = identifier;
    this.profile = profile;
  }

  public activate(): void {
    // TODO
    // На диаграмме нет, но как будто бы нужно добавить
    // this.active = true;
  }

  public deactivate(): void {
    // TODO
    // На диаграмме нет, но как будто бы нужно добавить
    // this.active = false;
  }
}
