import {html, LitElement} from "lit";
import {EventKeys} from "../../../Core/Infrastructure/Util/app-key.env.js";
import {EvenEmitter} from "../../../Core/Infrastructure/Util/event-emitter.js";
import {Router} from "@vaadin/router";

export class StandardRouteComponent extends LitElement {
    static get properties() {
        return {
            style: { type: String },
            routeName: { type: String },
            streetName: { type: String },
            city: {type: String},
            zipCode: {type: String},
            houseNumber: {type: String},
            addition: {type: String},
        }

    }

    constructor() {
        super();
        this.emitter = new EvenEmitter(this)
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener(EventKeys.INPUT_CHANGED_KEY, this.#inputEventHandler)
    }

    disconnectedCallback() {
        this.removeEventListener(EventKeys.INPUT_CHANGED_KEY, this.#inputEventHandler);
        super.disconnectedCallback();
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
            case 'routeName': this.routeName = event.detail.data.change.value;
                break
        }
    }

    #routeEventHandler() {
        this.emitter.eventKey = EventKeys.ROUTE_EVENT_KEY;
        this.emitter.emit({
            route: {
                routeName: this.routeName,
                detail: {
                    streetName: this.streetName,
                    city: this.city,
                    zipCode: this.zipCode,
                    houseNumber: this.houseNumber,
                    addition: this.addition,
                }
            }
        })
        Router.go('/home')
    }

    #goBack() {
        Router.go('/home')
    }
    render() {
        return html`
            <route-location-component style="width: fit-content; height: fit-content; padding: 1rem">
                <div class="input-wrap">
                    <input-component id="routeName" placeholder="Route Naam" name="routeName">
                        <span slot="label">Naam</span>
                    </input-component>
                </div>
                <div class="button-wrapper" slot="footer">
                    <button-component @click="${this.#goBack}">
                        <span>Annuleer</span>
                    </button-component>
                    <button-component @click="${this.#routeEventHandler}">
                        <span>Opslaan</span>
                    </button-component>
                </div>
            </route-location-component>
        `
    }
}
window.customElements.define('standard-route-component', StandardRouteComponent);
