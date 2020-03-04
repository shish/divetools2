import { h } from "hyperapp";  // JSX will be turned into "h" by rollup
import { Screen, O2Percentage } from "./base";


/* ================================================================= *\
 * MOD Calculator
\* ================================================================= */

const NitroxCalc = ({state}) => (
    <Screen title={"MOD Calculator"}>
        <table className={"blend"}>
            <tr>
                <td>EAN:</td>
                <td><input
                    type={"range"} min={21} max={40} value={state.nitrox_calc.ean}
                    onInput={(state, event) => ({
                        ...state,
                        nitrox_calc: {
                            ean: event.target.value,
                            mod: ((state.nitrox_calc.ppo2 / (event.target.value / 100)) - 1) * 10,
                            ppo2: state.nitrox_calc.ppo2,
                        }
                    })}
                /></td>
                <td>{Math.floor(state.nitrox_calc.ean)}%</td>
            </tr>
            <tr>
                <td>MOD:</td>
                <td><input
                    type={"range"} min={25} max={55} value={state.nitrox_calc.mod}
                    onInput={(state, event) => ({
                        ...state,
                        nitrox_calc: {
                            ean: (state.nitrox_calc.ppo2 / (event.target.value / 10 + 1)) * 100,
                            mod: event.target.value,
                            ppo2: state.nitrox_calc.ppo2,
                        }
                    })}
                /></td>
                <td>{Math.floor(state.nitrox_calc.mod)}</td>
            </tr>
            <tr>
                <td>pPO<sub>2</sub>:</td>
                <td><input
                    type={"range"} min={1.3} max={1.6} step={0.1} value={state.nitrox_calc.ppo2}
                    onInput={(state, event) => ({
                        ...state,
                        nitrox_calc: {
                            ean: state.nitrox_calc.ean,
                            mod: ((event.target.value / (state.nitrox_calc.ean / 100)) - 1) * 10,
                            ppo2: event.target.value,
                        }
                    })}
                /></td>
                <td>{state.nitrox_calc.ppo2}</td>
            </tr>
        </table>
    </Screen>
);


/* ================================================================= *\
 * Continuous Blending Calculator
\* ================================================================= */

/*
 * To go from (have_bar * have_ean) to (want_bar * want_ean), set the
 * nitrox compressor to output this percentage, and top up to want_bar.
 */
function nitrox_top_up(have_bar, have_ean, want_bar, want_ean) {
    const need_bar = want_bar - have_bar;
    const have_o2 = have_bar * (have_ean/100);
    const want_o2 = want_bar * (want_ean/100);
    const need_o2 = want_o2 - have_o2;
    return Math.floor((need_o2 / need_bar) * 100);
}

const ContinuousNitroxBlend = ({state}) => (
    <Screen title={"Nitrox Blend"}>
        <table className={"blend"}>
            <tr>
                <td>Have</td>
                <td>
                    <input
                        type={"range"}
                        min={0}
                        max={state.settings.max_tank_pressure}
                        step={state.settings.tank_pressure_step}
                        value={state.nitrox_blend.have_bar}
                        onInput={(state, event) => ({
                            ...state,
                            nitrox_blend: {
                                ...state.nitrox_blend,
                                have_bar: event.target.value,
                                want_bar: Math.max(state.nitrox_blend.want_bar, event.target.value)
                            }
                        })}
                    />
                </td>
                <td>{state.nitrox_blend.have_bar}bar</td>
            </tr>
            <tr>
                <td>@</td>
                <td>
                    <input
                        type={"range"}
                        min={state.settings.min_o2}
                        max={state.settings.max_o2}
                        value={state.nitrox_blend.have_ean}
                        onInput={(state, event) => ({
                            ...state,
                            nitrox_blend: {
                                ...state.nitrox_blend,
                                have_ean: event.target.value,
                            }
                        })}
                    />
                </td>
                <td>{state.nitrox_blend.have_ean}%</td>
            </tr>

            <tr>
                <td>Want</td>
                <td>
                    <input
                        type={"range"}
                        min={0}
                        max={state.settings.max_tank_pressure}
                        step={state.settings.tank_pressure_step}
                        value={state.nitrox_blend.want_bar}
                        onInput={(state, event) => ({
                            ...state,
                            nitrox_blend: {
                                ...state.nitrox_blend,
                                want_bar: event.target.value,
                            }
                        })}
                    />
                </td>
                <td>{state.nitrox_blend.want_bar}bar</td>
            </tr>
            <tr>
                <td>@</td>
                <td>
                    <input
                        type={"range"}
                        min={state.settings.min_o2}
                        max={state.settings.max_o2}
                        value={state.nitrox_blend.want_ean}
                        onInput={(state, event) => ({
                            ...state,
                            nitrox_blend: {
                                ...state.nitrox_blend,
                                want_ean: event.target.value,
                            }
                        })}
                    />
                </td>
                <td>{state.nitrox_blend.want_ean}%</td>
            </tr>

            <tr>
                <td>Need</td>
                <td>
                    {state.nitrox_blend.want_bar - state.nitrox_blend.have_bar}bar
                    @ <O2Percentage value={nitrox_top_up(
                    state.nitrox_blend.have_bar,
                    state.nitrox_blend.have_ean,
                    state.nitrox_blend.want_bar,
                    state.nitrox_blend.want_ean
                )} />
                </td>
                <td></td>
            </tr>
        </table>
    </Screen>
);


/* ================================================================= *\
 * Partial Pressure Blending Calculator
\* ================================================================= */

/*
 * final_o2% - topup_o2%
 * ---------------------  * fill_pressure = fill o2 pressure
 *        topup_n2%
 */
function o2_top_up() {

}


export {ContinuousNitroxBlend, NitroxCalc};