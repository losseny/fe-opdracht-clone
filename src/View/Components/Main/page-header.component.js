import {css, html, LitElement} from "lit";

export class PageHeaderComponent extends LitElement {
    render() {
        return html`
            <header id="page-header">
                <div id="logo"><img src="kpn.png" alt="KPN logo"></div>
                <div id="page-title"> | CO2</div>
            </header>
        `
    }

    static get styles() {
        return css`
            
            #page-header {
                color: white;
                background-color: var(--KPN-zwart);
                display: flex;
                height: 100px;
                width: 100%;
                pointer-events: none;
                padding: 10px;
                white-space: nowrap;
                align-items: center;
            }
            
            
            #logo img {
                height: 50px;
                margin-left: 350px;
                margin-right: 10px;
            }
            
            #page-title {
                font-size: 1.8rem;
                padding-top: 10px;
                padding-bottom: 10px;
            }
            
            @media screen and (max-width: 755px) {
                
                #logo img {
                    margin-left: 270px;
                }
                
                #page-title {
                    font-size: 1.4rem;
                }
            }
        `
    }
}

window.customElements.define('page-header-component', PageHeaderComponent);