import { h } from "hyperapp";  // JSX will be turned into "h" by rollup
import { DiveTable, RepetitiveDiveTable } from "./screens/tables";
import { MaxOperatingDepth, ContinuousNitroxBlend, PartialPressureNitroxBlend, BestMix, EquivalentAirDepth } from "./screens/nitrox";
import { VhfChannels, PhoneticAlphabet } from "./screens/vhf";
import { Settings, Donate } from "./screens/misc";
import { Screen } from "./screens/base";
import { State } from "./state";

const TodoScreen = ({state}: {state: State}) => (
    <Screen title={"To-Do"}>
        This screen is in progress
    </Screen>
);

const Link = ({screen}, children) => (
    <a onClick={state => ({...state, screen: screen})}><div>{children}</div></a>
);

export function view(state: State) {
    //return <body><PartialPressureNitroxBlend state={state} /></body>;

    let body = state.screen ? state.screen({state}) :
    <Screen title={"Dive Tools"} footer={false}>
        <nav>
            <h3>Tables</h3>
            <section>
                <Link screen={DiveTable}>Dive Table</Link>
                <Link screen={RepetitiveDiveTable}>Repetitive<br/>Dive Table</Link>
            </section>
            <h3>Gasses</h3>
            <section>
                <Link screen={MaxOperatingDepth}>Max Operating<br/>Depth</Link>
                <Link screen={BestMix}>Best Mix<br/>For Depth</Link>
                <Link screen={ContinuousNitroxBlend}>Continuous<br/>Blending</Link>
                <Link screen={PartialPressureNitroxBlend}>Partial Pressure<br/>Blending</Link>
                <Link screen={EquivalentAirDepth}>Equivalent<br/>Air Depth</Link>
            </section>
            <h3>Radio</h3>
            <section>
                <Link screen={VhfChannels}>VHF Channels</Link>
                <Link screen={PhoneticAlphabet}>Phonetic Alphabet</Link>
            </section>
            <h3>Misc</h3>
            <section>
                <Link screen={Settings}>Settings</Link>
                <Link screen={Donate}>Donate</Link>
            </section>
            <h3>Other</h3>
            <section>
                <Link screen={TodoScreen}>Other</Link>
                <Link screen={TodoScreen}>Other</Link>
                <Link screen={TodoScreen}>Other</Link>
                <Link screen={TodoScreen}>Other</Link>
                <Link screen={TodoScreen}>Other</Link>
                <Link screen={TodoScreen}>Other</Link>
                <Link screen={TodoScreen}>Other</Link>
                <Link screen={TodoScreen}>Other</Link>
            </section>
        </nav>
    </Screen>;
    return <body>{body}</body>;
}