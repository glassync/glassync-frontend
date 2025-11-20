import { NotificationPlatform } from "./NotificationPlatform";
import { Person } from "./Person";
import { People } from "./People";
import { PersonFilter } from "./PersonFilter";

export class Profile {
  private static instance: Profile;
  private isAuthorized = false;
  private authorizedUser: Person | null = null;
  private notifications: Notification[] = [];
  private notificationPlatforms: NotificationPlatform[] = [];

  private constructor() {
    // Инициализация если нужно будет
  }

  public static getInstance(): Profile {
    if (!Profile.instance) {
      Profile.instance = new Profile();
      Profile.instance.isAuthorized = false;
      Profile.instance.authorizedUser = null;
      Profile.instance.notifications = [];
      Profile.instance.notificationPlatforms = [];
    }
    return Profile.instance;
  }

  // для теста
  public setPerson(person: Person): void {
    this.authorizedUser = person;
    this.isAuthorized = true;
  }

  public async login(login: string, password: string): Promise<boolean> {
    try {
      const response = await fetch(`api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: login,
          password: password,
        }),
      });

      const currentUserFilter = new PersonFilter(undefined, undefined, login);
      const currentPerson = await People.getPeopleByFilter(currentUserFilter);
      return await this.handleAuthResponse(response, currentPerson[0]);
    } catch (error) {
      this.isAuthorized = false;
      console.error("Ошибка сети:", error);
      return false;
    }
  }

  public async register(person: Person, password: string): Promise<boolean> {
    try {
      const response = await fetch(`api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: person.getFirstName(),
          lastname: person.getLastName(),
          email: person.getEmail(),
          password: password,
        }),
      });

      return await this.handleAuthResponse(response, person);
    } catch (error) {
      this.isAuthorized = false;
      this.authorizedUser = null;
      console.error("Ошибка сети:", error);
      return false;
    }
  }

  public async logout(): Promise<void> {
    try {
      // TODO нужно ли апи вовсе?
      const response = await fetch(`api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      this.isAuthorized = false;
      this.authorizedUser = null;

      window.location.href = "/login";
    } catch (error) {
      console.error("Ошибка при выходе:", error);
      this.isAuthorized = false;
      this.authorizedUser = null;

      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  }

  public async updateProfile(person: Person): Promise<boolean> {
    if (!this.isAuthorized) return false;

    const newFirstName = person.getFirstName();
    const newLastName = person.getLastName();
    const newNickname = person.getNickname();
    const newEmail = person.getEmail();

    if (!newFirstName && !newLastName && !newNickname && !newEmail) {
      console.error("Не указано ни одного поля для обновления");
      return false;
    }

    try {
      const uid = this.authorizedUser?.getUserUID();
      if (!uid) return false;

      const response = await fetch(`api/user/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: newFirstName,
          lastName: newLastName,
          nickname: newNickname,
          email: newEmail,
          // password: person.password,
        }),
      });

      if (response.ok) {
        if (newFirstName != undefined)
          this.authorizedUser?.setFirstName(newFirstName);
        if (newLastName != undefined)
          this.authorizedUser?.setFirstName(newFirstName);
        if (newNickname != undefined)
          this.authorizedUser?.setNickname(newNickname);
        if (newEmail != undefined) this.authorizedUser?.setEmail(newEmail);

        return true;
      } else {
        console.error("Ошибка обновления профиля:", response.status);
        return false;
      }
    } catch (error) {
      console.error("Ошибка сети при обновлении профиля:", error);
      return false;
    }
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

  // Вспомогательные методы

  private async handleAuthResponse(
    response: Response,
    person: Person
  ): Promise<boolean> {
    if (response.ok) {
      this.isAuthorized = true;
      this.authorizedUser = person;
      window.location.href = "/";
      return true;
    }

    this.isAuthorized = false;
    this.authorizedUser = null;

    if (response.status === 400) {
      console.error("Ошибка авторизации: неверные данные");
      return false;
    }

    console.error("Ошибка сервера:", response.status);
    return false;
  }
}
