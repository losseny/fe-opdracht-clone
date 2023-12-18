import {css} from "lit";

export const DialogStyles = css`
    :host {
        background: #a4bacc99;
        color: #226daa;
        font-family: Raleway, sans-serif;
        accent-color: #226DAA;
    }
    a:hover, a:focus {
        text-underline-offset: 0.25em;
    }
    [aria-label="close"] {
        appearance: none;
        float: right;
        border: 1px solid;
        border-radius: 50%;
    }
    dialog {
        border-radius: 25px;
    }
    dialog :focus {
        outline: 2px solid #226DAA;
    }
`