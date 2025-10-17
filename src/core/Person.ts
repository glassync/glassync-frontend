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

    getUserUID(): number {
        return this.userUID;
    }

    getFirstName(): string {
        return this.firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    getNickname(): string {
        return this.nickname;
    }

    getEmail(): string {
        return this.email;
    }

    setUserUID(uid: number): void {
        this.userUID = uid;
    }

    setFirstName(firstName: string): void {
        this.firstName = firstName;
    }

    setLastName(lastName: string): void {
        this.lastName = lastName;
    }

    setNickname(nickname: string): void {
        this.nickname = nickname;
    }

    setEmail(email: string): void {
        // TODO Возможно необходимо какая-то валидация данных
        if (email.includes('@')) {
            this.email = email;
        } else {
            throw new Error('Invalid email format');
        }
    }
}