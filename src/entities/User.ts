/**
 * The user class with describes main properties
 * of system registered user.
 */
class User {
    constructor(
        public id: number,
        public login: string,
        public password: string,
        public age: number,
        public isDeleted: boolean = false,
    ) {}
}

export default User;
