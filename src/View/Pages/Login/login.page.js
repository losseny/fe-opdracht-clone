import {css, html, LitElement} from "lit";
import {userServiceInstance} from "../../../Core/Services/user.service.js";
import {LoginPageStyles} from './login.page.styles.js';
import {Router} from "@vaadin/router";

export class LoginPage extends LitElement {
    static styles = LoginPageStyles;

    static get properties() {
        return {
            nameField: { type: String },
            passwordField: { type: String }
        }
    }

    constructor() {
        super();
        this.userService = userServiceInstance
        this.nameField = '';
        this.passwordField = '';
        this.userService.logOut()
    }

    render() {
        return html`
            <div id="main-login">
                <div id="page-image">
                    <img src="/KPN.png" alt="kpn-gebouw">
                </div>
                <div class="login">
                    <div class="login-center">
                        <h1>Welkom</h1>
                        <form autocomplete="off" class="form form--left form--login" @submit=${this._onSubmit}>
                            <div class="row">
                                <label for="username">Gebruikersnaam</label>
                                <div class="form-input">
                                    <input
                                            @value=${this.nameField}
                                            name="username"
                                            type="text"
                                            id="username"
                                            placeholder="jan@!"
                                            required
                                    />
                                </div>
                            </div>
                            <div class="row">
                                <label for="password"
                                >Wachtwoord</label
                                >
                                <div class="form-input">
                                    <input
                                            @value=${this.passwordField}
                                            name="password"
                                            type="password"
                                            id="password"
                                            placeholder="••••••••••"
                                            required
                                    />
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-submit">
                                    <button type="submit" class="btn btn--login">Inloggen</button>
                                </div>
                            </div>
                            <div class="row" id="errortext" style="display: none">
                                De gebruikersnaam of wachtwoord is ongeldig.
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `
    }

    _onSubmit(e) {
        e.preventDefault();

        const usernameField = e.target.elements["username"];
        const passwordField = e.target.elements["password"];

        const username = usernameField.value;
        const password = passwordField.value;

        this.userService.login(username, password).then((detail) => {
            if (detail) {
                e.target.ownerDocument.activeElement.shadowRoot.getElementById("errortext").style.display = "none";
                Router.go("/Home")
            } else {
                e.target.ownerDocument.activeElement.shadowRoot.getElementById("errortext").style.display = null;
            }
        })

    }
}

window.customElements.define('login-page', LoginPage);
