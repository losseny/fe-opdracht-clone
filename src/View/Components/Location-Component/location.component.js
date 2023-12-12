import {html, LitElement} from "lit";
import {LocationStyles} from "./location.styles.js";

export class LocationComponent extends LitElement {

    static styles = LocationStyles;
    render() {
        return html`
            <div class="content-wrap">
                <div class="input-wrap">
                    <input-component id="streetname" placeholder="Maanplein" name="streetname">
                        <span slot="label">Straatnaam</span>
                    </input-component>
                </div>
    
                <div class="input-wrap">
                    <input-component id="cityname" placeholder="Den Haag" name="cityname">
                        <span slot="label">Plaatsnaam</span>
                    </input-component>
                </div>
    
                <div class="input-wrap">
                    <input-component id="postalcode" placeholder="2516CK" name="postalcode">
                        <span slot="label">Postcode</span>
                    </input-component>
                </div>
    
                <div class="input-wrap">
                    <input-component id="housenumber" placeholder="55" name="housenumber">
                        <span slot="label">Huisnummer</span>
                    </input-component>
                </div>
    
                <div class="input-wrap">
                    <input-component id="addition" placeholder="a" name="addition">
                        <span slot="label">Toevoeging</span>
                    </input-component>
                </div>
            </div>
        `
    }
}

window.customElements.define('location-component', LocationComponent);