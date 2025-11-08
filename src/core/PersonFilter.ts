class PersonFilter {
  private name?: string;
  private surname?: string;
  private nickname?: string;
  private email?: string;
  private relation?: RelationToAuthorizedUser;

  constructor(
    name?: string,
    surname?: string,
    nickname?: string,
    email?: string,
    relation?: RelationToAuthorizedUser
  ) {
    this.name = name;
    this.surname = surname;
    this.nickname = nickname;
    this.email = email;
    this.relation = relation;
  }

  public getName(): string | undefined {
    return this.name;
  }

  public getSurname(): string | undefined {
    return this.surname;
  }

  public getNickname(): string | undefined {
    return this.nickname;
  }

  public getEmail(): string | undefined {
    return this.email;
  }

  public getRelation(): RelationToAuthorizedUser | undefined {
    return this.relation;
  }
}
