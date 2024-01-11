import { html, LitElement} from "lit";
import {HeaderStyles} from "./header.styles.js";

export class HeaderComponent extends LitElement {
    static styles = HeaderStyles;


    constructor() {
        super();
    }

    render() {
        return html`
            <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark" style="padding: 10px">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/home" style="display: flex; flex-direction: row; justify-content: center; align-items: center; gap: 7px">
                        <img src="/kpn.png" alt="Logo" width="80" height="45" class="d-inline-block align-text-top">
                        <span>| CO2</span>
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/journey">Registratie</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/profile/settings">Profiel</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        `
    }

}

window.customElements.define('header-component', HeaderComponent);