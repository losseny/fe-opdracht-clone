import {html, LitElement} from "lit";
import {HomePageStyles} from "./home.page.styles.js";
import {ContextConsumer} from "@lit/context";
import {AppContexts} from "../../../Core/Infrastructure/Contexts/app.contexts.js";

export class HomePage extends LitElement {
    static styles = HomePageStyles;
    static get properties() {
        return {
            dataSource: { type: Array },
            headers: { type: Array },
        }
    }

    constructor() {
        super();
        this._appConsumer = new ContextConsumer(this, {context: AppContexts.appContext});
    }
    connectedCallback() {
        super.connectedCallback();
        this.dataSource = this._appConsumer.value?.user.journeys
    }

    render() {
        return html`
            <div class="content-wrap">
                <div>adsadasdasd</div>
                <div class="content-container">
                    <table-component .dataSource="${this.dataSource}"></table-component>
                </div>
            </div>
        `
    }
}

window.customElements.define('home-page', HomePage);
