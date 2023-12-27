import {html, LitElement} from "lit";
import {DropDownStyles} from "./drop-down.styles.js";
import {EvenEmitter} from "../../../Core/Infrastructure/Util/event-emitter.js";
import {EventKeys} from "../../../Core/Infrastructure/Util/app-key.env.js";

export class DropDownComponent extends LitElement {

    static styles = DropDownStyles;
    static get properties() {
        return {
            options: { type: Array },
        }
    }

    constructor() {
        super();
        this.emitter = new EvenEmitter(this)
    }

    #selectValueChangeHandler(event) {
        this.emitter.eventKey = EventKeys.SELECT_CHANGED_KEY
        this.emitter.emit({
            change: {
                option: event.target.value,
            }
        })
    }


    render() {
        return html`
            <div class="dropdown">
                <select name="cars" id="cars" >
                    ${
                        this.options.map(option => html`
                            <option value=${option}" @click="${this.#selectValueChangeHandler}">${option}</option>
                        `)
                    }
                </select>
            </div>
        `
    }
}
window.customElements.define('drop-down-component', DropDownComponent);
