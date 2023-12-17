import {html, LitElement} from "lit";
import {TransportOptionComponent} from "../Transport-Options/transport-option.component.js";
import {TableStyles} from "./table.styles.js";

export class TableComponent extends LitElement {

    static styles = TableStyles

    static get properties() {
        return {
            dataSource: {type: Array},
            headers: {type: Array},
        }
    }
    constructor() {
        super();
        this.headers = ['Datum', 'Type', "Vervoer", 'Afstand', 'Vertrek', 'Bestemming', 'Favoriet']
    }

    render() {
        return html`
            <table>
                <thead>
                    <tr>
                        ${
                            this.headers.map(data => html`
                                <th>${data}</th>
                            `)
                        }
                    </tr>
                </thead>
                <tbody>
                   ${
                        this.dataSource.map(data => html`
                            <tr>
                                <td>${data.date}</td>
                                <td>${data.journeyType ?? "prive"}</td>
                                <td>${data.transportOption}</td>
                                <td>${data.distance}</td>
                                <td>${data.departure.streetName} ${data.departure.houseNumber}</td>
                                <td>${data.destination.streetName} ${data.destination.houseNumber}</td>
                                <td>${data.favorite ? '✅' : '❌' }</td>
                            </tr>
                        `)
                    }
                </tbody>
            </table>
            
        `
    }
}
window.customElements.define('table-component', TableComponent);
