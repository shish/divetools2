import { h } from "hyperapp";  // JSX will be turned into "h" by rollup

function saveStateAndGoBack(state) {
    state = {...state, screen: null};
    console.log("Saving state: ", state);
    window.localStorage.setItem("state", JSON.stringify(state));
    return state;
}

const Screen = ({title, notice, extraNav, footer}, children) => (
    <div className={"screen"}>
        <header>
            <h1>{title}</h1>
        </header>
        <article>
            <div style={{position: "absolute", top: 0, left: 0, right: 0}}>{notice}</div>
            {children}
        </article>
        {footer === false ? null :
            <footer>
                <a className={"back"} onClick={saveStateAndGoBack}>Back</a>
                {extraNav ? extraNav : <a />}
            </footer>
        }
    </div>
);

const O2Percentage = ({fo2}) => (
    <span style={{color: fo2 > 1.0 ? "red" : (fo2 > 0.4 ? "orange" : "black")}}>{parseInt(fo2 * 100)}%</span>
);

const O2CleanWarning = ({fo2}) => (
    fo2 > 0.4 ? <div style={{color: "orange"}}>(O<sub>2</sub> over 40% requires oxygen-serviced equipment)</div> : null
);

export { Screen, O2Percentage, O2CleanWarning };