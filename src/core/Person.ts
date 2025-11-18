export class Person {
  public constructor(
    private userUID: number = 0,
    private firstName: string = "",
    private lastName: string = "",
    private nickname: string = "",
    private email: string = ""
  ) {}

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

  // friend_request_sent - запрос отправлен
  // friend_request_alredy_sent - запрос уже отправлен
  // user_not_found - пользователя не существует
  // not_friends - разрыв связи друзей
  // decline_friendship - отклонить заявку
  // accept_friendship - принять заявку
  public doFriendAction(action: string, user_id: number): string | undefined {
    return "";
  }
}
