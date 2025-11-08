export class NotificationPlatform {
    private platformUID: number;
    private platformName: string;
    private isActive: boolean;
    private identifier: string;

    constructor(
        platformUID: number,
        platformName: string,
        isActive: boolean,
        identifier: string
    ) {
        this.platformUID = platformUID;
        this.platformName = platformName;
        this.isActive = isActive;
        this.identifier = identifier;
    }

    getPlatformUID(): number {
        return this.platformUID;
    }

    getPlatformName(): string {
        return this.platformName;
    }

    getIsActive(): boolean {
        return this.isActive;
    }

    getIdentifier(): string {
        return this.identifier;
    }

    setPlatformUID(uid: number): void {
        this.platformUID = uid;
    }

    setPlatformName(name: string): void {
        this.platformName = name;
    }

    setIsActive(active: boolean): void {
        this.isActive = active;
    }

    setIdentifier(id: string): void {
        this.identifier = id;
    }
}
