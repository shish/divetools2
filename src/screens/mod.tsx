import h from "hyperapp-jsx-pragma";
import {O2, O2CleanWarning, O2Percentage, Screen} from "./base";


export const MaxOperatingDepth = ({state}: { state: State }) => (
    <Screen title={"Max Operating Depth"} notice={<O2CleanWarning fo2={state.mod.fo2}/>}>
        <h2>
            EAN <O2/> Level: <O2Percentage fo2={state.mod.fo2}/>
        </h2>

        <input
            type={"range"}
            min={state.settings.min_fo2}
            max={state.settings.max_fo2}
            value={state.mod.fo2}
            step={0.01}
            oninput={(state: State, event: MyInputEvent) => ({
                ...state, mod: {fo2: parseFloat(event.target.value)}
            } as State)}
        />
        <h2>Max Operating Depth: {Math.floor(((state.settings.max_ppo2 / state.mod.fo2) - 1) * 10)}m</h2>
        <p>Max Operating Pressure: {Math.floor(state.settings.max_ppo2 / state.mod.fo2 * 10) / 10}bar</p>
        <p>(Using max pP<O2/> = {state.settings.max_ppo2}bar)</p>
    </Screen>
);