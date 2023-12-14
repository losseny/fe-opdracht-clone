import {html, LitElement} from "lit";
import {LocationStyles} from "./location.styles.js";
import {EvenEmitter} from "../../../Core/Infrastructure/Util/even-emitter.js";
import {EventKeys} from "../../../Core/Infrastructure/Util/app-key.env.js";
import {Router} from "@vaadin/router";
import {ContextConsumer} from "@lit/context";
import {AppContexts} from "../../../Core/Infrastructure/Contexts/app.contexts.js";

export class LocationComponent extends LitElement {

    static styles = LocationStyles;
    static get properties() {
        return {
            next: { type: String },
            nextName: { type: String },
            style: { type: String },
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
        this._journeyConsumer = new ContextConsumer(this, {context: AppContexts.journeyContext});
        this._consumer = new ContextConsumer(this, {context: AppContexts.appContext});
    }

    onBeforeEnter(location) {
        const paths = location.pathname.split('/');
        this.title = paths[paths.length - 1]
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener(EventKeys.INPUT_CHANGED_KEY, this.#inputEventHandler)
        this.addEventListener(EventKeys.SELECT_CHANGED_KEY, this.#selectChangedEventHandler)
        if (this._journeyConsumer.value) {
            const value = this.title === 'vertrek' ? this._journeyConsumer.value.departure : this._journeyConsumer.value.destination
            if (!value) {
                return;
            }
            this.streetName = value.streetName ?? "";
            this.city = value.city ?? "";
            this.zipCode = value.zipCode ?? "";
            this.houseNumber = value.houseNumber ?? "";
            this.addition = value.addition ?? "";
        }
        console.log(this.find)
        this.streetName = this.find?.streetName ?? "";
        this.city = this.find?.city ?? "";
        this.zipCode = this.find?.zipCode ?? "";
        this.houseNumber = this.find?.houseNumber ?? "";
        this.addition = this.find?.addition ?? "";
    }

    disconnectedCallback() {
        this.removeEventListener(EventKeys.INPUT_CHANGED_KEY, this.#inputEventHandler);
        this.removeEventListener(EventKeys.SELECT_CHANGED_KEY, this.#selectChangedEventHandler);
        super.disconnectedCallback();
    }

    #locationEvent() {
        this.emitter.eventKey = this.title === 'vertrek' ? EventKeys.LOCATION_DEPART_KEY : this.title === 'bestemming' ? EventKeys.LOCATION_DESTINATION_KEY : EventKeys.ROUTE_DETAIL_EVENT_KEY
        this.emitter.emit({
            location: {
                streetName: this.streetName,
                city: this.city,
                zipCode: this.zipCode,
                houseNumber: this.houseNumber,
                addition: this.addition,
            }
        })
        if (this.next) {
            Router.go('/home')
        }
    }
    #goBack() {
        if (this.next) {
            Router.go(this.next)
        } else {
            if (this.title === 'vertrek') {
                Router.go('/journey/transport')
            } else {
                Router.go('/journey/location/vertrek')
            }
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
    #routesMapper() {
        return this._consumer.value?.routes.map(r => r.routeName);
    }

    // TODO finish this
    #selectChangedEventHandler(event) {
        this.find = this._consumer.value.routes.find(r => {
            return event.detail.data.change.option.split('\"')[0] === r.routeName
        });
        window.location.reload()
    }
    render() {
        return html`
            <card-component title="${this.title}" style="${this.style}">
                <slot></slot>
                <div class="content-wrap">
                    <div>
                        <drop-down-component .options="${this.#routesMapper()}"></drop-down-component>
                    </div>
                    <div class="input-wrap">
                        <input-component id="streetName" style="margin: 0.4rem 7rem 0 7rem;" value="${this.streetName}" placeholder="Maanplein" name="streetName">
                            <span slot="label">Straatnaam</span>
                        </input-component>
                    </div>

                    <div class="input-wrap">
                        <input-component id="city" style="margin: 0.4rem 7rem 0 7rem;" placeholder="Den Haag" value="${this.city}" name="city">
                            <span slot="label">Plaatsnaam</span>
                        </input-component>
                    </div>

                    <div class="input-wrap">
                        <input-component id="zipCode" style="margin: 0.4rem 7rem 0 7rem;" placeholder="2516CK" value="${this.zipCode}" name="zipCode">
                            <span slot="label">Postcode</span>
                        </input-component>
                    </div>

                    <div class="input-wrap">
                        <input-component id="houseNumber" style="margin: 0.4rem 7rem 0 7rem;" placeholder="55" value="${this.houseNumber}" name="houseNumber">
                            <span slot="label">Huisnummer</span>
                        </input-component>
                    </div>

                    <div class="input-wrap">
                        <input-component id="addition" style="margin: 0.4rem 7rem 0 7rem;" placeholder="a" value="${this.addition}" name="addition">
                            <span slot="label">Toevoeging</span>
                        </input-component>
                    </div>
                </div>
                <div class="button-wrapper" slot="footer">
                    <button-component @click="${this.#goBack}">
                        ${this.nextName ?? html`<span>Terug</span>`}
                    </button-component>
                    <button-component @click="${this.#locationEvent}">
                        ${this.nextName ? html`<span>Opslaan</span>` : html`<span>Volgende</span>`}
                    </button-component>
                </div>
            </card-component>
        `
    }
}

window.customElements.define('location-component', LocationComponent);