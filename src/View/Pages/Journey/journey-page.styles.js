import {css} from "lit";

const { cssRules } = document.styleSheets[1]
const globalStyle = css([Object.values(cssRules).map(rule => rule.cssText).join('\n')])
export const JourneyPageStyles = [
    globalStyle,
    css`
      h1, h2 {
        color: #00C300 !important;
        font-size: 46px;
        font-weight: bolder;
        text-align: center;
      }
      .content-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
      }
      
      .button-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin-top: 10px;
      }

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
      }

      @media screen and (min-width: 992px) {
        .location-wrapper {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          padding: 10px;
          margin: 2rem;
        }
        .button-wrapper {
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }
      }
    `
];