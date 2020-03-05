import { h } from "hyperapp";  // JSX will be turned into "h" by rollup
import { Screen, O2Percentage, O2CleanWarning } from "./base";


function depth_to_bar(m) {
    return (m / 10) + 1;
}
function bar_to_depth(b) {
    return (b - 1) * 10;
}
const O2 = () => (<span>O<sub>2</sub></span>);

/* ================================================================= *\
 * MOD Calculator
\* ================================================================= */

const MaxOperatingDepth = ({state}) => (
    <Screen title={"Max Operating Depth"} notice={<O2CleanWarning fo2={state.mod.fo2} />}>
        <h2>
            EAN <O2/> Level: <O2Percentage fo2={state.mod.fo2} />
        </h2>

        <input
            type={"range"}
            min={state.settings.min_fo2}
            max={state.settings.max_fo2}
            value={state.mod.fo2}
            step={0.01}
            onInput={(state, event) => ({
                ...state, mod: {fo2: parseFloat(event.target.value)}
            })}
        />
        <h2>Max Operating Depth: {Math.floor(((state.settings.max_ppo2 / state.mod.fo2) - 1) * 10)}m</h2>
        <p>Max Operating Pressure: {Math.floor(state.settings.max_ppo2 / state.mod.fo2 * 10)/10}bar</p>
        <p>(Using max pP<O2/> = {state.settings.max_ppo2}bar)</p>
    </Screen>
);

const BestMix = ({state}) => (
    <Screen title={"Best Mix for Depth"} notice={<O2CleanWarning fo2={state.settings.max_ppo2 / depth_to_bar(state.best_mix.mod)} />}>
        <h2>Max Operating Depth: {state.best_mix.mod}m</h2>
        <input
            type={"range"}
            min={25}
            max={56}
            value={state.best_mix.mod}
            onInput={(state, event) => ({
                ...state, best_mix: {mod: parseInt(event.target.value)}
            })}
        />
        <h2>
            Max EAN <O2/> Level: <O2Percentage fo2={state.settings.max_ppo2 / depth_to_bar(state.best_mix.mod)} />
        </h2>
        <p>Max Operating Pressure: {Math.floor(depth_to_bar(state.best_mix.mod)*10)/10}bar</p>
        <p>(Using max pP<O2/> = {state.settings.max_ppo2}bar)</p>
    </Screen>
);


/* ================================================================= *\
 * Continuous Blending Calculator
\* ================================================================= */

/*
 * To go from (have_bar * have_ean) to (want_bar * want_ean), set the
 * nitrox compressor to output this percentage, and top up to want_bar.
 */
function nitrox_top_up(have_bar, have_fo2, want_bar, want_fo2) {
    const need_bar = want_bar - have_bar;
    const have_o2 = have_bar * have_fo2;
    const want_o2 = want_bar * want_fo2;
    const need_o2 = want_o2 - have_o2;
    return need_o2 / need_bar;
}

const NitroxHave = ({state}) => (
    <div>
        <h2>
            Have: {state.nitrox_blend.have_bar}bar
            @ <O2Percentage fo2={state.nitrox_blend.have_fo2} /> <O2/>
        </h2>
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
                    have_bar: parseInt(event.target.value),
                    want_bar: Math.max(state.nitrox_blend.want_bar, parseInt(event.target.value)),
                }
            })}
        />
        <input
            type={"range"}
            min={state.settings.min_fo2}
            max={state.settings.max_fo2}
            step={0.01}
            value={state.nitrox_blend.have_fo2}
            onInput={(state, event) => ({
                ...state,
                nitrox_blend: {
                    ...state.nitrox_blend,
                    have_fo2: parseFloat(event.target.value),
                }
            })}
        />
    </div>
);

const NitroxWant = ({state}) => (
    <div>
        <h2>
            Want: {state.nitrox_blend.want_bar}bar
            @ <O2Percentage fo2={state.nitrox_blend.want_fo2} /> <O2/>
        </h2>
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
                    want_bar: parseInt(event.target.value),
                    have_bar: Math.min(state.nitrox_blend.have_bar, parseInt(event.target.value)),
                }
            })}
        />
        <input
            type={"range"}
            min={state.settings.min_fo2}
            max={state.settings.max_fo2}
            step={0.01}
            value={state.nitrox_blend.want_fo2}
            onInput={(state, event) => ({
                ...state,
                nitrox_blend: {
                    ...state.nitrox_blend,
                    want_fo2: parseFloat(event.target.value),
                }
            })}
        />
    </div>
);

