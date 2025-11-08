class Person {
  private UID: number;
  private name: string;
  private surname: string;
  private nickname: string;
  private email: string;

  constructor(
    UID: number,
    name: string,
    surname: string,
    nickname: string,
    email: string
  ) {
    this.UID = UID;
    this.name = name;
    this.surname = surname;
    this.nickname = nickname;
    this.email = email;
  }

  public get getUID(): number {
    return this.UID;
  }

  public get getName(): string {
    return this.name;
  }

  public get getSurname(): string {
    return this.surname;
  }

  public get getNickname(): string {
    return this.nickname;
  }

  public get getEmail(): string {
    return this.email;
  }
}
