import {html, LitElement} from "lit";
import {ButtonStyles} from "./button.styles.js";

export class ButtonComponent extends LitElement {

    static styles = ButtonStyles
    static get properties() {
        return {
            name: { type: String },
            value: { type: String }
        }
    }
    render() {
        return html`
            <button class="btn" value="${this.value}">
                <slot></slot>
            </button>
        `
    }
}
window.customElements.define('button-component', ButtonComponent);
