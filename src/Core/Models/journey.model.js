import {Base} from "./base.model.js";

export class Journey extends Base {
    favorite
    journeyType
    date

    constructor(journey) {
        super();
        this.routes = journey.routes;
        this.favorite = journey.favorite;
        this.journeyType = journey.journeyType;
        this.date = journey.date;
    }

    calculateTotalJourneyDistance() {
        return Journey.distanceMeter(this.routes)
    }

    static distance(routes) {
        if (!routes) {
            return 0;
        }
        return routes.distance ?? 0
    }

    static distanceMeter(routes) {
        if (!routes) {
            return 0;
        }
        return routes.map(r => Number(r.distance))
            .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    }

}