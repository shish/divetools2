import h from "hyperapp-jsx-pragma";
import { O2, O2CleanWarning, O2Percentage, Screen } from "./base";
import { depth_to_bar } from "../math";

export const BestMix = (state: State) => (
    <Screen
        title={"Best Mix for Depth"}
        notice={
            <O2CleanWarning
                fo2={
                    (state.settings.max_ppo2 /
                        depth_to_bar(state.best_mix.mod)) as Fraction
                }
            />
        }
    >
        <h2>Max Operating Depth: {state.best_mix.mod}m</h2>
        <input
            type={"range"}
            min={25}
            max={56}
            value={state.best_mix.mod}
            oninput={(state: State, event: MyInputEvent) =>
                ({
                    ...state,
                    best_mix: { mod: parseInt(event.target.value) },
                } as State)
            }
        />
        <h2>
            Max EAN <O2 /> Level:{" "}
            <O2Percentage
                fo2={
                    (state.settings.max_ppo2 /
                        depth_to_bar(state.best_mix.mod)) as Fraction
                }
            />
        </h2>
        <p>
            Max Operating Pressure:{" "}
            {Math.floor(depth_to_bar(state.best_mix.mod) * 10) / 10}bar
        </p>
        <p>
            (Using max pP
            <O2 /> = {state.settings.max_ppo2}bar)
        </p>
    </Screen>
);
