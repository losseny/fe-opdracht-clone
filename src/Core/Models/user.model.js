export class UserModel {
    constructor(id, name, password, manager, mobilityGroup, role) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.manager = manager;
        this.role = role;
    }
}
