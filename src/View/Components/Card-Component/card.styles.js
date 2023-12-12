import {css} from "lit";

const { cssRules } = document.styleSheets[1]
const globalStyle = css([Object.values(cssRules).map(rule =>
    rule.cssText).join('\n')])
export const CardStyles = [
    globalStyle,
    css`
        .card {
          border-radius: 25px;
          box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
          min-width: 22rem;
        }

      @media screen and (min-width: 992px) {
        .card {
          width: 80vw;
          padding: 2rem;
        }
      }
    `
]