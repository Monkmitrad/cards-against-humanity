export class User {
    constructor(
        public id: string,
        public username: string,
        public email: string,
        public lastLogin: Date,
        public token: string,
        public tokenExpirationDate: number
    ) {}
}
