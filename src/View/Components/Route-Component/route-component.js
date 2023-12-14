import {html, LitElement} from "lit";
import {EventKeys} from "../../../Core/Infrastructure/Util/app-key.env.js";
import {EvenEmitter} from "../../../Core/Infrastructure/Util/even-emitter.js";

export class RouteComponent extends LitElement {

    static get properties() {
        return {
            routeName: { type: String }
        }
    }

    constructor() {
        super();
        this.emitter = new EvenEmitter(this)
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener(EventKeys.INPUT_CHANGED_KEY, this.#inputEventHandler)
        this.addEventListener(EventKeys.ROUTE_DETAIL_EVENT_KEY, this.#routeEventHandler)
    }

    disconnectedCallback() {
        this.removeEventListener(EventKeys.INPUT_CHANGED_KEY, this.#inputEventHandler);
        this.addEventListener(EventKeys.ROUTE_DETAIL_EVENT_KEY, this.#routeEventHandler)

        super.disconnectedCallback();
    }
    #inputEventHandler(event) {
        if (event.detail.data.change.name === "routeName") {
            this.routeName = event.detail.data.change.value
        }
    }

    #routeEventHandler(event) {
        const  temp = event.detail.data.location;

        this.emitter.eventKey = EventKeys.ROUTE_EVENT_KEY;
        this.emitter.emit({
            route: {
                routeName: this.routeName,
                detail: temp
            }
        })
    }
    render() {
        return html`
            <location-component next="/home" nextName="Cancel" style="width: fit-content; height: fit-content; padding: 1rem">
                <div class="input-wrap">
                    <input-component id="routeName" placeholder="Route Naam" name="routeName">
                    </input-component>
                </div>
            </location-component>
        `
    }
}
window.customElements.define('route-component', RouteComponent);
