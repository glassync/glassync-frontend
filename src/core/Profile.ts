class Profile {
  private static instance: Profile | null = null;
  private authorized = false;
  private user: Person | null = null;
  private notifications?: NotificationU[];
  private notificationPlatforms?: PlatformNotification[];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): Profile {
    if (!Profile.instance) {
      Profile.instance = new Profile();
    }
    return Profile.instance;
  }

  public authorize(login: string, password: string): boolean {
    // TODO
    // if (login === 'test' && password === 'password') {
    //   this.authorized = true;
    //   this.user = new User(1, 'Ivan', 'Petrov', 'ivan_p', 'ivan@example.com');
    //   return true;
    // }
    return false;
  }

  public register(person: Person, password: string): boolean {
    // TODO
    return false;
  }

  public logout(): void {
    // TODO
  }

  public changeProfileData(params: Person): boolean {
    // TODO
    return true;
  }

  public changePassword(currentPassword: string, newPassword: string): boolean {
    // TODO
    return false;
  }

  public getAuthorizedUser(): Person | null {
    // TODO
    // if (!this.authorized) {
    //   throw new Error('User not authorized');
    // }
    return this.user;
  }

  public getNotifications(): NotificationU[] {
    // TODO
    return [];
  }

  public getNotificationPlatforms(): PlatformNotification[] {
    // TODO
    return [];
  }

  // public getNotificationPlatform(UID: number): PlatformNotification {
  //   // TODO
  //   return new PlatformNotification(`Platform ${UID}`);
  // }

  public addNotification(notification: NotificationU): void {
    // TODO
    // На диаграмме нет, но как будто бы нужно добавить
  }

  public addNotificationPlatform(
    platformNotification: PlatformNotification
  ): void {
    // TODO
    // На диаграмме нет, но как будто бы нужно добавить
  }
}
