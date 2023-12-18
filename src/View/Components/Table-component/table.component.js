import {html, LitElement} from "lit";
import {TableStyles} from "./table.styles.js";
import {EvenEmitter} from "../../../Core/Infrastructure/Util/even-emitter.js";
import {EventKeys} from "../../../Core/Infrastructure/Util/app-key.env.js";

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
        this.headers = ['No.', 'Datum', 'Type', "Vervoer", 'Afstand', 'Vertrek', 'Bestemming', 'Favoriet']
        this.emitter = new EvenEmitter(this);
    }

    #tableDataEvent(event) {
        const values = event.target.parentElement.innerText.split('\t')
        this.emitter.eventKey = EventKeys.TABLE_DATA_EVENT_KEY
        this.emitter.emit({
            row: {
                id: values[0],
            }
        })
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
                        this.dataSource?.map((data, index) => html`
                            <tr @click="${this.#tableDataEvent}">
                                <td>${(data.id ?? index) + 1}</td>
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
