import {html, LitElement} from "lit";
import {ContextConsumer} from "@lit/context";
import {AppContexts} from "../../../Core/Infrastructure/Contexts/app.contexts.js";
import {EventKeys} from "../../../Core/Infrastructure/Util/app-key.env.js";
import {EvenEmitter} from "../../../Core/Infrastructure/Util/even-emitter.js";

export class FavoriteRoutesPage extends LitElement {

    static get properties() {
        return {
            originalSource: { state: Map },
            dataSource: { state: Array },
            dialogData: { state: Object },
        }
    }
    constructor() {
        super();
        this._appConsumer = new ContextConsumer(this, {context: AppContexts.appContext});
        this.emitter = new EvenEmitter(this);
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener(EventKeys.TABLE_DATA_EVENT_KEY, this.#tableDataEventHandler)

        let originalArray = this._appConsumer.value?.user.journeys.filter(obj => obj.favorite)

        let uniqueIds = new Set();
        this.originalSource = [];
        originalArray.forEach((obj, index) => {
            const tempDate = obj['date'];
            delete obj['date']
            const data = JSON.stringify(obj)
            const isPresent = uniqueIds.has(data);
            uniqueIds.add(data);
            // TODO fix the deleting of date
            if (!isPresent) {
                obj['date'] = tempDate;
                this.originalSource.push(obj)
            }
        });
        this.dataSource = this.originalSource
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener(EventKeys.TABLE_DATA_EVENT_KEY, this.#tableDataEventHandler)
    }

    #tableDataEventHandler(event) {
        this.dialogData = this.originalSource[event.detail.data.row.id - 1]
        const dialog = this.renderRoot.lastElementChild.shadowRoot.querySelector('#dialog');
        dialog.showModal();
    }

    #repeatJourney() {
        this.emitter.eventKey = EventKeys.JOURNEY_EVENT_KEY
        this.emitter.emit({
            journey: {
                transportOption: this.dialogData.transportOption,
                departure: this.dialogData.departure,
                destination: this.dialogData.destination,
                distance: this.dialogData.distance,
                journeyType: this.dialogData.journeyType,
                date: new Date(),
                favorite: true // true??
            }
        })
    }

    render() {
        return html`
            <div @click="${this.#tableDataEventHandler}">
                <table-component .dataSource="${this.dataSource}"></table-component>
            </div>
            <dialog-component>
                <div>
                    <div>
                        <h3>${this.dialogData?.departure.streetName}</h3> -----> <h3>${this.dialogData?.destination.streetName}</h3>
                    </div>
                    <div class="button-wrapper">
                        <button-component @click="${this.#repeatJourney}">
                            <span>Herhaal</span>
                        </button-component>
                        <button-component>
                            <span>Cron</span>
                        </button-component>
                    </div>
                </div>
            </dialog-component>
        `
    }
}

window.customElements.define('favorite-routes-page', FavoriteRoutesPage);
