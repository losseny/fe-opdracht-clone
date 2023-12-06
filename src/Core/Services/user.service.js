import {User} from "../model/user.js";

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
        const users = [
            new User( 1, "Lewis Hamilton",   "123",  "Toto Wolff",       "Non Ambulant",                                 "employee"),
            new User( 2, "George Russel",    "234",  "Toto Wolff",       "Non ambulant reiskosten",                      "employee"),
            new User( 3, "Max Verstappen",   "345",  "Christian Horner", "Ambulant met leaseauto",                       "employee"),
            new User( 4, "Sergio Perez",     "456",  "Christian Horner", "Non Ambulant",                                 "employee"),
            new User( 5, "Charles Leclerc",  "567",  "Mattia Binotto",   "Non Ambulant",                                 "employee"),
            new User( 6, "Carlos Sainz",     "678",  "Mattia Binotto",   "Non Ambulant",                                 "employee"),
            new User( 7, "Lando Norris",     "789",  "Andreas Seidl",    "Non ambulant reiskosten",                      "employee"),
            new User( 8, "Daniel Ricciardo", "890",  "Andreas Seidl",    "Ambulant met leaseauto",                       "employee"),
            new User( 9, "Esteban Ocon",     "901",  "Otmar Szafnauer",  "Non Ambulant",                                 "employee"),
            new User(10, "Fernando Alonso",  "012",  "Otmar Szafnauer",  "Ambulant met mobiliteitsbudget vast",          "employee"),
            new User(11, "Valteri Bottas",   "1234", "Frederic Vasseur", "Non Ambulant",                                 "employee"),
            new User(12, "Guanyu Zhou",      "2345", "Frederic Vasseur", "Ambulant met mobiliteitsbudget vast variabel", "employee"),
            new User(13, "Toto Wolff",       "123",  "",                 "",                                             "manager"),
            new User(14, "Christian Horner", "456",  "",                 "Non Ambulant",                                 "manager"),
            new User(15, "Mattia Binotto",   "678",  "",                 "Non Ambulant",                                 "manager"),
            new User(16, "Andreas Seidl",    "890",  "",                 "Ambulant met leaseauto",                       "manager"),
            new User(17, "Otmar Szafnauer",  "012",  "",                 "Ambulant met mobiliteitsbudget vast",          "manager"),
            new User(18, "Frederic Vasseur", "2345", "",                 "Ambulant met mobiliteitsbudget vast variabel", "manager"),
        ];

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
