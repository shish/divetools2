import {h} from "hyperapp";  // JSX will be turned into "h" by rollup
import { HistoryPush } from "hyperapp-fx";

function saveStateAndGoBack(state: State) {
    state = {...state, screen: null};
    console.log("Saving state: ", state);
    window.localStorage.setItem("state", JSON.stringify(state));
    return [state, HistoryPush({state})];
}

export const BackButton = () => (
    <a className={"button"} onclick={saveStateAndGoBack}>Back</a>
);

export const Screen = (
    {title, notice, blank=true, footer = [<BackButton />]}:
        {title: string; notice?: any; blank?: boolean; footer?: Array<any>},
    children
) => (
    <main>
        <header>
            <h1>{title}</h1>
        </header>
        <article className={blank ? "blank" : null}>
            <div style={{position: "absolute", top: 0, left: 0, right: 0}}>{notice}</div>
            {children}
        </article>
        {footer ? <footer>{footer}</footer> : null}
    </main>
);

export const O2Percentage = ({fo2}: {fo2: Fraction}) => (
    <span className={fo2 > 1.0 ? "error" : (fo2 > 0.4 ? "warning" : "ok")}>{Math.round(fo2 * 100)}%</span>
);

export const O2CleanWarning = ({fo2}: {fo2: Fraction}) => (
    fo2 > 0.4 ? <div style={{color: "orange"}}>(O<sub>2</sub> over 40% requires oxygen-serviced equipment)</div> : null
);

export const O2 = () => (<span>O<sub>2</sub></span>);
