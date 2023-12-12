import {html, LitElement} from "lit";
import {LocationComponent} from "../Location-Component/location.component.js";
import {DropDownStyles} from "./drop-down.styles.js";
import {repeat} from "rxjs";

export class DropDownComponent extends LitElement {

    static styles = DropDownStyles;
    static get properties() {
        return {
            options: { type: Array },
        }
    }


    render() {
        return html`
            <div class="dropdown">
                <select name="cars" id="cars">
                    ${
                        this.options.map(option => html`
                            <option value=${option}">${option}</option>
                        `)
                    }
                </select>
            </div>
        `
    }
}
window.customElements.define('drop-down-component', DropDownComponent);
