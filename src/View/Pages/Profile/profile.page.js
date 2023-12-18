import {html, LitElement} from "lit";
import {ProfilePageStyles} from "./profile.page.styles.js";

export class ProfilePage extends LitElement {
    static styles = ProfilePageStyles;
    render() {
        return html`
            <div class="profile-content">
                <slot></slot>
            </div>
        `
    }
}
window.customElements.define('profile-page', ProfilePage);
