import h from "hyperapp-jsx-pragma";
import { O2, O2CleanWarning, O2Percentage, Screen } from "./base";

/* ================================================================= *\
 * Continuous Blending Calculator
\* ================================================================= */

/*
 * To go from (have_bar * have_ean) to (want_bar * want_ean), set the
 * nitrox compressor to output this percentage, and top up to want_bar.
 */
function nitrox_top_up(
    have_bar: Bar,
    have_fo2: Fraction,
    want_bar: Bar,
    want_fo2: Fraction,
): Fraction {
    const need_bar = want_bar - have_bar;
    const have_o2 = have_bar * have_fo2;
    const want_o2 = want_bar * want_fo2;
    const need_o2 = want_o2 - have_o2;
    return (need_o2 / need_bar) as Fraction;
}

const NitroxHave = ({ state }: { state: State }) => (
    <div>
        <h2>
            Have: {state.nitrox_blend.have_bar}bar @{" "}
            <O2Percentage fo2={state.nitrox_blend.have_fo2} /> <O2 />
        </h2>
        <input
            type={"range"}
            min={0}
            max={state.settings.max_tank_pressure}
            step={state.settings.tank_pressure_step}
            value={state.nitrox_blend.have_bar}
            oninput={(state: State, event: MyInputEvent) =>
                ({
                    ...state,
                    nitrox_blend: {
                        ...state.nitrox_blend,
                        have_bar: parseInt(event.target.value),
                        want_bar: Math.max(
                            state.nitrox_blend.want_bar,
                            parseInt(event.target.value),
                        ),
                    },
                } as State)
            }
        />
        <input
            type={"range"}
            min={state.settings.min_fo2}
            max={state.settings.max_fo2}
            step={0.01}
            value={state.nitrox_blend.have_fo2}
            oninput={(state: State, event: MyInputEvent) =>
                ({
                    ...state,
                    nitrox_blend: {
                        ...state.nitrox_blend,
                        have_fo2: parseFloat(event.target.value),
                    },
                } as State)
            }
        />
    </div>
);

const NitroxWant = ({ state }: { state: State }) => (
    <div>
        <h2>
            Want: {state.nitrox_blend.want_bar}bar @{" "}
            <O2Percentage fo2={state.nitrox_blend.want_fo2} /> <O2 />
        </h2>
        <input
            type={"range"}
            min={0}
            max={state.settings.max_tank_pressure}
            step={state.settings.tank_pressure_step}
            value={state.nitrox_blend.want_bar}
            oninput={(state: State, event: MyInputEvent) =>
                ({
                    ...state,
                    nitrox_blend: {
                        ...state.nitrox_blend,
                        want_bar: parseInt(event.target.value),
                        have_bar: Math.min(
                            state.nitrox_blend.have_bar,
                            parseInt(event.target.value),
                        ),
                    },
                } as State)
            }
        />
        <input
            type={"range"}
            min={state.settings.min_fo2}
            max={state.settings.max_fo2}
            step={0.01}
            value={state.nitrox_blend.want_fo2}
            oninput={(state: State, event: MyInputEvent) =>
                ({
                    ...state,
                    nitrox_blend: {
                        ...state.nitrox_blend,
                        want_fo2: parseFloat(event.target.value),
                    },
                } as State)
            }
        />
    </div>
);

const NitroxTopUp = ({ state }: { state: State }) => (
    <div>
        <h2>
            Topping up with: <O2Percentage fo2={state.nitrox_blend.topup_fo2} />{" "}
            <O2 />
        </h2>
        <input
            type={"range"}
            min={state.settings.min_fo2}
            max={state.settings.max_fo2}
            step={0.01}
            value={state.nitrox_blend.topup_fo2}
            oninput={(state: State, event: MyInputEvent) =>
                ({
                    ...state,
                    nitrox_blend: {
                        ...state.nitrox_blend,
                        topup_fo2: parseFloat(event.target.value),
                    },
                } as State)
            }
        />
    </div>
);

export const ContinuousNitroxBlend = (state: State) => (
    <Screen
        title={"Continuous Blend"}
        notice={
            <O2CleanWarning
                fo2={
                    Math.max(
                        state.nitrox_blend.have_fo2,
                        state.nitrox_blend.want_fo2,
                    ) as Fraction
                }
            />
        }
    >
        <NitroxHave state={state} />
        <NitroxWant state={state} />
        <h2>
            Need: {state.nitrox_blend.want_bar - state.nitrox_blend.have_bar}bar
            @{" "}
            <O2Percentage
                fo2={nitrox_top_up(
                    state.nitrox_blend.have_bar,
                    state.nitrox_blend.have_fo2,
                    state.nitrox_blend.want_bar,
                    state.nitrox_blend.want_fo2,
                )}
            />{" "}
            <O2 />
        </h2>
    </Screen>
);

/* ================================================================= *\
 * Partial Pressure Blending Calculator
\* ================================================================= */

/**
 * final_o2% - topup_o2%
 * ---------------------  * fill_pressure = fill o2 pressure
 *        topup_n2%
 */
function o2_top_up(s): Bar {
    // based on how much n2 we have now, how much we plan to have
    // at the end, and how much we're filling with - figure out
    // how much filling we need to do.
    const have_ppn2 = s.have_bar * (1 - s.have_fo2);
    const want_ppn2 = s.want_bar * (1 - s.want_fo2);
    const need_ppn2 = want_ppn2 - have_ppn2;
    const need_fill_bar = need_ppn2 / (1 - s.topup_fo2);

    // Looking at how much filling we need to do, figure out how
    // much o2 that fill contains. If we still need more o2, then
    // fill up the gap with pure o2.
    const have_ppo2 = s.have_bar * s.have_fo2;
    const want_ppo2 = s.want_bar * s.want_fo2;
    const ppo2_from_fill = need_fill_bar * s.topup_fo2;
    return Math.floor(want_ppo2 - have_ppo2 - ppo2_from_fill) as Bar;
}

export const PartialPressureNitroxBlend = (state: State) => (
    <Screen title={"Partial Pressure Blend"}>
        <NitroxHave state={state} />
        <NitroxWant state={state} />
        <NitroxTopUp state={state} />
        <h2>
            {state.nitrox_blend.want_bar - state.nitrox_blend.have_bar >=
                o2_top_up(state.nitrox_blend) &&
            o2_top_up(state.nitrox_blend) >= 0 ? (
                <span>
                    Add {o2_top_up(state.nitrox_blend)}bar of{" "}
                    <O2Percentage fo2={1.0 as Fraction} /> <O2 />
                    <br />
                    Add{" "}
                    {state.nitrox_blend.want_bar -
                        state.nitrox_blend.have_bar -
                        o2_top_up(state.nitrox_blend)}
                    bar of <O2Percentage fo2={state.nitrox_blend.topup_fo2} />{" "}
                    <O2 />
                </span>
            ) : (
                <span>
                    Can't do this fill :(
                    <br />
                    &nbsp;
                </span>
            )}
        </h2>
    </Screen>
);
