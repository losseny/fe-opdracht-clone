import {html, LitElement} from "lit";
import {JourneyPageStyles} from "./journey-page.styles.js";

export class JourneyPage extends LitElement {

    static styles = JourneyPageStyles
    transportOptions() {
        return [
            "OV",
            "OV bike",
            "Own transport (car, bike etc)",
            "Lease car",
            "Service car",
            "Sharing car",
            "Leasebike",
            "Taxi",
            "Pool car"
        ];
    }
    render() {
        return html`
            <form>
                <div class="content-wrap">
                    <card-component>
                        <div class="content-body">
                            <div>
                                <h3>Kies een voertuig</h3>
                                <drop-down-component .options="${this.transportOptions()}"></drop-down-component>
                            </div>
                            <div class="location-wrapper">
                                <div>
                                    <h3>Begin punt</h3>
                                    <location-component></location-component>
                                </div>
                                <div>
                                    <h3>Bestemming</h3>
                                    <location-component></location-component>
                                </div>
                            </div>
                        </div>
                        <div class="button-wrapper">
                            <button class="btn">opslaan</button>
                            <button class="btn">favoriet</button>
                        </div>
                    </card-component>
                </div>
            </form>
        `
    }
}

window.customElements.define('journey-page', JourneyPage);
