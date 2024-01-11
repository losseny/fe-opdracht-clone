import {Base} from "./base.model.js";

/**
 * Class representing a user model.
 */
export class User extends Base {
    name;
    password;
    journeys = []
    routes = []
    cronJourneys = []

    /**
     * Create a UserModel.
     * @param {string} name - The name of the user.
     * @param {string} password - The user's password.
     */
    constructor(name, password) {
        super();
        this.name = name;
        this.password = password;
    }

    static address(routes) {
        let index = 0;
        if (!routes) {
            return
        }
        if (routes.length > 1) {
            index = routes.length - 1;
        }

        return {
            departure: `${routes[0].locations[0].streetName} ${routes[0].locations[0].houseNumber}`,
            destination: `${routes[index].locations[1].streetName} ${routes[index].locations[1].houseNumber}`,
        }
    }
}
