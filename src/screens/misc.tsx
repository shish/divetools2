import {h} from "hyperapp";  // JSX will be turned into "h" by rollup
import {Screen, O2Percentage, O2} from "./base";
import {State} from "../state";


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
    <Screen title={"Settings"} extraNav={<ResetButton />}>
        <table className={"blend"}>
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
                    onInput={(state: State, event: MyInputEvent) => ({
                        ...state,
                        settings: {
                            ...state.settings,
                            max_ppo2: parseFloat(event.target.value),
                        }
                    } as State)}
                /></td>
                <td>{state.settings.max_ppo2}bar</td>
            </tr>
        </table>
    </Screen>
);


/* ================================================================= *\
 * Donate
\* ================================================================= */

export const Donate = () => (
    <Screen title={"Donate"}>
        <a className={"donate"} href={"https://paypal.me/shish2k"}>PayPal</a>
    </Screen>
);