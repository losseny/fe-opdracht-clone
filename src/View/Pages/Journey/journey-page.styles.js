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
        .journey-options {
            display: flex;
            flex-direction: column;
            margin: 4rem;
        }
        .content-wrap {
            display: grid;
            place-items: center;
        }
    `
];