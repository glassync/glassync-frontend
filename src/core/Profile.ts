import { NotificationPlatform } from './NotificationPlatform';
import {Person} from './Person';

export class Profile {
    private static instance: Profile;
    private isAuthorized: boolean = false;
    private authorizedUser: Person | null = null;
    private notifications: Notification[] = [];
    private notificationPlatforms: NotificationPlatform[] = [];

    private constructor() {}

    public static getInstance(): Profile {
        if (!Profile.instance) {
            Profile.instance = new Profile();
        }
        return Profile.instance;
    }

    public login(login: string, password: string): boolean {
        // Логика авторизации
        this.isAuthorized = true; // Флаг авторизации
        return this.isAuthorized;
    }

    public register(person: Person, password: string): boolean {
        // Логика регистрации
        return true; // Флаг регистрации true/false
    }

    public logout(): void {
        this.isAuthorized = false;
        this.authorizedUser = null;
    }

    public updateProfile(person: Person): boolean {
        if (!this.isAuthorized) return false;
        // Логика обновления данных
        return true;
    }

    public changePassword(currentPassword: string, newPassword: string): boolean {
        if (!this.isAuthorized) return false;
        // Логика изменения пароля
        return true;
    }

    public getAuthorizedUser(): Person | null {
        return this.authorizedUser;
    }

    public getNotifications(): Notification[] {
        return this.notifications;
    }

    public getNotificationPlatforms(): NotificationPlatform[] {
        return this.notificationPlatforms;
    }

    public getNotificationPlatform(UID: number): NotificationPlatform | undefined {
        return this.notificationPlatforms.find(platform => platform.getPlatformUID() === UID);
    }
}class Profile {
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
