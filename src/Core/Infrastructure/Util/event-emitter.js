export class EvenEmitter {
    #eventKey
    #config
    #context

    constructor(context, eventKey = null, config = null) {
        this.#config = config;
        this.#eventKey = eventKey;
        this.#context = context
    }

    set eventKey(value) {
        this.#eventKey = value;
    }

    set config(value) {
        this.#config = value;
    }

    emit(data) {
        if (!this.#eventKey) {
            return false;
        }
        const event = new CustomEvent(this.#eventKey, {
            bubbles: this.#config?.bubbles ?? true,
            composed: this.#config?.composed ?? true,
            cancelable: this.#config?.cancelable ?? true,
            detail: {
                data
            }
        });
        this.#context.dispatchEvent(event)
        return true;
    }
}