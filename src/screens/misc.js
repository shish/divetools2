import { h } from "hyperapp";  // JSX will be turned into "h" by rollup
import { Screen, O2Percentage } from "./base";

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
                        max={100}
                        step={1}
                        value={state.settings.min_o2}
                        onInput={(state, event) => ({
                            ...state,
                            settings: {
                                ...state.settings,
                                min_o2: event.target.value,
                                max_o2: Math.max(state.settings.max_o2, event.target.value)
                            }
                        })}
                    />
                </td>
                <td><O2Percentage value={state.settings.min_o2} /></td>
            </tr>
            <tr>
                <td>Max O<sub>2</sub></td>
                <td>
                    <input
                        type={"range"}
                        min={0}
                        max={100}
                        step={1}
                        value={state.settings.max_o2}
                        onInput={(state, event) => ({
                            ...state,
                            settings: {
                                ...state.settings,
                                max_o2: event.target.value,
                                min_o2: Math.min(state.settings.min_o2, event.target.value)
                            }
                        })}
                    />
                </td>
                <td><O2Percentage value={state.settings.max_o2} /></td>
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
                                tank_pressure_step: event.target.value,
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
                                max_tank_pressure: event.target.value,
                            }
                        })}
                    />
                </td>
                <td>{state.settings.max_tank_pressure}bar</td>
            </tr>
        </table>
    </Screen>
);

const Donate = ({state}) => (
    <Screen title={"Donate"}>
        <a className={"donate"} href={"https://paypal.me/shish2k"}>PayPal</a>
    </Screen>
);

export { Settings, Donate };