import axios from "axios";
import {BehaviorSubject} from "rxjs";

class BingMapsService {

    route
    routeDistance = new BehaviorSubject(null);

    calculateDistance(route) {
        this.#request('get', `http://localhost:5184/BingMaps?departure=${route.departure.address}&destination=${route.destination.address}`).then(r => {
            this.routeDistance.next(r.resourceSets[0].resources[0].travelDistance)
        })
    }

    async #request(method, url) {
        try {
            return (
                await axios.request({
                    url: url,
                    method: method
                })
            ).data;
        } catch (e) {
            console.log(e)
        }
    }
}
export const bingMapsService = new BingMapsService();
