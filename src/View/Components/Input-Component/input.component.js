import {html, LitElement} from "lit";
import {InputStyles} from "./input.styles.js";
import {EvenEmitter} from "../../../Core/Infrastructure/Util/event-emitter.js";
import {EventKeys} from "../../../Core/Infrastructure/Util/app-key.env.js";

export class InputComponent extends LitElement {
    static styles = InputStyles;

    static get properties() {
        return {
            id: { type: String },
            name: { type: String },
            type: { type: String },
            placeholder: { type: String },
            value: { type: String },
            style: { type: String }
        }
    }

    constructor() {
        super();
        this.emitter = new EvenEmitter(this)
    }

    #inputValueChangeHandler(event) {
        this.emitter.eventKey = EventKeys.INPUT_CHANGED_KEY
        this.emitter.emit({
            change: {
                name: this.name,
                value: event.target.value
            }
        })
    }

    render() {
        return html`
            <div class="input-wrap" style="${this.style}">
                <label for="${this.name}">
                    <slot name="label"></slot>
                </label>
                <input id="${this.id}" type="${this.type}" value="${this.value}" name="${this.name}" placeholder="${this.placeholder ?? 'placeholder'}" @change="${this.#inputValueChangeHandler}">
            </div>
        `
    }
}
window.customElements.define('input-component', InputComponent);
