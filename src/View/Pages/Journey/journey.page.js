import {html, LitElement} from "lit";
import { JourneyPageStyles } from "./journey-page.styles.js";
import { EventKeys } from "../../../Core/Infrastructure/Util/app-key.env.js";
import { Router } from "@vaadin/router";
import {EvenEmitter} from "../../../Core/Infrastructure/Util/event-emitter.js";
import {bingMapsService} from "../../../Core/Infrastructure/Location/bing-maps.service.js";
import {ContextProvider} from "@lit/context";
import {AppContexts} from "../../../Core/Infrastructure/Contexts/app.contexts.js";
import {Route} from "../../../Core/Models/route.model.js";
import {journeyServiceInstance} from "../../../Core/Services/journey.service.js";
import {Journey} from "../../../Core/Models/journey.model.js";

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
            favorite: { type: Boolean },
            registering: {type: Boolean},




            journeys: { type: Array }

        }
    }

    constructor() {
        super();
        this._provider = new ContextProvider(this, {context: AppContexts.journeyContext});
        this.locationService = bingMapsService;
        this.subscription = this.locationService.routeDistance.subscribe(y => {
            this.distance = y;
            console.log(this.distance)
        });
        this.emitter = new EvenEmitter(this);
        this.journeyService = journeyServiceInstance;


        // ===================================================

        this.#initialize()

    }


    connectedCallback() {
        super.connectedCallback();

        // We add an event-listener for a custom event with the key VEHICLE_OPTIONS_EVENT_KEY
        this.addEventListener(EventKeys.LOCATION_DESTINATION_KEY, this.#locationDestinationEventHandler)
        this.addEventListener(EventKeys.LOCATION_DEPART_KEY, this.#locationDepartureEventHandler)
        this.addEventListener(EventKeys.VEHICLE_OPTIONS_EVENT_KEY, this.#vehicleOptionsHandler);
        this.addEventListener(EventKeys.JOURNEY_DETAIL_EVENT_KEY, this.#journeyDetailEventHandler)

        // ===================================================
        this.addEventListener(EventKeys.LOCATION_EVENT_KEY, this.#locationEventHandler)
    }

    disconnectedCallback() {
        // we delete the events
        this.removeEventListener(EventKeys.LOCATION_DESTINATION_KEY, this.#locationDestinationEventHandler)
        this.removeEventListener(EventKeys.LOCATION_DEPART_KEY, this.#locationDepartureEventHandler)
        this.removeEventListener(EventKeys.VEHICLE_OPTIONS_EVENT_KEY, this.#vehicleOptionsHandler);
        this.removeEventListener(EventKeys.JOURNEY_DETAIL_EVENT_KEY, this.#journeyDetailEventHandler)

        // ===================================================
        this.removeEventListener(EventKeys.LOCATION_EVENT_KEY, this.#locationEventHandler)


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
        this.emitter.eventKey = EventKeys.JOURNEY_EVENT_KEY;
        this.emitter.emit({
            journey: new Journey({
                routes: this.journeys,
                journeyType: event.detail.data.meta.journeyType,
                date: event.detail.data.meta.date,
                favorite: event.detail.data.meta.favorite
            })
        });
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

    #register(path) {
        Router.go(path)
        this.registering = true
    }

    /////////////////////////////////////////////////////////////////////// ////

    #locationEventHandler(event) {
        event.stopPropagation()
        this.#initialize()
        this.addRoutes(event.detail.data.location).then(_ => {
            this._provider.setValue({
                data: [...this.journeys]
            })
            Router.go('/journey/registration');
        })
    }
    #initialize() {
        if (!this.journeys) {
            this.journeys = [];
        }
    }
    addRoutes(data) {
        if (this.journeys.length <= 0)  {
            this.journeys.push(new Route([data]))
            return Promise.resolve();
        }

        let lastRoute = this.journeys[this.journeys.length - 1];
        if (lastRoute.locations.length === 1) {
            lastRoute.locations.push(data);
        } else {
            lastRoute = new Route([lastRoute.locations[lastRoute.locations.length - 1], data])
            this.journeys.push(lastRoute)
        }
        const transport = this.journeyService.findTransportTypeByTransport(lastRoute.locations[1].transport);
        lastRoute.transportation = transport;
        return this.#distanceRequest({
            route: lastRoute,
            transportOptionType: transport.mode
        }).then(d => lastRoute.distance = d)
    }

    #distanceRequest(journey) {
        if (!journey) {
            return Promise.resolve(null);
        }
        const route = {
            departure: this.#formatAddress(journey.route.locations[0]),
            destination: this.#formatAddress(journey.route.locations[1]),
            type: journey.transportOptionType
        }
        return bingMapsService.calculateDistance(route)
    }

    render() {
        if (!this.registering) {
            return html`
                <div class="content-wrap">
                    <card-component title="Reisbeweging">
                        <div class="journey-options">
                            <button-component @click="${() => this.#register('/journey/registration')}">
                                <box-icon name='trip'></box-icon>
                                <span>Nieuwe reisbeweging</span>
                            </button-component>
                            <button-component @click="${() => Router.go("/profile/favorites")}">
                                <box-icon name='repeat'></box-icon>
                                <span>Herhaal reisbeweging</span>
                            </button-component>
                        </div>
                        <div class="button-wrapper" slot="footer">
                            <button-component>
                                <span>Annuleer</span>
                            </button-component>
                        </div>
                    </card-component>
                </div>

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
