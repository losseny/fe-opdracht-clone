export default class UserService {

    constructor() {
        const currentUserJson = localStorage.getItem("users");
        if (currentUserJson) {
            this._currentUser = JSON.parse(currentUserJson);
        } else {
            this._currentUser = null;
        }

        const usersJson = localStorage.getItem("users");
        if (usersJson) {
            this.users = JSON.parse(usersJson);
        } else {
            this.users = this._seedUsers();
        }
    }

    _seedUsers() {
        const users = [];

        localStorage.setItem("users", JSON.stringify(users));

        return users;
    }

    login(username, password) {
        return new Promise((resolve) => {

            const user = this.users.find(user => user.name === username);
            let userDetail = false;
            if (user && user.password === password) {
                this.currentUser = user;
                userDetail = true;
            } else {
                this.currentUser = null;
            }

            resolve(userDetail)
        })
    }

    getCurrentUserRole() {
        return new Promise((resolve) => {
            this.foundUser()
            resolve(this._currentUser.role)
        })
    }



    get currentUser() {
        const currentUserJson = localStorage.getItem("currentUser");
        if (currentUserJson) {
            this._currentUser = JSON.parse(currentUserJson);
        }
        return this._currentUser;
    }

    get currentLoggedInUser() {
        return new Promise((resolve) => {
            this.foundUser()
            resolve(this._currentUser)
        })
    }
    foundUser() {
        const currentUserJson = localStorage.getItem("currentUser");
        if (currentUserJson) {
            this._currentUser = JSON.parse(currentUserJson);
        }
    }

    set currentUser(user) {
        this._currentUser = user;
        localStorage.setItem("currentUser", JSON.stringify(user));
    }
}

export const userService = new UserService();
