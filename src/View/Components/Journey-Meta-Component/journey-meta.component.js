import {html, LitElement} from "lit";
import {Router} from "@vaadin/router";
import {Task} from "@lit/task";
import {ContextConsumer} from "@lit/context";
import {AppContexts} from "../../../Core/Infrastructure/Contexts/app.contexts.js";
import {journeyServiceInstance} from "../../../Core/Services/journey.service.js";
import {EventKeys} from "../../../Core/Infrastructure/Util/app-key.env.js";
import {EvenEmitter} from "../../../Core/Infrastructure/Util/event-emitter.js";

export class JourneyMetaComponent extends LitElement {

    constructor() {
        super();
        this._appConsumer = new ContextConsumer(this, {context: AppContexts.appContext});
        this.journeyService = journeyServiceInstance;
        this.emitter = new EvenEmitter(this);
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener(EventKeys.VEHICLE_OPTION_EVENT_KEY, this.#vehicleChangedEventHandler)
        this.addEventListener(EventKeys.SELECT_CHANGED_KEY, this.#selectChangedEventHandler)
    }

    disconnectedCallback() {
        this.removeEventListener(EventKeys.VEHICLE_OPTION_EVENT_KEY, this.#vehicleChangedEventHandler);
        this.removeEventListener(EventKeys.SELECT_CHANGED_KEY, this.#selectChangedEventHandler)

        super.disconnectedCallback();
    }

    #vehicleChangedEventHandler(event) {
        this.transport = event.detail.data.transport;
    }

    _transportTask = new Task(this, {

        task: async ([], {signal}) => {
            const options = await this.journeyService.transportOptions();
            return options.map(r => r.name)
        },

        args: () => []
    });

    #routesMapper() {
        return this._appConsumer.value?.user?.routes.map(r => r.routeName);
    }

    #selectChangedEventHandler(event) {
        this.routeLocation = this._appConsumer.value?.user.routes.find(r => {
            return event.detail.data.change.option.split('\"')[0] === r.routeName
        })?.detail ?? this.routeLocation;
    }

    #journeyDetailEvent() {
        this.emitter.eventKey = EventKeys.JOURNEY_META__EVENT_KEY;
        this.emitter.emit({
            transport: this.transport,
            routeLocation: this.routeLocation
        })
        Router.go("/journey/location")
    }

    render() {
        return this._transportTask.render({
            pending: () => html`<p>Loading...</p>`,

            complete: (taskResult) => html`
                <div>
                    <card-component title="Reisbeweging">
                        <div class="journey-options">
                            <div id="select-location">
                                <transport-component .routeOptions="${ taskResult ?? []}">
                                    <span slot="label">vervoer</span>
                                </transport-component>
                            </div>
                            <div id="select-location">
                                <drop-down-component .options="${this.#routesMapper() ?? []}">
                                    <span slot="label">standaard</span>
                                </drop-down-component>
                            </div>
                        </div>
                        <div class="button-wrapper" slot="footer">
                            <button-component @click="${() => Router.go("/journey/registration")}">
                                <span>Terug</span>
                            </button-component>
                            <button-component @click="${this.#journeyDetailEvent}">
                                <span>Volgende</span>
                            </button-component>
                        </div>
                    </card-component>
                </div>
            `,
            error: (e) => html`<p>Error: ${e}</p>`
        });
    }
}
window.customElements.define('journey-meta-component', JourneyMetaComponent);
