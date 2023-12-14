import {html, LitElement} from "lit";
import {TransportOptionItemStyles} from "./transport-option-item.styles.js";
import {EventKeys} from "../../../Core/Infrastructure/Util/app-key.env.js";


export class TransportOptionItemComponent extends LitElement{

    static styles = TransportOptionItemStyles;

    static get properties() {
        return {
            img: { type: String },
            name: { type: String },
        }
    }

    constructor() {
        super()
        this.img = ''
        this.name = '';
    }

    #vehicleOptionsEvent() {
        const vehicleOption = new CustomEvent(EventKeys.VEHICLE_OPTIONS_EVENT_KEY, {
            bubbles: true,
            composed: true,
            cancelable: true,
            detail: {
                targetVehicleOptionName: this.name,
            }
        });
        this.dispatchEvent(vehicleOption);
    }

    render() {
        return html`
            <div class="option-wrapper">
                <button class="optionBox" tabindex="0" role="button" aria-pressed="false" @click="${this.#vehicleOptionsEvent}">
                    <img slot="image" src="${this.img}" alt="${this.name}"/>
                    <h3 class="optionTitle">${this.name}</h3>
                </button>
            </div>
        `
    }
}

window.customElements.define('transport-item-component', TransportOptionItemComponent);
