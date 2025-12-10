import { Profile } from "@/core/Profile";

export class NotificationPlatform {
  private platformUID: number;
  private platformName: string;
  private isActive: boolean;
  private identifier: string;
  private profile: Profile;

  // region Конструкторы

  constructor(
    platformUID: number,
    platformName: string,
    isActive: boolean,
    identifier: string,
    profile: Profile
  ) {
    this.platformUID = platformUID;
    this.platformName = platformName;
    this.isActive = isActive;
    this.identifier = identifier;
    this.profile = profile;
  }

  // endregion

  // region Геттеры

  public getProfile(): Profile {
    return this.profile;
  }

  public getPlatformUID(): number {
    return this.platformUID;
  }

  public getPlatformName(): string {
    return this.platformName;
  }

  public getIsActive(): boolean {
    return this.isActive;
  }

  public getIdentifier(): string {
    return this.identifier;
  }

  // endregion

  // region Сеттер

  public setProfile(newProfile: Profile): void {
    this.profile = newProfile;
  }

  public setPlatformUID(uid: number): void {
    this.platformUID = uid;
  }

  public setPlatformName(name: string): void {
    this.platformName = name;
  }

  public setIsActive(active: boolean): void {
    this.isActive = active;
  }

  public setIdentifier(id: string): void {
    this.identifier = id;
  }

  // endregion

  // ToDo: сделайте просто setActive
  public activate(): void {
    // TODO
    // На диаграмме нет, но как будто бы нужно добавить
    // this.active = true;
  }

  public deactivate(): void {
    // TODO
    // На диаграмме нет, но как будто бы нужно добавить
    // this.active = false;
  }
}
