import {html, LitElement} from "lit";
import {ContextConsumer} from "@lit/context";
import {AppContexts} from "../../../Core/Infrastructure/Contexts/app.contexts.js";
import {EventKeys} from "../../../Core/Infrastructure/Util/app-key.env.js";
import {EvenEmitter} from "../../../Core/Infrastructure/Util/event-emitter.js";
import {EmissionService} from "../../../Core/Services/emission.service.js";
import {journeyServiceInstance} from "../../../Core/Services/journey.service.js";
import {userServiceInstance} from "../../../Core/Services/user.service.js";
import {User} from "../../../Core/Models/user.model.js";
import {Journey} from "../../../Core/Models/journey.model.js";

export class FavoriteRoutesComponent extends LitElement {

    static get properties() {
        return {
            originalSource: { state: Map },
            dataSource: { state: Array },
            dialogData: { state: Object },
            dialog: {state: Object}
        }
    }

    constructor() {
        super();
        this._appConsumer = new ContextConsumer(this, {context: AppContexts.appContext});
        this.emitter = new EvenEmitter(this);
        this.emissionService = new EmissionService(userServiceInstance)
        this.journeyService = journeyServiceInstance;
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener(EventKeys.TABLE_DATA_EVENT_KEY, this.#tableDataEventHandler)

        this.journeyService.fetchAllUniqueJourneys()
            .then(r => this.dataSource = r)
    }

    firstUpdated(_changedProperties) {
        this.dataSource = this.journeyService.fetchAllUniqueJourneys()
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener(EventKeys.TABLE_DATA_EVENT_KEY, this.#tableDataEventHandler)
    }

    #tableDataEventHandler(event) {
        console.log(event.detail.data.tableRowData)
        console.log(this.dataSource)
        this.dialogData = event.detail.data.tableRowData
        this.dialog = this.renderRoot.lastElementChild.shadowRoot.querySelector('#dialog');
        this.dialog.showModal();
    }

    #repeatJourney() {
        this.emitter.eventKey = EventKeys.JOURNEY_EVENT_KEY
        this.emitter.emit({
            journey: new Journey({
                routes: this.dialogData.routes,
                emission: this.dialogData.emission,
                journeyType: this.dialogData.journeyType,
                date: new Date(),
                favorite: true
            })
        })
    }

    #cronJourneyEvent() {
        this.emitter.eventKey = EventKeys.CRON_JOURNEY_EVENT_KEY
        this.emitter.emit({
            journey: new Journey({
                routes: this.dialogData.routes,
                emission: this.dialogData.emission,
                journeyType: this.dialogData.journeyType,
                favorite: true
            })
        })
    }
    #closeDialog() {
        this.dialog.close()
    }

    render() {
        return html`
            <div @click="${this.#tableDataEventHandler}">
                <table-component .dataSource="${this.dataSource}"></table-component>
            </div>
            <dialog-component>
                <div>
                    <div>
                        <div style="display: flex; flex-direction: row; justify-content: space-around">
                            <div>
                                <h3>Vertrek</h3>
                                <p>${User.address(this.dialogData?.routes)?.departure}</p>
                            </div>
                            <div>
                                <h3>Kilometers</h3>
                                <p>${Journey.distanceMeter(this.dialogData?.routes)}</p>
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: row; justify-content: space-around">
                            <div>
                                <h3>Bestemming</h3>
                                <p>${User.address(this.dialogData?.routes)?.destination}</p>
                            </div>
                            <div>
                                <h3>CO₂-uitstoot</h3>
                                <p>${this.dialogData?.emission}</p>
                            </div>
                        </div>
                    </div>
                    <div class="button-wrapper">
                        <button-component @click="${this.#closeDialog}">
                            <span>Annuleer</span>
                        </button-component>
                        <button-component @click="${this.#repeatJourney}">
                            <span>Herhaal</span>
                        </button-component>
                        <button-component @click="${this.#cronJourneyEvent}">
                            <span>Cron</span>
                        </button-component>
                    </div>
                </div>
            </dialog-component>
        `
    }
}

window.customElements.define('favorite-routes-page', FavoriteRoutesComponent);
