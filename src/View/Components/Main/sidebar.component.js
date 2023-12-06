import {css, html, LitElement} from "lit";
export class SidebarComponent extends LitElement {

    constructor() {
        super();
    }

    render() {
        return html`
            <div class="sidebar">
                <div class="logo_content">
                    <div class="logo">
                        <div class="logo_name">KPN Registratie</div>
                    </div>
                </div>
                <ul class="nav_list">
                    <li class="nav-links">
                        <a href="/homepage" class="nav-link">
                            <span class="sidebar-list-text">Test</span>
                        </a>
                    </li>
                </ul>
            </div>
        `
    }

    static get styles() {
        return css`
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          height: 100%;
          width: 260px;
          padding: 0;
          background: var(--KPN-zwart);
          transition: all 0.5s ease;
          z-index: 1;
        }
        
        .sidebar .nav_list {
          padding-left: 0;
        }
        
        .sidebar .logo_content .logo {
          color: var(--text-color);
          height: 50px;
          width: 100%;
          pointer-events: none;
          padding: 10px;
        }
        .sidebar.show-links .logo_content .logo {
          opacity: 1;
          pointer-events: none;
        }
        
        
        .logo_content .logo .logo_name {
          font-size: 30px;
          font-weight: 400;
          text-align: center;
          margin-top: 10px;
        }
        
        .sidebar ul {
          margin-top: 30px;
          line-height: 50px;
        }
        .sidebar ul li {
          position: relative;
          height: 50px;
          width: 100px;
          margin: 0 5px;
          list-style: none;
          line-height: 50px;
        }
        
        .sidebar ul li a {
          color: var(--text-color);
          display: flex;
          align-items: center;
          text-decoration: none;
          border-radius: 12px;
          width: 250px;
          white-space: nowrap;
          font-size: 22px;
          font-weight: 400;
        }
        .sidebar ul li a:hover {
          background: var(--text-color);
          color: var(--sidebar-backgrond-color);
        }
        .sidebar ul li a .sidebar-list-text {
            position: relative;
            left: 60px;
        }
        @media screen and (max-width: 600px) {
                
            .sidebar {
                width: 200px;
            }
            
            .sidebar ul li a {
                width: 190px;
            }
            .sidebar ul li a .sidebar-list-text {
                left: 20px;
            }
            .sidebar .nav_list {
                margin-top: 3rem;
            }
        }
        `
    }
}

window.customElements.define('sidebar-component', SidebarComponent);