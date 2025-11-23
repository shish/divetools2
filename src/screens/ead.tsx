import h from "hyperapp-jsx-pragma";
import { ead } from "../math";
import { O2, O2Percentage, Screen } from "./base";

/* ================================================================= *\
 * Equivalent Air Depth
\* ================================================================= */

export const EquivalentAirDepth = (state: State) => (
    <Screen title={"Equivalent Air Depth"}>
        <h2>Depth: {state.ead.depth}m</h2>
        <input
            type={"range"}
            min={0}
            max={100}
            value={state.ead.depth}
            oninput={(state: State, event: MyInputEvent) =>
                ({
                    ...state,
                    ead: { ...state.ead, depth: event.target.valueAsNumber },
                }) as State
            }
        />
        <h2>
            Mix: <O2Percentage fo2={state.ead.fo2} /> <O2 />
        </h2>
        <input
            type={"range"}
            min={state.settings.min_fo2}
            max={state.settings.max_fo2}
            step={0.01}
            value={state.ead.fo2}
            oninput={(state: State, event: MyInputEvent) =>
                ({
                    ...state,
                    ead: { ...state.ead, fo2: event.target.valueAsNumber },
                }) as State
            }
        />
        <h2>
            Equivalent Air Depth:{" "}
            {Math.round(ead(state.ead.depth, state.ead.fo2))}m
        </h2>
    </Screen>
);
