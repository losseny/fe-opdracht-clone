import {html, LitElement} from "lit";
import {TransportOptionStyles} from "./transport-option.styles.js";

export class TransportOptionComponent extends LitElement{

    static styles = TransportOptionStyles

    transportOptions() {
        return [
            {name: 'OV', src: 'https://www.ns.nl/binaries/_ht_1605177542165/opengraph/content/gallery/ns-nl/thema-hero-afbeeldingen/reisinformatie/inchecken-ov-chipkaart.jpg'},
            {name: 'Ov Fietsen', src: 'https://www.rtlnieuws.nl/sites/default/files/content/images/2022/05/30/ov-fiets-ebike.jpg?itok=9GSqi4nv&width=2048&height=1152&impolicy=semi_dynamic'},
            {name: 'Eigen auto', src: 'https://amihkturdo.cloudimg.io/v7/https://s3.eu-central-1.amazonaws.com/autosmeeing-nl/07/audi-e-tron-q4.jpg?v=1-0&width=600&height=400'},
            {name: 'lease auto', src: 'https://media.autoweek.nl/m/du8yemjb3klm.jpg'},
            {name: 'Sharing car', src: 'https://radar.assets.avrotros.nl/media_import/youngtimer-leasen-populairder-111017.jpg'},
            {name: 'Service auto', src: 'https://i.pinimg.com/736x/bb/1f/d3/bb1fd36f06a0dfcde8e205c79f0d36a0.jpg'},
            {name: 'lease fiets', src: 'https://images0.persgroep.net/rcs/Rkv5x6PisBGx3kmYLMGt_20wLsk/diocontent/154593455/_fitwidth/763?appId=93a17a8fd81db0de025c8abd1cca1279&quality=0.8'},
            {name: 'Taxi', src: 'https://www.zzp-nederland.nl/sites/default/files/styles/node_hero_medium/public/2022-05/taxi_zzpers%20%281%29.jpg?h=a4f816ce&itok=kHmoN7sb'},
            {name: 'Pool car', src: 'https://assets.entrepreneur.com/content/3x2/2000/20160308205658-ridesharing-car-taxis-drive.jpeg'},
        ];
    }

    render() {
        return html`
            <div class="options-wrapper">
                <h2>Kies een vervoermiddel</h2>
                <div id="options">
                    ${
                        this.transportOptions()
                                .map(option => html`
                                    <transport-item-component name=${option.name} img="${option.src}"></transport-item-component>
                                `)
                    }
                </div>
            </div>
        `
    }
}


window.customElements.define('transport-option-component', TransportOptionComponent);
