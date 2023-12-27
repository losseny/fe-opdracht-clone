import {html, LitElement} from "lit";
import { JourneyPageStyles } from "./journey-page.styles.js";
import { EventKeys } from "../../../Core/Infrastructure/Util/app-key.env.js";
import { Router } from "@vaadin/router";
import {EvenEmitter} from "../../../Core/Infrastructure/Util/event-emitter.js";
import {bingMapsService} from "../../../Core/Infrastructure/Location/bing-maps.service.js";
import {ContextProvider} from "@lit/context";
import {AppContexts} from "../../../Core/Infrastructure/Contexts/app.contexts.js";

export class JourneyPage extends LitElement {

    // de css
    static styles = JourneyPageStyles

    static get properties() {
        return {
            smallDevice: { type: Boolean },
            transportOption: { type: String },
            departure: { type: Object },
            destination: { type: Object },
            distance: { type: Number },
            journeyType: { type: String },
            date: {type: Date},
            favorite: { type: Boolean }
        }
    }

    constructor() {
        super();
        this._provider = new ContextProvider(this, {context: AppContexts.journeyContext});
        this.locationService = bingMapsService;
        this.subscription = this.locationService.routeDistance.subscribe(y => this.distance = y);
        this.emitter = new EvenEmitter(this);
    }


    connectedCallback() {
        super.connectedCallback();

        // We add an event-listener for a custom event with the key VEHICLE_OPTIONS_EVENT_KEY
        this.addEventListener(EventKeys.LOCATION_DESTINATION_KEY, this.#locationDestinationEventHandler)
        this.addEventListener(EventKeys.LOCATION_DEPART_KEY, this.#locationDepartureEventHandler)
        this.addEventListener(EventKeys.VEHICLE_OPTIONS_EVENT_KEY, this.#vehicleOptionsHandler);
        this.addEventListener(EventKeys.JOURNEY_DETAIL_EVENT_KEY, this.#journeyDetailEventHandler)

    }

    disconnectedCallback() {
        // we delete the events
        this.removeEventListener(EventKeys.LOCATION_DESTINATION_KEY, this.#locationDestinationEventHandler)
        this.removeEventListener(EventKeys.LOCATION_DEPART_KEY, this.#locationDepartureEventHandler)
        this.removeEventListener(EventKeys.VEHICLE_OPTIONS_EVENT_KEY, this.#vehicleOptionsHandler);
        this.removeEventListener(EventKeys.JOURNEY_DETAIL_EVENT_KEY, this.#journeyDetailEventHandler)

        // we unsubscribe
        this.subscription.unsubscribe();

        super.disconnectedCallback();
    }

    #locationDestinationEventHandler(event) {
        try {
            event.stopPropagation()
            this.destination = event.detail.data.location
            const route = {
                departure: this.#formatAddress(this.departure),
                destination: this.#formatAddress(this.destination)
            }
            this.#provideContextData()
            bingMapsService.calculateDistance(route)
            Router.go('/journey/location/detail')
        } catch (e) {
            Router.go('/journey/location/detail')
            console.log(e)
        }
    };
    #formatAddress(address) {
        return {
            address: `${address.streetName}, ${address.zipCode} ${address.city}`
        }
    }
    #locationDepartureEventHandler(event) {
        event.stopPropagation()
        this.departure = event.detail.data.location;
        this.#provideContextData()
        Router.go('/journey/location/bestemming')
    };
    #provideContextData() {
        this._provider.setValue({
            transportOption: this.transportOption,
            departure: this.departure,
            destination: this.destination,
        })
    }

    #journeyDetailEventHandler(event) {
        event.stopPropagation()
        this.emitter.eventKey = EventKeys.JOURNEY_EVENT_KEY
        this.emitter.emit({
            journey: {
                transportOption: this.transportOption,
                departure: this.departure,
                destination: this.destination,
                distance: event.detail.data.meta.distance,
                journeyType: event.detail.data.meta.journeyType,
                date: event.detail.data.meta.date,
                favorite: event.detail.data.meta.favorite
            }
        })
    };

    // Privé methode om het VEHICLE_OPTIONS_EVENT_KEY event af te handelen
    #vehicleOptionsHandler(event) {
        event.stopPropagation();

        // we voegen de naam van de transportoptei
        this.transportOption = event.detail.targetVehicleOptionName;

        this.#provideContextData()

        // We gebruiken Routing om bij te navigeren
        Router.go('/journey/location/vertrek');
    };

    transportOptions() {
        return [
            "OV",
            "OV bike",
            "Own transport (car, bike etc)",
            "Lease car",
            "Service car",
            "Sharing car",
            "Leasebike",
            "Taxi",
            "Pool car"
        ];
    }

    render() {
        if (this.smallDevice) {
            return html`
                <card-component>
                    <div class="content-body">
                        <div>
                            <h3>Kies een voertuig</h3>
                            <drop-down-component .options="${this.transportOptions()}"></drop-down-component>
                        </div>
                        <div class="location-wrapper">
                            <div>
                                <h3>Begin punt</h3>
                                <location-component></location-component>
                            </div>
                            <div>
                                <h3>Bestemming</h3>
                                <location-component></location-component>
                            </div>
                        </div>
                    </div>
                    <div class="button-wrapper">
                        <button class="btn">opslaan</button>
                        <button class="btn">favoriet</button>
                    </div>
                </card-component>
            `
        }
        return html`
            <form>
                <div class="content-wrap">
                    <slot></slot>
                </div>
            </form>
        `
    }

}

window.customElements.define('journey-page', JourneyPage);
