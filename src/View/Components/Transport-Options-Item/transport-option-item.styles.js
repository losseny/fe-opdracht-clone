import {css} from "lit";

export const TransportOptionItemStyles = css`
  h3 {
    font-family: "Poppins", serif;
  }
  .optionBox {
    height: 220px;
    background-color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor:pointer;
    overflow:hidden;
    position: relative;
    border-radius: 5px;
    border-left-width: 0;
    border-left-style: solid;
    border-top-width: 0;
    border-top-style: solid;
    border-right-width: 0;
    border-right-style: solid;
    border-bottom-width: 0;
    border-bottom-style: solid;
    padding-left: 0;
  }

  img{
    max-width: 100%;
    opacity: 0.5;
    border-radius: 25px !important;
  }

  .optionTitle {
    color: white;
    position: absolute;
  }

  .optionBox:active, .optionBox:hover, .optionBox:focus, [role="button"][aria-pressed="true"] {
    border: 5px solid #00C300;
  }
  
`