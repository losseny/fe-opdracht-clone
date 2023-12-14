import {css} from "lit";

export const ButtonStyles = css`
  .btn {
    border: none;
    text-transform: uppercase;
    font-size: 15px;
    padding: 10px 30px;
    clear: both;
    font-weight: bold;
    height: auto;
    line-height: normal;
    background:  #00C300;
    color: white;
    border-radius: 12px;
    min-width: 140px !important;
    margin: 1rem 2rem;
  }

  .btn:active, .btn:hover, .btn:focus, [role="button"][aria-pressed="true"] {
    background: #049d04;
  }
  
`