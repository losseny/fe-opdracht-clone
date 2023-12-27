

/**
 * Class representing a user model.
 */
export class UserModel {
    id; // Private field, not accessible outside the class
    name;
    password;
    journeys = []
    routes = []
    cronJourneys = []
    static currentId = 0;

    /**
     * Create a UserModel.
     * @param {string} name - The name of the user.
     * @param {string} password - The user's password.
     */
    constructor(name, password) {
        this.name = name;
        this.password = password;
        this.id = UserModel.#generateId();
    }

    // Static method to generate a user ID
    static #generateId() {
        UserModel.currentId += 1;
        return UserModel.currentId;
    }
}
