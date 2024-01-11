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
            routeDetail: {type: Object},
        }
    }

    constructor() {
        super();
        this.emitter = new EvenEmitter(this);
        this._journeyConsumer = new ContextConsumer(this, {context: AppContexts.journeyContext});
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener(EventKeys.INPUT_CHANGED_KEY, this.#inputEventHandler)
        this.routeDetail = this._journeyConsumer.value
    }

    disconnectedCallback() {
        this.removeEventListener(EventKeys.INPUT_CHANGED_KEY, this.#inputEventHandler)
        super.disconnectedCallback();
    }

    #goBack() {
        Router.go('/journey/registration')
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
            streetName: this.routeDetail?.routeLocation?.streetName ?? this.streetName,
            city: this.routeDetail?.routeLocation?.city ?? this.city,
            zipCode: this.routeDetail?.routeLocation?.zipCode ?? this.zipCode,
            houseNumber: this.routeDetail?.routeLocation?.houseNumber ?? this.houseNumber,
            addition: this.routeDetail?.routeLocation?.addition ?? this.addition,
            transport: this.routeDetail?.transport ?? this.transport,
        })
        this.emitter.eventKey = EventKeys.LOCATION_EVENT_KEY;
        this.emitter.emit({
            location
        })
    }

    render() {
        return html`
            <div>
                <div>
                    <route-location-component
                            streetName="${this.routeDetail?.routeLocation?.streetName}"
                            city="${this.routeDetail?.routeLocation?.city}"
                            addition="${this.routeDetail?.routeLocation?.addition}"
                            houseNumber="${this.routeDetail?.routeLocation?.houseNumber}"
                            zipCode="${this.routeDetail?.routeLocation?.zipCode}"
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
