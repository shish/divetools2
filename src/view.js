import { h } from "hyperapp";  // JSX will be turned into "h" by rollup
import { NitroxCalc, ContinuousNitroxBlend } from "./screens/nitrox";
import { VhfChannels } from "./screens/vhf";
import { Settings, Donate } from "./screens/misc";

function view(state) {
    return <body><Settings state={state} /></body>;

    let body = state.screen ? state.screen({state}) : <nav>
        <h2>Nitrox</h2>
        <section>
            <a onClick={state => ({...state, screen: NitroxCalc})}>MOD Calculator</a>
            <a onClick={state => ({...state, screen: ContinuousNitroxBlend})}>Continuous Blending</a>
            <a onClick={state => ({...state, screen: ContinuousNitroxBlend})}>Partial Pressure Blending</a>
        </section>
        <h2>VHF</h2>
        <section>
            <a onClick={state => ({...state, screen: VhfChannels})}>Channels</a>
        </section>
        <h2>Misc</h2>
        <section>
            <a onClick={state => ({...state, screen: Settings})}>Settings</a>
            <a onClick={state => ({...state, screen: Donate})}>Donate</a>
        </section>
    </nav>;
    return <body>{body}</body>;
}

export { view };
