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

export class JourneyPage extends LitElement {

    // de css
    static styles = JourneyPageStyles

    static get properties() {
        return {
            distance: { type: Number },
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
        });
        this.emitter = new EvenEmitter(this);
        this.journeyService = journeyServiceInstance;
        this.#initialize()
    }


    connectedCallback() {
        super.connectedCallback();
        this.addEventListener(EventKeys.LOCATION_EVENT_KEY, this.#locationEventHandler)
        this.addEventListener(EventKeys.JOURNEY_META__EVENT_KEY, this.#journeyEventHandler)
    }

    disconnectedCallback() {
        this.removeEventListener(EventKeys.LOCATION_EVENT_KEY, this.#locationEventHandler)
        this.removeEventListener(EventKeys.JOURNEY_META__EVENT_KEY, this.#journeyEventHandler)
        this.subscription?.unsubscribe();
        super.disconnectedCallback();
    }


    #formatAddress(address) {
        return {
            address: `${address.streetName}, ${address.zipCode} ${address.city}`
        }
    }

    #journeyEventHandler(event) {
        event.stopPropagation();
        this._provider.setValue(event.detail.data)
    }

    #isRegistering(path) {
        Router.go(path)
        this.registering = true
    }


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
                            <button-component @click="${() => this.#isRegistering('/journey/registration')}">
                                <box-icon name='trip'></box-icon>
                                <span>Nieuwe reisbeweging</span>
                            </button-component>
                            <button-component @click="${() => Router.go("/profile/favorites")}">
                                <box-icon name='repeat'></box-icon>
                                <span>Herhaal reisbeweging</span>
                            </button-component>
                        </div>
                        <div class="button-wrapper" slot="footer">
                            <button-component @click="${() => Router.go("/home")}">
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
