import {css} from "lit";

const { cssRules } = document.styleSheets[1]
const globalStyle = css([Object.values(cssRules).map(rule =>
    rule.cssText).join('\n')])
export const InputStyles = [
    globalStyle,
    css`
      input {
        height: 40px;
        font-size: 16px;
        font-family: "Poppins", serif;
        border: none;
        border-radius: 5px;
        background-color: #f4f4f4;
        text-align: center;
          width: 100%;
          max-width: 340px !important;
      }
      .input-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
      }
    `
]