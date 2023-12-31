import { html, LitElement} from "lit";
import {JourneyDetailStyles} from "./journey-detail.styles.js";
import {bingMapsService} from "../../../Core/Infrastructure/Location/bing-maps.service.js";
import {EventKeys} from "../../../Core/Infrastructure/Util/app-key.env.js";
import {Router} from "@vaadin/router";
import {EvenEmitter} from "../../../Core/Infrastructure/Util/even-emitter.js";

export class JourneyDetailComponent extends LitElement {

    static styles = JourneyDetailStyles

    static get properties() {
        return {
            distance: { type: Number },
            journeyType: { type: String },
            date: {type: Date},
            favorite: { type: Boolean }
        }
    }

    constructor() {
        super();
        this.locationService = bingMapsService;
        this.locationService.routeDistance.subscribe(y => this.distance = y)
        this.emitter = new EvenEmitter(this);
        this.favorite = false;
        this.journeyType = 'prive'
    }

    #JourneyDetailEvent() {
        this.emitter.eventKey = EventKeys.JOURNEY_DETAIL_EVENT_KEY
        this.emitter.emit({
            meta: {
                distance: this.distance,
                journeyType: this.journeyType,
                date: this.date ?? new Date(),
                favorite: this.favorite,
            }
        })
    }

    #inputEventHandler(event){
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
    }

    disconnectedCallback() {
        this.removeEventListener(EventKeys.INPUT_CHANGED_KEY, this.#inputEventHandler);
        super.disconnectedCallback();
    }

    #goBack() {
        Router.go('/journey/location/bestemming')
    }

    render() {
        // make component of radio buttons
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
                    </div>
                    <input-component id="kilometers" placeholder="12" type="number" value="${this.distance}" name="kilometers">
                        <span slot="label">Kilometers</span>
                    </input-component>
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
