export class User {
    constructor(
        public id: string,
        public username: string,
        public email: string,
        public lastLogin: Date,
        private _token: string,
        private _tokenExpirationDate: number
    ) {}

    get token() {
        if (!this._tokenExpirationDate || new Date().getUTCSeconds() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }

    get tokenExpirationDate() {
        return this._tokenExpirationDate;
    }
}
