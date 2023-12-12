import {html, LitElement} from "lit";
import {CardStyles} from "./card.styles.js";

export class CardComponent extends LitElement {

    static styles = CardStyles
    render() {
        return html`
            <div class="card">
                <div class="card-body">
                    <slot></slot>
                </div>
            </div>
        `
    }
}

window.customElements.define('card-component', CardComponent);
