import { html, LitElement} from "lit";
import {HomePageStyles} from "./home.page.styles.js";
import {ContextConsumer} from "@lit/context";
import {AppContexts} from "../../../Core/Infrastructure/Contexts/app.contexts.js";
import {EmissionService} from "../../../Core/Services/emission.service.js";
import {userServiceInstance} from "../../../Core/Services/user.service.js";
import {Task} from '@lit/task';

export class HomePage extends LitElement {

    static styles = HomePageStyles;
    static get properties() {
        return {
            dataSource: { type: Array },
            today: { type: Array },
        }
    }

    constructor() {
        super();
        this._appConsumer = new ContextConsumer(this, {context: AppContexts.appContext});
        this.userService = userServiceInstance;
        this.emissionService = new EmissionService(this.userService)

    }

    _statisticsTask = new Task(this, {

        task: async ([], {signal}) => {
            const [todayEmissions, monthEmissions, yearEmissions] = await this.emissionService.calculateEmissionStatistics();
            const today = await todayEmissions.result
            const month = await monthEmissions.result
            const year = await yearEmissions.result
            return [
                {
                    key: 'Vandaag',
                    result: today
                },
                {
                    key: 'Maand',
                    result: month
                },
                {
                    key: 'Jaar',
                    result: year
                }
            ]
        },

        args: () => []

    });
    connectedCallback() {
        super.connectedCallback();
        this.dataSource = this._appConsumer?.value?.user?.journeys
        if (!this.dataSource) {
            window.location.reload()
        }
    }


    render() {

        return this._statisticsTask.render({

            pending: () => html`<p>Loading product...</p>`,

            complete: (taskResult) => html`
                <div class="content-wrap">
                    <div class="statistics">
                        ${
                            taskResult.map(r => html`
                                <card-component title="${r.key} (CO2)" style="padding: 1rem">
                                    <p style="font-weight: bold; font-size: 2rem">${r.result}</p>
                                </card-component>
                            `)
                        }
                    </div>
                    <div class="content-container">
                        <table-component .dataSource="${this.dataSource}"></table-component>
                    </div>
                </div>
            `,
            error: (e) => html`<p>Error: ${e}</p>`

        });


    }
}

window.customElements.define('home-page', HomePage);
