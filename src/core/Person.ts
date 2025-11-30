export class Person {
  // region Конструкторы

  public constructor(
    private userUID: number = 0,
    private firstName: string = "",
    private lastName: string = "",
    private nickname: string = "",
    private email: string = ""
  ) {}

  // endregion

  // region Геттеры

  public getUserUID(): number {
    return this.userUID;
  }

  public getFirstName(): string {
    return this.firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public getNickname(): string {
    return this.nickname;
  }

  public getEmail(): string {
    return this.email;
  }

  // endregion

  // region Сеттеры

  public setUserUID(uid: number): void {
    this.userUID = uid;
  }

  public setFirstName(firstName: string): void {
    this.firstName = firstName;
  }

  public setLastName(lastName: string): void {
    this.lastName = lastName;
  }

  public setNickname(nickname: string): void {
    this.nickname = nickname;
  }

  public setEmail(email: string): void {
    // TODO Возможно необходимо какая-то валидация данных
    if (email.includes("@")) {
      this.email = email;
    } else {
      throw new Error("Invalid email format");
    }
  }

  // endregion

  /* ToDo {
       Если этот метод отвечает за заявку в друзья он должен быть реализован в классе профиль.
       Но если сложно то забейте)
   }*/
  // friend_request_sent - запрос отправлен
  // friend_request_alredy_sent - запрос уже отправлен
  // user_not_found - пользователя не существует
  // not_friends - разрыв связи друзей
  // decline_friendship - отклонить заявку
  // accept_friendship - принять заявку
  public async doFriendAction(
    action: string,
    user_id: number
  ): Promise<string | undefined> {
    try {
      const response = await fetch(`api/user/action/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: action,
          user_id: user_id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Ошибка API user/action", response.status);
        return undefined;
      }

      const userId = Object.keys(data.users)[0];
      const userData = data.users[userId];

      return userData.relationship_status;
    } catch (error) {
      console.error("Ошибка сети:", error);
      return undefined;
    }
    return undefined;
  }
}
