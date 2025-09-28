import { NotificationPlatform } from "./NotificationPlatform";
import { Person } from "./Person";
import { People } from "./People";
import { PersonFilter } from "./PersonFilter";
import { Event } from "@/core/Event";
import { RelationToAuthorizedUser } from "@/core/Enum";

export class Profile {
  private isAuthorized = false;
  private authorizedUser: Person | null = null;
  private notifications: Notification[] = [];
  private notificationPlatforms: NotificationPlatform[] = [];

  // region Singleton

  private static instance: Profile;

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

  // endregion

  // region Конструкторы

  private constructor() {
    // Инициализация если нужно будет
  }

  // endregion

  // region Геттеры

  public getAuthorizedUser(): Person | null {
    return this.authorizedUser;
  }

  public getNotifications(): Notification[] {
    return this.notifications;
  }

  public getNotificationPlatforms(): NotificationPlatform[] {
    return this.notificationPlatforms;
  }

  public async loadNotificationPlatforms(): Promise<void> {
    try {
      const response = await fetch("api/notification/platform/get/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok || !data?.notification_settings) {
        console.error("Ошибка при получении настроек уведомлений");
        return;
      }

      // Очистим и обновим
      this.notificationPlatforms = [];

      for (const item of data.notification_settings) {
        const platform = new NotificationPlatform(
          item.id,
          item.id_notification_platform === 1 ? "Телеграм" : "Вк",
          item.active,
          item.id_notification_platform,
          this
        );
        this.notificationPlatforms.push(platform);
      }
    } catch (error) {
      console.error("Ошибка загрузки настроек уведомлений:", error);
    }
  }

  // endregion

  // region Сеттеры

  // ToDo: что за антипаттерны, методы для тестов. Предлагаю такое удалить)
  // для теста
  public setPerson(person: Person): void {
    this.authorizedUser = person;
    this.isAuthorized = false;
  }

  // endregion

  // region Авторизация

  public async login(login: string, password: string): Promise<boolean> {
    try {
      const response = await fetch(`api/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: login,
          password: password,
        }),
      });

      const currentUserFilter = new PersonFilter(
        undefined,
        undefined,
        login,
        RelationToAuthorizedUser.userself
      );
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
      const response = await fetch(`api/auth/signup/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: person.getFirstName(),
          last_name: person.getLastName(),
          nickname: person.getNickname(),
          email: person.getEmail(),
          password: password,
        }),
      });

      const loggedIn = await this.login(person.getEmail(), password);
      return loggedIn ? true : false;
    } catch (error) {
      localStorage.removeItem("userID");
      this.isAuthorized = false;
      this.authorizedUser = null;
      console.error("Ошибка сети:", error);
      return false;
    }
  }

  public async logout(): Promise<void> {
    try {
      const response = await fetch(`api/auth/logout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      this.isAuthorized = false;
      localStorage.removeItem("userID");
      this.authorizedUser = null;
    } catch (error) {
      console.error("Ошибка при выходе:", error);
      this.isAuthorized = false;
      this.authorizedUser = null;
      localStorage.removeItem("userID");

      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  }

  private async handleAuthResponse(
    response: Response,
    person: Person
  ): Promise<boolean> {
    if (response.ok) {
      localStorage.setItem("userID", person.getUserUID().toString());
      this.isAuthorized = true;
      this.authorizedUser = person;
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

  // endregion

  // region Редактирование профиля

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

      const response = await fetch(`api/user/update/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: newFirstName,
          last_name: newLastName,
          nickname: newNickname,
          email: newEmail,
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

  // endregion
  public async createEvent(event: Event): Promise<boolean> {
    // TODO добавить notifications

    const d = event.getDate();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); // месяцы с 0
    const day = String(d.getDate()).padStart(2, "0");

    const formatted = `${year}-${month}-${day}`;
    const eventMembers = event.getMembers();
    const memberIds = Array.from(eventMembers.keys());

    try {
      const response = await fetch(`api/event/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: event.getTitle(),
          description: event.getDescription(),
          date: formatted,
          time_start: event.getStartTime(),
          time_end: event.getEndTime(),
          recurrence_rule_type: event.getRecurrenceInterval(),
          recurrence_rule_interval: event.getRecurrenceValue(),
          notifications: memberIds,
        }),
      });

      const data = await response.json();
      event.setUID(data.event_id);
      return true;
      // TODO возможно нужно будет пушить в массив ивентов (скорее всего нет так как есть API)
    } catch (error) {
      console.error("Ошибка создания события: ", error);
      return false;
    }
  }

  public async updateEvent(event: Event): Promise<boolean> {
    // TODO добавить notifications
    const d = event.getDate();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); // месяцы с 0
    const day = String(d.getDate()).padStart(2, "0");

    const formatted = `${year}-${month}-${day}`;
    const eventMembers = event.getMembers();
    const memberIds = Array.from(eventMembers.keys());

    try {
      const response = await fetch(`api/event/update/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_id: event.getUID(),
          name: event.getTitle(),
          description: event.getDescription(),
          date: formatted,
          time_start: event.getStartTime(),
          time_end: event.getEndTime(),
          recurrence_rule_type: event.getRecurrenceInterval(),
          recurrence_rule_interval: event.getRecurrenceValue(),
          notifications: memberIds,
        }),
      });
      return true;
      // TODO возможно нужно будет пушить в массив ивентов (скорее всего нет так как есть API)
    } catch (error) {
      console.error("Ошибка обновления события: ", error);
      return false;
    }
  }

  public async removeEvent(event: Event): Promise<boolean> {
    try {
      const response = await fetch(`api/event/delete/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_id: event.getUID(),
        }),
      });
      return true;
    } catch (error) {
      console.error("Ошибка удаления события: ", error);
      return false;
    }
  }

  public async quitEvent(event: Event): Promise<boolean> {
    try {
      const response = await fetch(`api/event/action/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_id: event.getUID(),
          action: "quit",
        }),
      });
      return true;
    } catch (error) {
      console.error("Ошибка выхода из события: ", error);
      return false;
    }
  }
}
