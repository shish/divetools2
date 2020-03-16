import {h} from "hyperapp";
import {O2, O2Percentage, Screen} from "./base";
import {ead} from "../math";


/* ================================================================= *\
 * Equivalent Air Depth
\* ================================================================= */

export const EquivalentAirDepth = ({state}: { state: State }) => (
    <Screen title={"Equivalent Air Depth"}>
        <h2>Depth: {state.ead.depth}m</h2>
        <input
            type={"range"}
            min={0}
            max={100}
            value={state.ead.depth}
            onInput={(state: State, event: MyInputEvent) => ({
                ...state, ead: {...state.ead, depth: parseInt(event.target.value)}
            }) as State}
        />
        <h2>Mix: <O2Percentage fo2={state.ead.fo2}/> <O2/></h2>
        <input
            type={"range"}
            min={state.settings.min_fo2}
            max={state.settings.max_fo2}
            step={0.01}
            value={state.ead.fo2}
            onInput={(state: State, event: MyInputEvent) => ({
                ...state, ead: {...state.ead, fo2: parseFloat(event.target.value)}
            } as State)}
        />
        <h2>Equivalent Air Depth: {Math.round(ead(state.ead.depth, state.ead.fo2))}m</h2>
    </Screen>
);