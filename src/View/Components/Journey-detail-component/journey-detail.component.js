import { html, LitElement} from "lit";
import {JourneyDetailStyles} from "./journey-detail.styles.js";
import {bingMapsService} from "../../../Core/Infrastructure/Location/bing-maps.service.js";
import {EventKeys} from "../../../Core/Infrastructure/Util/app-key.env.js";
import {Router} from "@vaadin/router";
import {EvenEmitter} from "../../../Core/Infrastructure/Util/event-emitter.js";

export class JourneyDetailComponent extends LitElement {

    static styles = JourneyDetailStyles

    static get properties() {
        return {
            distance: { type: Number },
            journeyType: { type: String },
            date: {type: Date},
            favorite: { type: Boolean },
            retour: { type: Boolean },
        }
    }

    constructor() {
        super();
        this.locationService = bingMapsService;
        this.emitter = new EvenEmitter(this);
        this.favorite = false;
        this.journeyType = 'prive'
    }

    #JourneyDetailEvent() {
        if (this.retour) {
            this.distance = (Number(this.distance).toFixed(1) * 2)
        }
        this.emitter.eventKey = EventKeys.JOURNEY_DETAIL_EVENT_KEY;

        this.emitter.emit({
            meta: {
                distance: Number(this.distance),
                journeyType: this.journeyType,
                date: this.date ?? new Date().toISOString().split('T')[0],
                favorite: this.favorite,
            }
        })
    }

    #inputEventHandler(event) {
        switch (event.detail.data.change.name) {
            case 'date': this.date = event.detail.data.change.value;
                break
            case 'kilometers': this.distance = event.detail.data.change.value;
                break
            case 'favorite': this.favorite = event.detail.data.change.value;
                break
        }
    }

    #radioButtonEventHandler(event) {
        this.journeyType = event.target.value
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener(EventKeys.INPUT_CHANGED_KEY, this.#inputEventHandler)
        this.locationService.routeDistance.subscribe(y => this.distance = y)
    }

    disconnectedCallback() {
        this.removeEventListener(EventKeys.INPUT_CHANGED_KEY, this.#inputEventHandler);
        super.disconnectedCallback();
    }

    #goBack() {
        Router.go('/journey/location/bestemming')
    }

    render() {
        if (!this.distance) {
            return html`
                <card-component style="margin-top: 7rem; padding: 3rem">
                    <h1>Loading.......</h1>
                </card-component>
            `
        }
        return html`
            <card-component title="Reis Beweging Detail">
                <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" value="prive" @click="${this.#radioButtonEventHandler}" checked="checked">
                    <label class="btn btn-outline-primary" for="btnradio1">Prive</label>

                    <input type="radio" class="btn-check" name="btnradio" id="btnradio2" value="business" @click="${this.#radioButtonEventHandler}" autocomplete="off">
                    <label class="btn btn-outline-primary" for="btnradio2">Business</label>

                    <input type="radio" class="btn-check" name="btnradio" id="btnradio3" value="commute" @click="${this.#radioButtonEventHandler}" autocomplete="off">
                    <label class="btn btn-outline-primary" for="btnradio3">Commute</label>
                </div>
                <div class="journey-detail">
                    <div class="meta">
                        <input-component id="date" type="date" value="${new Date().toISOString().split('T')[0]}" name="date">
                            <span slot="label">Datum</span>
                        </input-component>
                        <div>
                            <label>Favoriet</label>
                            <input type="checkbox" @click="${() => this.favorite = !this.favorite}">
                        </div>
                        <div>
                            <label>Retour</label>
                            <input type="checkbox" @click="${() => this.retour = !this.retour}">
                        </div>
                    </div>
                    <div>
                        <div>123 KM</div>
                        <div>23234 CO2</div>
                    </div>
                </div>
                <div class="button-wrapper" slot="footer">
                    <button-component @click="${this.#goBack}">
                        Terug
                    </button-component>
                    <button-component @click="${this.#JourneyDetailEvent}">
                        Opslaan
                    </button-component>
                </div>
            </card-component>
        `;
    }
}

window.customElements.define('journey-detail-component', JourneyDetailComponent);
