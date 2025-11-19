import { RelationToAuthorizedUser } from "./Enum";

export class PersonFilter {
  private FIO?: string;
  private nickname?: string;
  private email?: string;
  private relation?: RelationToAuthorizedUser;

  constructor(
    FIO?: string,
    nickname?: string,
    email?: string,
    relation?: RelationToAuthorizedUser
  ) {
    this.FIO = FIO;
    this.nickname = nickname;
    this.email = email;
    this.relation = relation;
  }

  public getFIO(): string | undefined {
    return this.FIO;
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
