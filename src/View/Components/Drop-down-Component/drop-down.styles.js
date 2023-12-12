import {css} from "lit";

export const DropDownStyles = css`
  .dropdown {
    max-width: 250px;
    position: relative;
    margin: 2rem 0;
  }

  select {
    appearance: none;
    /*  safari  */
    -webkit-appearance: none;
    /*  other styles for aesthetics */
    width: 100%;
    font-size: 1.15rem;
    padding: 0.675em 6em 0.675em 1em;
    background-color: #fff;
    border: 1px solid #caced1;
    border-radius: 0.25rem;
    color: #000;
    cursor: pointer;
  }
`