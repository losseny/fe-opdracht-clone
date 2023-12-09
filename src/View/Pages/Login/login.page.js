import {css, html, LitElement} from "lit";
import UserService from "../../../Core/Services/user.service.js";

export class LoginPage extends LitElement {
    static get properties() {
        return {
            nameField: { type: String },
            passwordField: { type: String }
        }
    }

    constructor() {
        super();
        this.userService = new UserService()
        this.nameField = '';
        this.passwordField = '';
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
                window.location.href = "/homepage";
            } else {
                e.target.ownerDocument.activeElement.shadowRoot.getElementById("errortext").style.display = null;
            }
        })

    }

    static get styles() {
        return css `

            #page-image {
                display: none;
            }
            .login {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 15vh;
                width: 100vw;
            }
            
            .login-center {
                padding: 1.5rem;
                max-width: 1120px;
            }
            
            .form .row {
                margin: 0 0 35px;
                line-height: 25px;
            }
            
            .btn--login {
                border: none;
                text-transform: uppercase;
                font-size: 20px;
                min-width: 0;
                padding: 10px 30px;
                clear: both;
                height: auto;
                line-height: normal;
                background:  #00C300;
                color: white;
                font-weight: 300;
                
            }
            
            /* style voor wachtwoord vergeten link */
            .form .row label a {
                margin-left: 3.4rem;
                line-height: 25px;
                font-size: 1.1rem;
                text-align: right;
            }
            /* einde style voor wachtwoord vergeten link */
            
            /* style voor inloggen h1 */
            .login .login-center h1 {
                font-size: 3.1rem;
                color: #00C300;
            }
            /* einde style voor inloggen h1 */
            
            .form--login .row .form-input input:not([type=radio]):not([type=checkbox]):not([type=file]):not([type=search]) {
                padding: 10px;
                font-size: 17px;
                margin-top: 3px;
                width: 20rem;
            }
            
            .form .row label {
                color: #999;
                font-size: 1.2rem;
            }
            
            #errortext {
                color: #red;
            }
            
            @media screen and (min-width: 992px) {
                .login {
                    margin-top: 0;
                }
            
                #main-login {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                    
                #page-image {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 70vh;
                  width: 130vw;
                }
                
                #page-image img {
                    height: 40%;
                    width: 70%;
                }
            }
        `
    }
}

window.customElements.define('login-page', LoginPage);
