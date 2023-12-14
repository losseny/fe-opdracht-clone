import {html, LitElement} from "lit";
import {CardStyles} from "./card.styles.js";

export class CardComponent extends LitElement {

    static styles = CardStyles
    static get properties() {
        return {
            title: { type: String },
            style: { type: String },
        }
    }
    render() {
        return html`
            <div class="card" style="${this.style}">
                <div class="card-body">
                    <h2>${this.title}</h2>
                    <slot class="card-content"></slot>
                    <slot class="card-footer" name="footer"></slot>
                </div>
            </div>
        `
    }
}

window.customElements.define('card-component', CardComponent);
