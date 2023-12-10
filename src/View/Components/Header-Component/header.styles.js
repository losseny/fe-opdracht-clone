import {css} from "lit";

const { cssRules } = document.styleSheets[1]
const globalStyle = css([Object.values(cssRules).map(rule =>
    rule.cssText).join('\n')])
export const HeaderStyles = [
    globalStyle,
    css``
];