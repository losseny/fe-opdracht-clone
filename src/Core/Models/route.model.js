import {Base} from "./base.model.js";

export class Route extends Base {
    distance = 0;
    transportation

    constructor(locations) {
        super();
        this.locations = locations;
    }

}