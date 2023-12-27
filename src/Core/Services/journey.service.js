import {userServiceInstance} from "./user.service.js";

class JourneyService {
    #userService;

    constructor() {
        this.#userService = userServiceInstance;
    }
    fetchAllUniqueJourneys() {
        const ignore = new Set(['date', 'distance', 'emission'])
        return Promise.resolve(
            this.#userService.currentLoggedInUser().then(r => {
                let uniqueIds = new Set();
                const originalSource = [];
                r.journeys.filter(f => f.favorite).forEach((obj) => {
                    const t = {}
                    Object.keys(obj).map(key => {
                        if (!ignore.has(key)) {
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

}

export const journeyServiceInstance = new JourneyService();
