import { css, html, LitElement } from "lit";
import { InputFieldStyles } from "./input-fields-register.styles.js";
export class InputFields extends LitElement {
    static styles = InputFieldStyles;

    constructor() {
        super();
        this.showDistance = false;
    }

    render() {
        return html`
            <main>
                <div class="input">
                    <div class="locations">
                        <input type="text" class="start" placeholder="start">
                        <input type="text" class="end" placeholder="end">
                    </div>
                    <div class="enter">
                        <button @click="${this.showDistanceText}">Bereken Afstand(km)</button>
                    </div>
                </div>
                <div class="result">
                    ${this.showDistance ? html`<h2>Hier komt de afstand in(km)</h2>` : ''}
                </div>
            </main>
        `;
    }

    showDistanceText() {
        this.showDistance = true;
        this.requestUpdate();
    }
}

window.customElements.define('input-fields', InputFields);
