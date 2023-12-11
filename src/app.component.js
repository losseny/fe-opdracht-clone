import {html, LitElement} from "lit";
import {userServiceInstance} from "./Core/Services/user.service.js";
import {BehaviorSubject} from "rxjs";

export class AppComponent extends LitElement {

    static get properties() {
        return {
            show: { type: Boolean },
        };
    }

    constructor() {
        super();
        this.userService = userServiceInstance;
    }
    connectedCallback() {
        this.userService.whoAmISubject
            .subscribe(result => this.show = result)
        super.connectedCallback();

    }

    disconnectedCallback() {
        this.subscription.unsubscribe()
        super.disconnectedCallback();
    }


    renderContent() {
        if (this.show) {
            return html`<header-component></header-component>`
        }
    }
    render() {
        return html`
            ${html`${this.renderContent()}`}
            <slot></slot>
        `
    }
}

window.customElements.define('app-page', AppComponent);
