import {html, LitElement} from "lit";
import {TableStyles} from "./table.styles.js";
import {EvenEmitter} from "../../../Core/Infrastructure/Util/event-emitter.js";
import {EventKeys} from "../../../Core/Infrastructure/Util/app-key.env.js";
import {Journey} from "../../../Core/Models/journey.model.js";

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
        this.headers = ['No.', 'Datum', 'Type', 'Afstand', "Uitstoot (CO2)", 'Vertrek', 'Bestemming', 'Favoriet']
        this.emitter = new EvenEmitter(this);
    }

    #tableDataEvent(event) {
        const values = event.target.parentElement.innerText.split('\t')
        this.emitter.eventKey = EventKeys.TABLE_DATA_EVENT_KEY
        this.emitter.emit({
            tableRowData: this.dataSource[values[0] - 1]
        })
    }

    address(routes) {
        let index = 0;
        if (routes.length > 1) {
            index = routes.length - 1;
        }

        return {
            departure: `${routes[0].locations[0].streetName} ${routes[0].locations[0].houseNumber}`,
            destination: `${routes[index].locations[1].streetName} ${routes[index].locations[1].houseNumber}`,
        }
    }


    render() {
        let tableData = html`
            <td style="text-align: center" colspan="${this.headers.length}">Geen reisbewegingen gemaakt</td>
        `
        if (this.dataSource && this.dataSource?.length > 0) {
            tableData = html`
                ${
                    this.dataSource?.map((data, index) => html`
                        <tr @click="${this.#tableDataEvent}">
                            <td>${index + 1}</td>
                            <td>${new Date(data.date).toLocaleDateString()}</td>
                            <td>${data.journeyType ?? "prive"}</td>
                            <td>${Journey.distanceMeter(data.routes)}</td>
                            <td>${data.emission}</td>
                            <td>${this.address(data.routes).departure}</td>
                            <td>${this.address(data.routes).destination}</td>
                            <td>${data.favorite ? '✅' : '❌' }</td>
                        </tr>
                    `)
                }
            `
        }
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
                    ${tableData}
                </tbody>
            </table>
        `
    }
}
window.customElements.define('table-component', TableComponent);
