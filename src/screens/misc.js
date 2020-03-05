import { h } from "hyperapp";  // JSX will be turned into "h" by rollup
import { Screen, O2Percentage } from "./base";


/* ================================================================= *\
 * Settings
\* ================================================================= */

function resetSettings(state) {
    console.log("Removing state from localStorage");
    window.localStorage.removeItem("state");
    window.location.reload();
    return null;
}

const ResetButton = () => (
    <a onClick={resetSettings}>Reset</a>
);

const Settings = ({state}) => (
    <Screen title={"Settings"} extraNav={<ResetButton />}>
        <table className={"blend"}>
            <tr>
                <td>Min O<sub>2</sub></td>
                <td>
                    <input
                        type={"range"}
                        min={0}
                        max={1}
                        step={0.01}
                        value={state.settings.min_fo2}
                        onInput={(state, event) => ({
                            ...state,
                            settings: {
                                ...state.settings,
                                min_fo2: parseFloat(event.target.value),
                                max_fo2: Math.max(state.settings.max_fo2, parseFloat(event.target.value))
                            }
                        })}
                    />
                </td>
                <td><O2Percentage fo2={state.settings.min_fo2} /></td>
            </tr>
            <tr>
                <td>Max O<sub>2</sub></td>
                <td>
                    <input
                        type={"range"}
                        min={0}
                        max={1}
                        step={0.01}
                        value={state.settings.max_fo2}
                        onInput={(state, event) => ({
                            ...state,
                            settings: {
                                ...state.settings,
                                max_fo2: parseFloat(event.target.value),
                                min_fo2: Math.min(state.settings.min_fo2, parseFloat(event.target.value))
                            }
                        })}
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
                        onInput={(state, event) => ({
                            ...state,
                            settings: {
                                ...state.settings,
                                tank_pressure_step: parseInt(event.target.value),
                            }
                        })}
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
                        onInput={(state, event) => ({
                            ...state,
                            settings: {
                                ...state.settings,
                                max_tank_pressure: parseInt(event.target.value),
                            }
                        })}
                    />
                </td>
                <td>{state.settings.max_tank_pressure}bar</td>
            </tr>
            <tr>
                <td>Max pPO<sub>2</sub>:</td>
                <td><input
                    type={"range"} min={1.3} max={1.6} step={0.1} value={state.settings.max_ppo2}
                    onInput={(state, event) => ({
                        ...state,
                        settings: {
                            ...state.settings,
                            max_ppo2: parseFloat(event.target.value),
                        }
                    })}
                /></td>
                <td>{state.settings.max_ppo2}bar</td>
            </tr>
        </table>
    </Screen>
);


/* ================================================================= *\
 * Donate
\* ================================================================= */

const Donate = ({state}) => (
    <Screen title={"Donate"}>
        <a className={"donate"} href={"https://paypal.me/shish2k"}>PayPal</a>
    </Screen>
);

export { Settings, Donate };