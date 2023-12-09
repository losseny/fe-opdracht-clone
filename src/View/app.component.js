import {html, LitElement} from "lit";

export class AppComponent extends LitElement {
    render() {
        return html`
            <page-header-component></page-header-component>
            <sidebar-component></sidebar-component>
        `
    }
}

window.customElements.define('app-page', AppComponent);
