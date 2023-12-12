import {css} from "lit";

const { cssRules } = document.styleSheets[1]
const globalStyle = css([Object.values(cssRules).map(rule =>
    rule.cssText).join('\n')])
export const InputStyles = [
    globalStyle,
    css`
      input {
        width: 170px;
        height: 40px;
        font-size: 16px;
        padding-left: 10px;
        font-family: "Poppins", serif;
        border: none;
        border-radius: 5px;
        background-color: #f4f4f4;
        margin: 1rem;
      }
      .input-wrap {
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    `
]