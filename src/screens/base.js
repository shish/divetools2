import { h } from "hyperapp";  // JSX will be turned into "h" by rollup

function saveStateAndGoBack(state) {
    state = {...state, screen: null};
    console.log("Saving state: ", state);
    window.localStorage.setItem("state", JSON.stringify(state));
    return state;
}

const Screen = ({title, extraNav}, children) => (
    <div className={"screen"}>
        <header>
            <a className={"back"} onClick={saveStateAndGoBack}>Back</a>
            <span>{title}</span>
            {extraNav ? extraNav : <a />}
        </header>
        <article>
            {children}
        </article>
        <footer>

        </footer>
    </div>
);

const O2Percentage = ({value}) => (
    <span style={{color: value > 100 ? "red" : (value > 40 ? "orange" : "black")}}>{value}%</span>
);

export { Screen, O2Percentage };