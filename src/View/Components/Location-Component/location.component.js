import {html, LitElement} from "lit";
import {Router} from "@vaadin/router";
import {EventKeys} from "../../../Core/Infrastructure/Util/app-key.env.js";
import {EvenEmitter} from "../../../Core/Infrastructure/Util/even-emitter.js";
import {AppContexts} from "../../../Core/Infrastructure/Contexts/app.contexts.js";
import {ContextConsumer} from "@lit/context";

export class LocationComponent extends LitElement {

    static get properties() {
        return {
            style: { type: String },
            streetName: { type: String },
            city: {type: String},
            zipCode: {type: String},
            houseNumber: {type: String},
            addition: {type: String},
            find: {type: Object},
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
        this.addEventListener(EventKeys.SELECT_CHANGED_KEY, this.#selectChangedEventHandler)
        this.addEventListener(EventKeys.INPUT_CHANGED_KEY, this.#inputEventHandler)

        this.find = {
            detail: this.emitter.eventKey = this.title === 'vertrek' ? this._journeyConsumer.value.departure : this._journeyConsumer.value.destination
        }
        console.log(this.find)

        this.streetName = this.find?.streetName;
        this.city = this.find?.city;
        this.zipCode = this.find?.zipCode;
        this.houseNumber = this.find?.houseNumber;
        this.addition = this.find?.addition;
    }

    disconnectedCallback() {
        this.removeEventListener(EventKeys.SELECT_CHANGED_KEY, this.#selectChangedEventHandler);
        this.removeEventListener(EventKeys.INPUT_CHANGED_KEY, this.#inputEventHandler)

        super.disconnectedCallback();
    }

    #routesMapper() {
        return this._appConsumer.value?.routes.map(r => r.routeName);
    }

    // TODO finish this
    #selectChangedEventHandler(event) {
        this.find = this._appConsumer.value.routes.find(r => {
            return event.detail.data.change.option.split('\"')[0] === r.routeName
        });
        this.requestUpdate()
    }
    onBeforeEnter(location) {
        const paths = location.pathname.split('/');
        this.title = paths[paths.length - 1]
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
        this.emitter.eventKey = this.title === 'vertrek' ? EventKeys.LOCATION_DEPART_KEY : EventKeys.LOCATION_DESTINATION_KEY
        this.emitter.emit({
            location: {
                streetName: this.find.detail?.streetName ?? this.streetName,
                city: this.find.detail?.city ?? this.city,
                zipCode: this.find.detail?.zipCode ?? this.zipCode,
                houseNumber: this.find.detail?.houseNumber ?? this.houseNumber,
                addition: this.find.detail?.addition ?? this.addition,
            }
        })
    }


    render() {
        const routes = this.#routesMapper();
        let show = html``;
        if (routes) {
            show = html`
                <div>
                    <card-component style="width: 100%; margin-bottom: 2rem; text-align: center;" title="Kies een locatie">
                        <div>
                            <drop-down-component .options="${routes}"></drop-down-component>
                        </div>
                    </card-component>
                </div>
            `
        }
        return html`
            <div style="border: #1E1E1E 3px solid">
                ${show}
                <div>
                    <route-location-component 
                            title="${this.title}" 
                            streetName="${this.find?.detail?.streetName}"
                            city="${this.find?.detail?.city}"
                            addition="${this.find?.detail?.addition}"
                            houseNumber="${this.find?.detail?.houseNumber}"
                            zipCode="${this.find?.detail?.zipCode}"
                    >
                        <div class="button-wrapper" slot="footer">
                            <button-component @click="${this.#goBack}">
                                <span>Terug</span>
                            </button-component>
                            <button-component @click="${this.#locationEvent}">
                                <span>Volgende</span>
                            </button-component>
                        </div>
                    </route-location-component>
                </div>
            </div>
        `
    }
}


window.customElements.define('location-component', LocationComponent);
