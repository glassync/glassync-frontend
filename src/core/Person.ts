export class Person {
  private userUID: number;
  private firstName: string;
  private lastName: string;
  private nickname: string;
  private email: string;

  constructor(
    userUID: number,
    firstName: string,
    lastName: string,
    nickname: string,
    email: string
  ) {
    this.userUID = userUID;
    this.firstName = firstName;
    this.lastName = lastName;
    this.nickname = nickname;
    this.email = email;
  }

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
}
