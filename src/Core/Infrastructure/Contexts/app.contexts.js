import {createContext} from "@lit/context";
import {ContextKeys} from "../Util/app-key.env.js";

export class AppContexts {
    static journeyContext = createContext(Symbol(ContextKeys.JOURNEY_CONTEXT_KEY));
    static appContext = createContext(Symbol(ContextKeys.APP_CONTEXT_KEY));
}