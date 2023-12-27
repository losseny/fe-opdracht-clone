import {css} from "lit";

export const TransportOptionStyles = css`
  #options {
    display: grid;
    flex-wrap: wrap;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 30px;
  }
    h1, h2 {
        color: #00C300 !important;
        font-size: 46px;
        font-weight: bolder;
        text-align: center;
    }
  
  .options-wrapper {
    padding: 2rem 3rem;
  }

  @media screen and (max-width: 1000px) {
    #options {
      grid-template-columns: none;
      grid-template-rows: 1fr 1fr 1fr;
    }
  }
`