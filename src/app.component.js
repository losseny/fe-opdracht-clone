import {html, LitElement} from "lit";
import {userServiceInstance} from "./Core/Services/user.service.js";
import {ContextProvider} from "@lit/context";
import {AppContexts} from "./Core/Infrastructure/Contexts/app.contexts.js";
import {EventKeys} from "./Core/Infrastructure/Util/app-key.env.js";
import { CronJob } from 'cron';
import {Router} from "@vaadin/router";

export class AppComponent extends LitElement {

    static get properties() {
        return {
            show: { type: Boolean },
        };
    }

    constructor() {
        super();
        this.userService = userServiceInstance;
        this._provider = new ContextProvider(this, {context: AppContexts.appContext});
    }

    firstUpdated(_changedProperties) {
        // Initialize the CronJob here
        this.job = new CronJob(
            '1 * * * * *', // cronTime
            () => {
                this.userService.currentLoggedInUser().then(r => {
                    for (const element of r.cronJourneys) {
                        element['date'] = new Date();
                        this.#registerJourney(element)
                    }
                });
            }, // onTick
            null, // onComplete
            false // Start the job right now
        );
    }
    connectedCallback() {
        super.connectedCallback();
        this.userService.whoAmISubject
            .subscribe(result => {
                this.show = result;
                this.#provideContextData()
            })
        this.addEventListener(EventKeys.JOURNEY_EVENT_KEY, this.#journeyEventHandler)
        this.addEventListener(EventKeys.ROUTE_EVENT_KEY, this.#routeEventHandler)
        this.addEventListener(EventKeys.CRON_JOURNEY_EVENT_KEY, this.#cronJourneyEventHandler)
    }

    disconnectedCallback() {
        this.subscription.unsubscribe()
        this.removeEventListener(EventKeys.JOURNEY_EVENT_KEY, this.#journeyEventHandler)
        this.removeEventListener(EventKeys.ROUTE_EVENT_KEY, this.#routeEventHandler)
        this.removeEventListener(EventKeys.CRON_JOURNEY_EVENT_KEY, this.#cronJourneyEventHandler)
        if (this.job) {
            this.job.stop();
        }
        super.disconnectedCallback();
    }
    #journeyEventHandler(event) {
        this.#registerJourney(event.detail.data.journey)
    }

    #routeEventHandler(event) {
        this.userService.registerNewRoute(event.detail.data.route).then(t => Router.go('/home'))
    }

    #cronJourneyEventHandler(event) {
        this.userService.registerNewCronJourney(event.detail.data.journey).then(t => Router.go('/home'))
    }

    #provideContextData() {
        this.userService.currentLoggedInUser().then(user => {
            this._provider.setValue({
                user: user
            })
        }).catch(e => console.log(e))
    }

    #registerJourney(journey) {
        this.userService.registerNewJourneys(journey)
            .then(t => Router.go('/home'))

    }

    renderContent() {
        if (this.show) {
            return html`<header-component></header-component>`
        }
    }
    render() {
        return html`
            <div>
                ${html`${this.renderContent()}`}
                <slot></slot>
            </div>
        `
    }
}

window.customElements.define('app-page', AppComponent);
