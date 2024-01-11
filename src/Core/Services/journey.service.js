import {userServiceInstance} from "./user.service.js";
import {User} from "../Models/user.model.js";

class JourneyService {
    #userService;
    #transportOptions = [
        {name: 'OV (Trein/Metro/Tram)', type: 'train', mode: 'transit'},
        {name: 'Ov Fiets', type: 'cycling', mode: 'bicycling'},
        {name: 'Benzine Eigen Auto', type: 'car', mode: 'driving'},
        {name: 'Hybride Eigen Auto', type: 'car', mode: 'driving'},
        {name: 'Diesel Eigen Auto', type: 'car', mode: 'driving'},
        {name: 'Service Auto', type: 'car', mode: 'driving'},
        {name: 'Fiets', type: 'cycling', mode: 'bicycling'},
        {name: 'Taxi', type: 'taxi', mode: 'driving'},
        {name: 'Elektrische Deelauto', type: 'car', mode: 'driving'},
        {name: 'Lopen', type: 'walk', mode: 'walking'},
        {name: 'Thuis werken', type: 'home-smile', mode: 'None'},
    ]

    constructor() {
        this.#userService = userServiceInstance;
    }
    fetchAllUniqueJourneys() {
        const ignore = new Set(['id', 'date', 'distance', 'emission'])
        return Promise.resolve(
            this.#userService.currentLoggedInUser().then(r => {
                let uniqueIds = new Set();
                const originalSource = [];
                r.journeys.filter(f => f.favorite).forEach((obj) => {
                    const t = {}
                    Object.keys(obj).map(key => {
                        if (key === 'routes') {
                            t[key] = User.address(obj[key])
                        }
                        else if (!ignore.has(key)) {
                            t[key] = obj[key]
                        }
                    })
                    const data = JSON.stringify(t)
                    const isPresent = uniqueIds.has(data);
                    uniqueIds.add(data);
                    if (!isPresent) {
                        originalSource.push(obj)
                    }
                })
                return originalSource;
            })
        )
    }

    transportOptions() {
        return Promise.resolve(
            this.#transportOptions
        )
    }
    findTransportTypeByTransport(transport) {
        return this.#transportOptions.find(r => transport === r.name)
    }

}

export const journeyServiceInstance = new JourneyService();
