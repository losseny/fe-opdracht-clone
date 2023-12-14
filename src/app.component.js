import {html, LitElement} from "lit";
import {userServiceInstance} from "./Core/Services/user.service.js";
import {EventKeys} from "./Core/Infrastructure/Util/app-key.env.js";
import {ContextProvider} from "@lit/context";
import {AppContexts} from "./Core/Infrastructure/Contexts/app.contexts.js";

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

    connectedCallback() {
        super.connectedCallback();
        this.userService.whoAmISubject
            .subscribe(result => {
                this.show = result;
                this.#provideContextData()
            })
        this.addEventListener(EventKeys.JOURNEY_EVENT_KEY, this.#journeyEventHandler)
        this.addEventListener(EventKeys.ROUTE_EVENT_KEY, this.#routeEventHandler)
    }

    disconnectedCallback() {
        this.subscription.unsubscribe()
        this.removeEventListener(EventKeys.ROUTE_EVENT_KEY, this.#routeEventHandler)
        super.disconnectedCallback();
    }

    #journeyEventHandler(event) {
        this.userService.registerNewJourneys(event.detail.data.journey)
    }

    #routeEventHandler(event) {
        this.userService.registerNewRoute(event.detail.data.route)
    }
    renderContent() {
        if (this.show) {
            return html`
                <header-component></header-component>
            `
        }
    }

    #provideContextData() {
        this.userService.currentLoggedInUser().then(user => {
            this._provider.setValue({
                routes: user.routes
            })
        }).catch(e => console.log(e))
    }
    render() {
        return html`
            ${html`${this.renderContent()}`}
            <slot></slot>
        `
    }
}

window.customElements.define('app-page', AppComponent);
