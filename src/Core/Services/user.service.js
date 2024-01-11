import {DatabaseService} from "../Infrastructure/Persistence/database.service.js";
import {User} from "../Models/user.model.js";
import {BehaviorSubject} from "rxjs";
import {DataBaseKeys} from "../Infrastructure/Util/app-key.env.js";
import {EmissionService} from "./emission.service.js";

class UserService {

    database = new DatabaseService();
    users = null;
    currentUser = null;
    constructor() {
        if (!this.users) {
            this.fetchUsers().then(users => {
                this.users = users ?? this._seedUsers()
            })
        }


        if (!this.currentUser) {
            this.database.fetch(DataBaseKeys.WHO_AM_I_KEY).then(user => {
                if (user) {
                    this.currentUser = user
                } else {
                    this.currentUser = null;
                }
            })
        }

        this.whoAmISubject = new BehaviorSubject(false)
        this.emissionService = new EmissionService(this)
        this.initialize()
    }


    // TODO research why a new instance of service get created.
    //  can be fatal later on because the use of rxjs gets limited
    initialize() {
        this.userLoggedIn()
            .then(result => this.whoAmISubject.next(result))
    }

    _seedUsers() {
        let users = [
            new User("Lewis Hamilton",   "Geheim123!" ),
            new User("test1",   "admin" ),
            new User("test2",   "admin" ),
            new User("test3",   "admin" ),
        ];

        this.saveUsers(users).then(result => users = result)

        return users;
    }

    saveUsers(users) {
        return this.database.save(DataBaseKeys.USERS_KEY, users)
    }

    login(username, password) {
        return new Promise((resolve) => {
            const user = this.users.find(user => user.name === username);
            let loggedIn = false;
            if (user && user.password === password) {
                loggedIn = true
                this.#updateCurrentUserData(user)
            } else {
                this.currentUser = null;
            }
            resolve(loggedIn)
        })
    }

    logOut() {
        this.database.delete(DataBaseKeys.WHO_AM_I_KEY).then(_ => {
            this.currentUser = null
            this.whoAmISubject.next(false)
        })
    }

    userLoggedIn() {
        return new Promise((resolve) => {
            let loggedIn = false
            this.database.fetch(DataBaseKeys.WHO_AM_I_KEY).then(result => {
                if (result) {
                    loggedIn = true
                }
                resolve(loggedIn)
            })
        })
    }

    #updateCurrentUserData(user) {
        this.database.save(DataBaseKeys.WHO_AM_I_KEY, user)
            .then(result => {
                this.whoAmISubject.next(true)
                this.currentUser = result
            })
    }
    registerNewJourneys(journey) {
        return this.currentLoggedInUser().then(r => {
            return this.emissionService.calculateEmission(journey).then(e => {
                journey['emission'] = e;
                const oldLength = r.journeys.length;
                const newLength = r.journeys.push(journey);
                return {
                    user: r,
                    actionResult: oldLength < newLength
                };
            })
        }).then(r => {
            this.#updateUserInfo(r)
            return r.actionResult;
        })
    }

    registerNewCronJourney(journey) {
        return this.currentLoggedInUser().then(r => {
            delete journey["date"]
            const set = new Set([...r.cronJourneys.map(t => JSON.stringify(t)), JSON.stringify(journey)])
            r.cronJourneys = [...set.values()].map(e => JSON.parse(e));
            return {
                user: r,
                actionResult: true
            };

        }).then(r => {
            this.#updateUserInfo(r)
            return r.actionResult;
        })
    }

    registerNewRoute(route) {
        return this.currentLoggedInUser().then(r => {
            const oldLength = r.routes.length;
            const newLength = r.routes.push(route);
            return {
                user: r,
                actionResult: oldLength < newLength
            };
        }).then(r => {
            this.#updateUserInfo(r)
            return r.actionResult;
        })
    }
    #updateUserInfo(userInfo) {
        if (userInfo.actionResult) {
            this.fetchUsers().then(users => {
                users = [...users.filter(user => user.id !== userInfo.user.id), userInfo.user]
                this.saveUsers(users).then(_ => {
                    this.#updateCurrentUserData(userInfo.user)
                })
            })
        }
    }

    fetchUsers() {
        return this.database.fetch(DataBaseKeys.USERS_KEY)
    }


    currentLoggedInUser() {
        return new Promise((resolve) => {
            resolve(this.currentUser)
        })
    }
}


export const userServiceInstance = new UserService();

