import {h} from "hyperapp";  // JSX will be turned into "h" by rollup
import {Screen, O2Percentage, O2, BackButton} from "./base";


/* ================================================================= *\
 * Settings
\* ================================================================= */

function resetSettings() {
    console.log("Removing state from localStorage");
    window.localStorage.removeItem("state");
    window.location.reload();
    return null;
}

const ResetButton = () => (
    <a class={"button"} onClick={resetSettings}>Reset</a>
);

export const Settings = ({state}: {state: State}) => (
    <Screen title={"Settings"} footer={[<BackButton/>, <ResetButton />]}>
        <table className={"settings"}>
            <tr>
                <td>Min <O2/></td>
                <td>
                    <input
                        type={"range"}
                        min={0}
                        max={1}
                        step={0.01}
                        value={state.settings.min_fo2}
                        onInput={(state: State, event: MyInputEvent) => ({
                            ...state,
                            settings: {
                                ...state.settings,
                                min_fo2: parseFloat(event.target.value),
                                max_fo2: Math.max(state.settings.max_fo2, parseFloat(event.target.value))
                            }
                        } as State)}
                    />
                </td>
                <td><O2Percentage fo2={state.settings.min_fo2} /></td>
            </tr>
            <tr>
                <td>Max <O2/></td>
                <td>
                    <input
                        type={"range"}
                        min={0}
                        max={1}
                        step={0.01}
                        value={state.settings.max_fo2}
                        onInput={(state: State, event: MyInputEvent) => ({
                            ...state,
                            settings: {
                                ...state.settings,
                                max_fo2: parseFloat(event.target.value),
                                min_fo2: Math.min(state.settings.min_fo2, parseFloat(event.target.value))
                            }
                        } as State)}
                    />
                </td>
                <td><O2Percentage fo2={state.settings.max_fo2} /></td>
            </tr>
            <tr>
                <td>Tank&nbsp;Pressure<br />Step Size</td>
                <td>
                    <input
                        type={"range"}
                        min={0}
                        max={10}
                        step={1}
                        value={state.settings.tank_pressure_step}
                        onInput={(state: State, event: MyInputEvent) => ({
                            ...state,
                            settings: {
                                ...state.settings,
                                tank_pressure_step: parseInt(event.target.value),
                            }
                        } as State)}
                    />
                </td>
                <td>{state.settings.tank_pressure_step}bar</td>
            </tr>
            <tr>
                <td>Tank&nbsp;Pressure<br />Limit</td>
                <td>
                    <input
                        type={"range"}
                        min={0}
                        max={300}
                        step={state.settings.tank_pressure_step}
                        value={state.settings.max_tank_pressure}
                        onInput={(state: State, event: MyInputEvent) => ({
                            ...state,
                            settings: {
                                ...state.settings,
                                max_tank_pressure: parseInt(event.target.value),
                            }
                        } as State)}
                    />
                </td>
                <td>{state.settings.max_tank_pressure}bar</td>
            </tr>
            <tr>
                <td>Max pP<O2/>:</td>
                <td><input
                    type={"range"} min={1.3} max={1.6} step={0.1} value={state.settings.max_ppo2}
                    oninput={(state: State, event: MyInputEvent) => ({
                        ...state,
                        settings: {
                            ...state.settings,
                            max_ppo2: parseFloat(event.target.value),
                        }
                    } as State)}
                /></td>
                <td>{state.settings.max_ppo2}bar</td>
            </tr>
            <tr>
                <td>Max Depth:</td>
                <td><input
                    type={"range"} min={0} max={120} step={1} value={state.settings.max_depth}
                    oninput={(state: State, event: MyInputEvent) => ({
                        ...state,
                        settings: {
                            ...state.settings,
                            max_depth: parseInt(event.target.value),
                        }
                    } as State)}
                /></td>
                <td>{state.settings.max_depth}m</td>
            </tr>
            <tr>
                <td>Max Time:</td>
                <td><input
                    type={"range"} min={0} max={180} step={1} value={state.settings.max_time}
                    oninput={(state: State, event: MyInputEvent) => ({
                        ...state,
                        settings: {
                            ...state.settings,
                            max_time: parseInt(event.target.value),
                        }
                    } as State)}
                /></td>
                <td>{state.settings.max_time}min</td>
            </tr>
        </table>
    </Screen>
);


/* ================================================================= *\
 * Donate
\* ================================================================= */

export const About = () => (
    <Screen title={"About"}>
        <h2>
            Created by Shish
        </h2>
        <p>
            Ocean background
            by <a href={"https://commons.wikimedia.org/w/index.php?curid=20284104"}>Vanesa camaño</a>
            <br/>- CC BY-SA 3.0
        </p>
        <p className={"donate"}>
            If you like this app and find it useful,
            <br/>feel free to donate
            via <a href={"https://paypal.me/shish2k"}>PayPal</a>
        </p>
    </Screen>
);