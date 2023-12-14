import {css} from "lit";

export const TransportOptionStyles = css`
  #options {
    display: grid;
    flex-wrap: wrap;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 30px;
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