export class User{
        id: number = 0;
        name!: string;
        lastname!: string;
        email!: string;
        password!: string;


constructor(user: any) {
        this.id = user.id;
        this.name = user.name;
        this.lastname = user.lastname;
        this.email = user.email;
        this.password = user.password;
}

getFullName(): string {
        return `${this.name} ${this.lastname}`;
}

}