const NitroxTopUp = ({state}) => (
    <div>
        <h2>Topping up with: <O2Percentage fo2={state.nitrox_blend.topup_fo2} /> <O2/></h2>
        <input
            type={"range"}
            min={state.settings.min_fo2}
            max={state.settings.max_fo2}
            step={0.01}
            value={state.nitrox_blend.topup_fo2}
            onInput={(state, event) => ({
                ...state,
                nitrox_blend: {
                    ...state.nitrox_blend,
                    topup_fo2: parseFloat(event.target.value),
                }
            })}
        />
    </div>
);

const ContinuousNitroxBlend = ({state}) => (
    <Screen title={"Continuous Blend"} notice={<O2CleanWarning fo2={Math.max(state.nitrox_blend.have_fo2, state.nitrox_blend.want_fo2)} />}>
        <NitroxHave state={state} />
        <NitroxWant state={state} />
        <h2>
            Need: {state.nitrox_blend.want_bar - state.nitrox_blend.have_bar}bar
            @ <O2Percentage fo2={nitrox_top_up(
                state.nitrox_blend.have_bar,
                state.nitrox_blend.have_fo2,
                state.nitrox_blend.want_bar,
                state.nitrox_blend.want_fo2
            )} /> <O2/>
        </h2>
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
function o2_top_up(s) {
    // based on how much n2 we have now, how much we plan to have
    // at the end, and how much we're filling with - figure out
    // how much filling we need to do.
    const have_ppn2 = (s.have_bar * (1 - s.have_fo2));
    const want_ppn2 = (s.want_bar * (1 - s.want_fo2));
    const need_ppn2 = want_ppn2 - have_ppn2;
    const need_fill_bar = need_ppn2 / (1 - s.topup_fo2);

    // Looking at how much filling we need to do, figure out how
    // much o2 that fill contains. If we still need more o2, then
    // fill up the gap with pure o2.
    const have_ppo2 = (s.have_bar * s.have_fo2);
    const want_ppo2 = (s.want_bar * s.want_fo2);
    const ppo2_from_fill = need_fill_bar * s.topup_fo2;
    return Math.floor(want_ppo2 - have_ppo2 - ppo2_from_fill);
}

const PartialPressureNitroxBlend = ({state}) => (
    <Screen title={"Partial Pressure Blend"}>
        <NitroxHave state={state} />
        <NitroxWant state={state} />
        <NitroxTopUp state={state} />
        <h2>
            { (state.nitrox_blend.want_bar - state.nitrox_blend.have_bar) >= o2_top_up(state.nitrox_blend) && o2_top_up(state.nitrox_blend) >= 0 ?
                <span>
                    Add {o2_top_up(state.nitrox_blend)}bar of <O2Percentage fo2={1.0} /> <O2/>
                    <br/>Add {state.nitrox_blend.want_bar - state.nitrox_blend.have_bar - o2_top_up(state.nitrox_blend)}bar
                    of <O2Percentage fo2={state.nitrox_blend.topup_fo2} /> <O2/>
                </span> :
                <span>Can't do this fill :(<br/>&nbsp;</span>
            }

        </h2>
    </Screen>
);


/* ================================================================= *\
 * Equivalent Air Depth
\* ================================================================= */

function ead(depth, fo2) {
    const pressure = depth_to_bar(depth);
    const fn2 = (1.0 - fo2);
    const ppn2 = fn2 * pressure;
    const equivalent_air_pressure = ppn2 / 0.79;
    return bar_to_depth(equivalent_air_pressure);
}

const EquivalentAirDepth = ({state}) => (
    <Screen title={"Equivalent Air Depth"}>
        <h2>Depth: {state.ead.depth}m</h2>
        <input
            type={"range"}
            min={0}
            max={100}
            value={state.ead.depth}
            onInput={(state, event) => ({
                ...state, ead: {...state.ead, depth: parseInt(event.target.value)}
            })}
        />
        <h2>Mix: <O2Percentage fo2={state.ead.fo2} /> <O2 /></h2>
        <input
            type={"range"}
            min={state.settings.min_fo2}
            max={state.settings.max_fo2}
            step={0.01}
            value={state.ead.fo2}
            onInput={(state, event) => ({
                ...state, ead: {...state.ead, fo2: parseFloat(event.target.fo2)}
            })}
        />
        <h2>Equivalent Air Depth: {Math.round(ead(state.ead.depth, state.ead.fo2))}m</h2>
    </Screen>
);

export {ContinuousNitroxBlend, PartialPressureNitroxBlend, MaxOperatingDepth, BestMix, EquivalentAirDepth};