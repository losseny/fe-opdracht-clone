import {html, LitElement} from "lit";

export class ProfileSettingsComponent extends LitElement {

    render() {
        return html`
            <div class="settings-wrapper">
                <a href="/profile/standard/routes">
                    <card-component style="width: 60vw;">Standaard locaties</card-component>
                </a>
            </div>
        `
    }
}

window.customElements.define('profile-settings-component', ProfileSettingsComponent);
