import {css, html, LitElement} from "lit";

export class HomePage extends LitElement {

    render() {
        return html`
            <h1>Home Page</h1>
            <h3>To Be Continued...</h3>
        `
    }
}

window.customElements.define('home-page', HomePage);
