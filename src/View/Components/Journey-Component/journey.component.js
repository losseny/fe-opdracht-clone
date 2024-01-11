import {html, LitElement} from "lit";
import {JourneyStyles} from "./journey.styles.js";
import {Router} from "@vaadin/router";
import {ContextConsumer} from "@lit/context";
import {AppContexts} from "../../../Core/Infrastructure/Contexts/app.contexts.js";
import {User} from "../../../Core/Models/user.model.js";
import {Journey} from "../../../Core/Models/journey.model.js";

export class JourneyComponent extends LitElement {

    static styles = JourneyStyles;

    static get properties() {
        return {
            routes: { type: Array }
        }
    }
    constructor() {
        super();
        this._journeyConsumer = new ContextConsumer(this, {context: AppContexts.journeyContext});
    }

    render() {
        return html`
            <div class="itinerary-container">
                <div class="button-wrapper">
                    <button-component>
                        <span>Annuleer</span>
                    </button-component>
                    <button-component @click="${() => Router.go("/journey/detail")}">
                        <span>Opslaan</span>
                    </button-component>
                </div>
                <div>
                    <div style="display: flex; gap: 1rem; height: 90px">
                        <div class="AUkJgf">
                            <div class="PLEQOe lECG9c"></div>
                            <div class="PLEQOe IeZuN"></div>
                            <div class="PLEQOe IeZuN"></div>
                        </div>
                    </div>
                    <button class="edit" @click="${() => Router.go('/journey/meta')}">
                        <div class="itinerary">
                            <div class="event">
                                <div class="details" style="display: grid; place-items: center; height: 72px">
                                    <box-icon name='location-plus'></box-icon>
                                </div>
                            </div>
                        </div>
                    </button>
                </div>
                ${
                    this._journeyConsumer.value?.data?.map((r) => {
                        return r.locations.map((t, ind) =>
                            html`
                                <div>
                                    <div style="display: flex; gap: 1rem; height: 90px">
                                        <div class="AUkJgf">
                                            <div class="PLEQOe IeZuN"></div>
                                            ${
                                                ind + 1 === 1 || (ind + 1) % 3 === 0 ? 
                                                        html`<box-icon name="${r.transportation?.type}"></box-icon>` :
                                                html`<div class="PLEQOe lECG9c"></div>`
                                            }
                                            <div class="PLEQOe IeZuN"></div>
                                        </div>
                                    </div>
                                    <div class="itinerary">
                                        <div class="event">
                                            <div class="time">
                                                ${
                                                    ind + 1 === 1 || (ind + 1) % 3 === 0 ?
                                                            Journey.distance(r.distance) :
                                                            Journey.distanceMeter(this._journeyConsumer.value?.data)
                                                } KM
                                            </div>
                                            <div class="details">
                                                <div class="location">${t.streetName} ${t.houseNumber}</div>
                                                <div class="address"> ${t.zipCode} ${t.city}</div>
                                            </div>
                                            <button class="edit">
                                                <box-icon name='trash'></box-icon>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            `
                        )
                    })
                }
            </div>
        `;
    }
}

window.customElements.define('journey-component', JourneyComponent);
