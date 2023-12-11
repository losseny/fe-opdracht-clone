import {DatabaseService} from "../Infrastructure/Persistence/database.service.js";
import {UserModel} from "../Models/user.model.js";
import {BehaviorSubject} from "rxjs";

const USERS_KEY = 'users';
const WHO_AM_I_KEY = 'who_am_i';

class UserService {

    database = new DatabaseService();
    users = null;
    currentUser = null;
    constructor() {
        if (!this.users) {
            this.database.fetch(USERS_KEY).then(users => {
                this.users = users ?? this._seedUsers()
            })
        }


        if (!this.currentUser) {
            this.database.fetch(WHO_AM_I_KEY).then(user => {
                if (user) {
                    this.currentUser = user
                } else {
                    this.currentUser = null;
                }
            })
        }

        this.whoAmISubject = new BehaviorSubject(false)
        this.initialize()
    }


    // TODO research why a new instance of service get created.
    //  can be fatal later on because the use of rxjs gets limited
    initialize() {
        this.userLoggedIn().then(result => this.whoAmISubject.next(result))
    }

    _seedUsers() {
        let users = [
            new UserModel("Lewis Hamilton",   "Geheim123!" ),
        ];

        this.database.save(USERS_KEY, users)
            .then(result => users = result)

        return users;
    }

    login(username, password) {
        return new Promise((resolve) => {
            const user = this.users.find(user => user.name === username);
            let loggedIn = false;
            if (user && user.password === password) {
                this.whoAmISubject.next(true)
                loggedIn = true

                this.database.save(WHO_AM_I_KEY, user)
                    .then(result => {
                        this.currentUser = result
                    })
            } else {
                this.currentUser = null;
            }
            resolve(loggedIn)
        })
    }

    logOut() {
        this.database
            .delete(WHO_AM_I_KEY)
        this.currentUser = null
        this.whoAmISubject.next(false)
    }

    userLoggedIn() {
        return new Promise((resolve) => {
            let loggedIn = false
            this.database.fetch(WHO_AM_I_KEY).then(result => {
                if (result) {
                    loggedIn = true
                }
                resolve(loggedIn)
            })
        })
    }


    get currentLoggedInUser() {
        return new Promise((resolve) => {
            resolve(this.currentUser)
        })
    }
}


export const userServiceInstance = new UserService();

