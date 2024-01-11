import axios from "axios";
import {BehaviorSubject} from "rxjs";

class BingMapsService {

    routeDistance = new BehaviorSubject(null);

    calculateDistance(route) {
        return this.#request('get', `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${route.departure.address}&destinations=${route.destination.address}&mode=${route.type}&departure_time=now&key=wfyLg5YDqJNSuO0AvlyGmSQMkfGvWwXz6qdy3Y3ASZpv1YiR8tyI3y3SpipOqj5h`).then(r => {
            this.routeDistance.next(Number(r?.rows[0].elements[0].distance.text.split(" ")[0]).toFixed(1))
            return Number(r?.rows[0].elements[0].distance.text.split(" ")[0]).toFixed(1);
        })
    }

    async #request(method, url)  {
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
