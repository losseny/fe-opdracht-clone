import {html, LitElement} from "lit";
import {EventKeys} from "../../../Core/Infrastructure/Util/app-key.env.js";
import {EvenEmitter} from "../../../Core/Infrastructure/Util/event-emitter.js";

export class TransportOptionsComponent extends LitElement {

    static get properties() {
        return {
            routeOptions: { type: Array }
        }
    }

    constructor() {
        super();
        this.emitter = new EvenEmitter(this);

    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener(EventKeys.SELECT_CHANGED_KEY, this.#changedEventHandler)
    }

    disconnectedCallback() {
        this.removeEventListener(EventKeys.SELECT_CHANGED_KEY, this.#changedEventHandler);
        super.disconnectedCallback();
    }

    #changedEventHandler(event) {
        this.emitter.eventKey = EventKeys.VEHICLE_OPTION_EVENT_KEY
        this.emitter.emit({
            transport: event.detail.data.change.option.split('\"')[0]
        })
    }
    render() {
        return html`
            <drop-down-component .options="${this.routeOptions ?? []}">
                <span slot="label">standaard</span>
            </drop-down-component>
        `
    }
}
window.customElements.define('transport-component', TransportOptionsComponent);
