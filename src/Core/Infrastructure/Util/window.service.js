import {BehaviorSubject} from "rxjs";

export class WindowService {

    windowObserver = new BehaviorSubject(false)
    constructor(size = 390) {
        window.addEventListener('resize', () => {
            this.#windowSizeChangeHandler(size);
        });
    }

    #windowSizeChangeHandler(size) {
        if (window.innerWidth === size) {
            this.windowObserver.next(true)
        } else {
            this.windowObserver.next(false)
        }
    }
}