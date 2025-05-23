import h from "hyperapp-jsx-pragma";
import { O2, O2Percentage, Screen } from "./base";
import { default_settings } from "../divetools";

/* ================================================================= *\
 * Settings
\* ================================================================= */

function saveSettings(state, event) {
    event.preventDefault();
    window.localStorage.setItem("settings", JSON.stringify(state.settings));
    return state;
}
function resetSettings(state, event) {
    event.preventDefault();
    window.localStorage.setItem("settings", JSON.stringify(default_settings));
    return { ...state, settings: { ...default_settings } };
}

const SaveButton = () => (
    <a class={"button"} onclick={saveSettings} href={"/"}>
        Back
    </a>
);
const ResetButton = () => (
    <a class={"button"} onclick={resetSettings}>
        Reset
    </a>
);

export const Settings = (state: State) => (
    <Screen title={"Settings"} footer={[<SaveButton />, <ResetButton />]}>
        <table className={"settings"}>
            <tr>
                <td>
                    Min <O2 />
                </td>
                <td>
                    <input
                        type={"range"}
                        min={0}
                        max={1}
                        step={0.01}
                        value={state.settings.min_fo2}
                        oninput={(state: State, event: MyInputEvent) =>
                            ({
                                ...state,
                                settings: {
                                    ...state.settings,
                                    min_fo2: event.target.valueAsNumber,
                                    max_fo2: Math.max(
                                        state.settings.max_fo2,
                                        event.target.valueAsNumber,
                                    ),
                                },
                            } as State)
                        }
                    />
                </td>
                <td>
                    <O2Percentage fo2={state.settings.min_fo2} />
                </td>
            </tr>
            <tr>
                <td>
                    Max <O2 />
                </td>
                <td>
                    <input
                        type={"range"}
                        min={0}
                        max={1}
                        step={0.01}
                        value={state.settings.max_fo2}
                        oninput={(state: State, event: MyInputEvent) =>
                            ({
                                ...state,
                                settings: {
                                    ...state.settings,
                                    max_fo2: event.target.valueAsNumber,
                                    min_fo2: Math.min(
                                        state.settings.min_fo2,
                                        event.target.valueAsNumber,
                                    ),
                                },
                            } as State)
                        }
                    />
                </td>
                <td>
                    <O2Percentage fo2={state.settings.max_fo2} />
                </td>
            </tr>
            <tr>
                <td>
                    Tank&nbsp;Pressure
                    <br />
                    Step Size
                </td>
                <td>
                    <input
                        type={"range"}
                        min={0}
                        max={10}
                        step={1}
                        value={state.settings.tank_pressure_step}
                        oninput={(state: State, event: MyInputEvent) =>
                            ({
                                ...state,
                                settings: {
                                    ...state.settings,
                                    tank_pressure_step: parseInt(
                                        event.target.value,
                                    ),
                                },
                            } as State)
                        }
                    />
                </td>
                <td>{state.settings.tank_pressure_step}bar</td>
            </tr>
            <tr>
                <td>
                    Tank&nbsp;Pressure
                    <br />
                    Limit
                </td>
                <td>
                    <input
                        type={"range"}
                        min={100}
                        max={300}
                        step={state.settings.tank_pressure_step}
                        value={state.settings.max_tank_pressure}
                        oninput={(state: State, event: MyInputEvent) =>
                            ({
                                ...state,
                                settings: {
                                    ...state.settings,
                                    max_tank_pressure: parseInt(
                                        event.target.value,
                                    ),
                                },
                            } as State)
                        }
                    />
                </td>
                <td>{state.settings.max_tank_pressure}bar</td>
            </tr>
            <tr>
                <td>
                    Max pP
                    <O2 />:
                </td>
                <td>
                    <input
                        type={"range"}
                        min={1.3}
                        max={1.6}
                        step={0.1}
                        value={state.settings.max_ppo2}
                        oninput={(state: State, event: MyInputEvent) =>
                            ({
                                ...state,
                                settings: {
                                    ...state.settings,
                                    max_ppo2: event.target.valueAsNumber,
                                },
                            } as State)
                        }
                    />
                </td>
                <td>{state.settings.max_ppo2}bar</td>
            </tr>
            <tr>
                <td>Max Depth:</td>
                <td>
                    <input
                        type={"range"}
                        min={0}
                        max={120}
                        step={1}
                        value={state.settings.max_depth}
                        oninput={(state: State, event: MyInputEvent) =>
                            ({
                                ...state,
                                settings: {
                                    ...state.settings,
                                    max_depth: event.target.valueAsNumber,
                                },
                            } as State)
                        }
                    />
                </td>
                <td>{state.settings.max_depth}m</td>
            </tr>
            <tr>
                <td>Max Time:</td>
                <td>
                    <input
                        type={"range"}
                        min={0}
                        max={180}
                        step={1}
                        value={state.settings.max_time}
                        oninput={(state: State, event: MyInputEvent) =>
                            ({
                                ...state,
                                settings: {
                                    ...state.settings,
                                    max_time: event.target.valueAsNumber,
                                },
                            } as State)
                        }
                    />
                </td>
                <td>{state.settings.max_time}min</td>
            </tr>
        </table>
    </Screen>
);
