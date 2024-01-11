import {css} from "lit";

const { cssRules } = document.styleSheets[1]
const globalStyle = css([Object.values(cssRules).map(rule =>
    rule.cssText).join('\n')])
export const CardStyles = [
    globalStyle,
    css`
        .card-body {
            width: 100% !important;
        }
        .card {
            border-radius: 25px;
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
            width: fit-content;
            text-align: center;
        }


        h1, h2 {
            color: #00C300 !important;
            font-size: 46px;
            font-weight: bolder;
            text-align: center;
        }

        .card-footer {
            text-align: center;
        }



        .card-content {
            text-align: center;
            flex-direction: column;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        

      @media screen and (min-width: 992px) {
      }
    `
]