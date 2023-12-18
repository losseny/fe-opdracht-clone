import {html, LitElement} from "lit";
import {DialogStyles} from "./dialog.styles.js";

export class DialogComponent extends LitElement {

    static styles = DialogStyles;
    render() {
        return html`
            <dialog id="dialog">
                <form>
                    <slot></slot>
                </form>
            </dialog>
        `
    }
}

window.customElements.define('dialog-component', DialogComponent);

