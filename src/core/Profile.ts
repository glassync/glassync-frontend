import { NotificationPlatform } from "./NotificationPlatform";
import { Person } from "./Person";

export class Profile {
  private static instance: Profile;
  private isAuthorized = false;
  private authorizedUser: Person | null = null;
  private notifications: Notification[] = [];
  private notificationPlatforms: NotificationPlatform[] = [];

  // TODO решить проблему с конструктором синглтон
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): Profile {
    if (!Profile.instance) {
      Profile.instance = new Profile();
    }
    return Profile.instance;
  }
  // private constructor(
  //   isAuthorized: boolean | false,
  //   authorizedUser: Person | null,
  //   notifications: Notification[],
  //   notificationPlatforms: NotificationPlatform[]
  // ) {
  //   this.isAuthorized = isAuthorized;
  //   this.authorizedUser = authorizedUser;
  //   this.notifications = notifications;
  //   this.notificationPlatforms = notificationPlatforms;
  // }
  //
  // public static getInstance(): Profile {
  //   if (!Profile.instance) {
  //     Profile.instance = new Profile(
  //       this.isAuthorized,
  //       this.authorizedUser,
  //       this.notifications,
  //       this.notificationPlatforms
  //     );
  //   }
  //   return Profile.instance;
  // }

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

  public getNotificationPlatform(
    UID: number
  ): NotificationPlatform | undefined {
    return this.notificationPlatforms.find(
      (platform) => platform.getPlatformUID() === UID
    );
  }
}
