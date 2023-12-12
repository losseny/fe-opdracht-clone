import {html, LitElement} from "lit";
import {InputStyles} from "./input.styles.js";

export class InputComponent extends LitElement {
    static styles = InputStyles;

    static get properties() {
        return {
            id: { type: String },
            name: { type: String },
            text: { type: String },
            placeholder: { type: String },
        }
    }

    render() {
        return html`
            <div class="input-wrap">
                <label for="${this.name}">
                    <slot name="label"></slot>
                </label>
                <input id="${this.id}" type="${this.text}" name="${this.name}" placeholder="${this.placeholder ?? 'placeholder'}">
            </div>
        `
    }
}
window.customElements.define('input-component', InputComponent);
