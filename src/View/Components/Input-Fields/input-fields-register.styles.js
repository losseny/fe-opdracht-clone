import {css} from "lit";

const { cssRules } = document.styleSheets[1]
const globalStyle = css([Object.values(cssRules).map(rule =>
    rule.cssText).join('\n')])
export const InputFieldStyles = [
    globalStyle,
    css`  main {
        border-radius: 30px;
        width: 65%;
        height: 80%;
        display: grid;
        grid-template: repeat(3, 1fr) / repeat(1, 1fr);
        background-color: #E2E2E2;
      }

      .input {
        grid-area: 1 / 1 / 3 / 1;
        display: grid;
        grid-template: repeat(3, 1fr) / repeat(1, 1fr);
      }

      .locations {
        display: flex;
        justify-content: space-around;
        align-items: center;
        grid-area: 1 / 1 / 3 / 1;
      }

      .enter {
        grid-area: 3 / 1 / 3 / 1;
        display: flex;
        justify-content: center;
        align-items: flex-start;
      }

      .locations > * {
        font-size: 17px;
        border-radius: 25px;
        width: 35%;
        padding: 7px;
      }

      .result {
        grid-area: 3 / 1 / 3 / 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .enter > * {
        font-size: 17px;
        border-radius: 25px;
        background-color: #00C300;
        padding: 7px;
        cursor: pointer; /* Voeg cursor pointer toe om aan te geven dat het een klikbare knop is */
      }`
];