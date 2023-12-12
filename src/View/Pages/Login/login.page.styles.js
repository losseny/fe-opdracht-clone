import {css} from 'lit';

const { cssRules } = document.styleSheets[1]
const globalStyle = css([Object.values(cssRules).map(rule =>
    rule.cssText).join('\n')])
export const LoginPageStyles = [
    globalStyle,
    css`
          #page-image {
            display: none;
          }
          .login {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 15vh;
            width: 100vw;
          }
        
          .login-center {
            padding: 1.5rem;
            max-width: 1120px;
          }
        
          .form .row {
            margin: 0 0 35px;
            line-height: 25px;
          }
        
          .btn--login {
            border: none;
            text-transform: uppercase;
            font-size: 20px;
            min-width: 0;
            padding: 10px 30px;
            clear: both;
            height: auto;
            line-height: normal;
            background:  #00C300;
            color: white;
            font-weight: 300;
          }
        
          /* style voor wachtwoord vergeten link */
          .form .row label a {
            margin-left: 3.4rem;
            line-height: 25px;
            font-size: 1.1rem;
            text-align: right;
          }
          /* einde style voor wachtwoord vergeten link */
        
          /* style voor inloggen h1 */
          .login .login-center h1 {
            font-size: 3.1rem;
            color: #00C300;
          }
          /* einde style voor inloggen h1 */
        
          .form--login .row .form-input input:not([type=radio]):not([type=checkbox]):not([type=file]):not([type=search]) {
            padding: 10px;
            font-size: 17px;
            margin-top: 3px;
            width: 20rem;
          }
        
          .form .row label {
            color: #999;
            font-size: 1.2rem;
          }
        
          #errortext {
            color: red;
          }
        
          @media screen and (min-width: 992px) {
            .login {
              margin-top: 0;
            }
        
            #main-login {
              display: flex;
              justify-content: center;
              align-items: center;
            }
        
            #page-image {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 70vh;
              width: 130vw;
            }
        
            #page-image img {
              height: 40%;
              width: 70%;
            }
          }
`
];
