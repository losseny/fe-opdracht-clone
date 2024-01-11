import {Base} from "./base.model.js";

export class Location extends Base {

    constructor(location) {
        super();
        this.streetName = location.streetName;
        this.city = location.city;
        this.zipCode = location.zipCode;
        this.houseNumber = location.houseNumber;
        this.addition = location.addition;
        this.transport = location.transport;
    }

}