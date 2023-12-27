import {html, LitElement} from "lit";
import {RouteLocationStyles} from "./route-location.styles.js";

export class RouteLocationComponent extends LitElement {

    static styles = RouteLocationStyles;
    static get properties() {
        return {
            style: { type: String },
            streetName: { type: String },
            city: {type: String},
            zipCode: {type: String},
            houseNumber: {type: String},
            addition: {type: String},
        }
    }


    render() {
        return html`
            <card-component title="${this.title}" style="${this.style}">
                <slot></slot>
                <div class="content-wrap">
                    <div class="input-wrap">
                        <input-component id="streetName" style="margin: 0.4rem 7rem 0 7rem;" value="${this.streetName}" placeholder="Wilhelminakade" name="streetName">
                            <span slot="label">Straatnaam</span>
                        </input-component>
                    </div>

                    <div class="input-wrap">
                        <input-component id="city" style="margin: 0.4rem 7rem 0 7rem;" placeholder="Rotterdam" value="${this.city}" name="city">
                            <span slot="label">Plaatsnaam</span>
                        </input-component>
                    </div>

                    <div class="input-wrap">
                        <input-component id="zipCode" style="margin: 0.4rem 7rem 0 7rem;" placeholder="3072AP" value="${this.zipCode}" name="zipCode">
                            <span slot="label">Postcode</span>
                        </input-component>
                    </div>

                    <div class="input-wrap">
                        <input-component id="houseNumber" style="margin: 0.4rem 7rem 0 7rem;" placeholder="123" value="${this.houseNumber}" name="houseNumber">
                            <span slot="label">Huisnummer</span>
                        </input-component>
                    </div>

                    <div class="input-wrap">
                        <input-component id="addition" style="margin: 0.4rem 7rem 0 7rem;" placeholder="a" value="${this.addition}" name="addition">
                            <span slot="label">Toevoeging</span>
                        </input-component>
                    </div>
                </div>
                <slot name="footer" slot="footer"></slot>
            </card-component>
        `
    }
}

window.customElements.define('route-location-component', RouteLocationComponent);