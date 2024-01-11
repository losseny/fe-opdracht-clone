import {html, LitElement} from "lit";
import {Router} from "@vaadin/router";
import {EventKeys} from "../../../Core/Infrastructure/Util/app-key.env.js";
import {EvenEmitter} from "../../../Core/Infrastructure/Util/event-emitter.js";
import {AppContexts} from "../../../Core/Infrastructure/Contexts/app.contexts.js";
import {ContextConsumer} from "@lit/context";
import {Location} from "../../../Core/Models/location.model.js";

export class LocationComponent extends LitElement {

    static get properties() {
        return {
            style: { type: String },
            streetName: { type: String },
            city: {type: String},
            transport: {type: String},
            zipCode: {type: String},
            houseNumber: {type: String},
            addition: {type: String},
            routeLocation: {type: Object},
        }
    }
    constructor() {
        super();
        this.emitter = new EvenEmitter(this);
        this._appConsumer = new ContextConsumer(this, {context: AppContexts.appContext});
        this._journeyConsumer = new ContextConsumer(this, {context: AppContexts.journeyContext});
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener(EventKeys.VEHICLE_OPTION_EVENT_KEY, this.#vehicleChangedEventHandler)
        this.addEventListener(EventKeys.INPUT_CHANGED_KEY, this.#inputEventHandler)
        this.addEventListener(EventKeys.SELECT_CHANGED_KEY, this.#selectChangedEventHandler)

    }

    disconnectedCallback() {
        this.removeEventListener(EventKeys.VEHICLE_OPTION_EVENT_KEY, this.#vehicleChangedEventHandler);
        this.removeEventListener(EventKeys.INPUT_CHANGED_KEY, this.#inputEventHandler)
        this.removeEventListener(EventKeys.SELECT_CHANGED_KEY, this.#selectChangedEventHandler)


        super.disconnectedCallback();
    }

    #routesMapper() {
        return this._appConsumer.value?.user?.routes.map(r => r.routeName);
    }

    #vehicleChangedEventHandler(event) {
        this.transport = event.detail.data.transport;
    }

    #goBack() {
        if (this.title === 'vertrek') {
            Router.go('/journey/transport')
        } else {
            Router.go('/journey/location/vertrek')
        }
    }

    #inputEventHandler(event) {
        switch (event.detail.data.change.name) {
            case 'streetName': this.streetName = event.detail.data.change.value;
                break
            case 'city': this.city = event.detail.data.change.value;
                break
            case 'zipCode': this.zipCode = event.detail.data.change.value;
                break
            case 'houseNumber': this.houseNumber = event.detail.data.change.value;
                break
            case 'addition': this.addition = event.detail.data.change.value;
                break
        }
    }

    #locationEvent() {
        const location = new Location({
            streetName: this.routeLocation?.streetName ?? this.streetName,
            city: this.routeLocation?.city ?? this.city,
            zipCode: this.routeLocation?.zipCode ?? this.zipCode,
            houseNumber: this.routeLocation?.houseNumber ?? this.houseNumber,
            addition: this.routeLocation?.addition ?? this.addition,
            transport: this.routeLocation?.transport ?? this.transport,
        })
        this.emitter.eventKey = EventKeys.LOCATION_EVENT_KEY;
        this.emitter.emit({
            location
        })
    }

    #selectChangedEventHandler(event) {
        this.routeLocation = this._appConsumer.value?.user.routes.find(r => {
            return event.detail.data.change.option.split('\"')[0] === r.routeName
        }).detail;

        this.requestUpdate()
    }


    render() {
        return html`
            <div>
                <div>
                    <route-location-component
                            streetName="${this.routeLocation?.streetName}"
                            city="${this.routeLocation?.city}"
                            addition="${this.routeLocation?.addition}"
                            houseNumber="${this.routeLocation?.houseNumber}"
                            zipCode="${this.routeLocation?.zipCode}"
                            .routeOptions="${this.#routesMapper()}"
                    >
                        <div class="button-wrapper" slot="footer">
                            <button-component @click="${this.#goBack}">
                                <span>Terug</span>
                            </button-component>
                            <button-component @click="${this.#locationEvent}">
                                <span>Opslaan</span>
                            </button-component>
                        </div>
                    </route-location-component>
                </div>
            </div>
        `
    }

}


window.customElements.define('location-component', LocationComponent);
