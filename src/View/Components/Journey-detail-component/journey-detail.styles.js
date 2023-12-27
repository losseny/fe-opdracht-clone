import {css} from "lit";

export const JourneyDetailStyles = css`

  .btn {
    border: none;
    text-transform: uppercase;
    font-size: 15px;
    padding: 10px 30px;
    clear: both;
    font-weight: bold;
    height: auto;
    line-height: normal;
    background: #00C300;
    color: white;
    border-radius: 12px;
    min-width: 140px !important;
    text-align: center;
  }

  .btn-group > .btn:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .journey-detail {
    margin: 4rem;
  }
  .journey-detail .meta {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
  }

  .btn-group > .btn:not(:nth-child(2)) {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
  }

  .btn:active, .btn:hover, .btn:focus, .btn:checked, [role="button"][aria-pressed="true"] {
    background: #049d04;
  }

  .btn-check:checked + .btn {
    background: #049d04;
  }

  .btn-group, .btn-group-vertical {
    position: relative;
    display: inline-flex;
    vertical-align: middle;
    margin-top: 3rem !important;
  }

  .btn-group {
    border-radius: var(--bs-border-radius);
  }

  .btn-group {
    margin: .25rem .125rem;
  }

  .btn-check {
    position: absolute;
    clip: rect(0, 0, 0, 0);
    pointer-events: none;
  }

  //
  //
  //.btn-check:checked + .btn, .btn.active, .btn.show, .btn:first-child:active, :not(.btn-check) + .btn:active {
  //  color: var(--bs-btn-active-color);
  //  background-color: var(--bs-btn-active-bg);
  //  border-color: var(--bs-btn-active-border-color);
  //}
  .btn {
    transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
  }
`