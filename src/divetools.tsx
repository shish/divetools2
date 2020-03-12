/// <reference path='./divetools.d.ts'/>
import {app, h} from "hyperapp";
import { Decompression, DiveTable, SurfaceIntervalTimes, ResidualNitrogen } from "./screens/tables";
import { MaxOperatingDepth, ContinuousNitroxBlend, PartialPressureNitroxBlend, BestMix, EquivalentAirDepth } from "./screens/nitrox";
import { VhfChannels, PhoneticAlphabet } from "./screens/vhf";
import { Settings, About } from "./screens/misc";
import { Screen } from "./screens/base";

export const state: State = {
    // global app bits
    screen: null,

    // Max Operating Depth
    mod: {
        fo2: 0.32 as Fraction,
    },
    best_mix: {
        mod: 32 as Meters,
    },

    nitrox_blend: {
        have_bar: 20 as Bar,
        have_fo2: 0.33 as Fraction,
        want_bar: 100 as Bar,
        want_fo2: 0.40 as Fraction,
        topup_fo2: 0.33 as Fraction,
    },

    ead: {
        depth: 33 as Meters,
        fo2: 0.32 as Fraction,
        // ead == 27
    },

    vhf_channels: {
        search: "",
    },

    phonetic: {
        word: "",
    },

    dive_table: {
        depth: 20 as Meters,
        time: 30 as Minutes,
    },

    settings: {
        min_fo2: 0.21 as Fraction,
        max_fo2: 0.40 as Fraction,
        max_ppo2: 1.4 as Bar,
        max_tank_pressure: 230 as Bar,
        tank_pressure_step: 5,
        max_depth: 56 as Meters,
        max_time: 60 as Minutes,
    }
};

let loaded_state: State = state;
try {
    let saved_state = JSON.parse(window.localStorage.getItem("state") || "{}");
    loaded_state = {...loaded_state, ...saved_state};
}
catch(err) {
    console.log("Error loading state:", err);
}

const TodoScreen = () => (
    <Screen title={"To-Do"}>
        This screen is in progress
    </Screen>
);

const Link = ({screen}, children) => (
    <a class={"button"} onClick={state => ({...state, screen: screen})}><div>{children}</div></a>
);

export function view(state: State) {
    //return <body><PartialPressureNitroxBlend state={state} /></body>;

    let body = state.screen ? state.screen({state}) :
        <Screen title={"Dive Tools"} blank={false} footer={[
            <Link screen={Settings}>Settings</Link>,
            <Link screen={About}>About</Link>
        ]}>
            <nav>
                <h3>Tables</h3>
                <section>
                    <Link screen={Decompression}>Decompression<br/>Calculator</Link>
                    <Link screen={DiveTable}>Dive Table</Link>
                    <Link screen={SurfaceIntervalTimes}>Surface<br/>Intervals</Link>
                    <Link screen={ResidualNitrogen}>Residual<br/>Nitrogen</Link>
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
                    <Link screen={PhoneticAlphabet}>Phonetic<br/>Alphabet</Link>
                </section>
                <h3>Checklists</h3>
                <section>
                    <Link screen={TodoScreen}>Shore Dive</Link>
                    <Link screen={TodoScreen}>Boat Dive</Link>
                    <Link screen={TodoScreen}>Cox'n</Link>
                    <Link screen={TodoScreen}>Other</Link>
                </section>
                <h3>Other</h3>
                <section>
                    <Link screen={TodoScreen}>Other</Link>
                    <Link screen={TodoScreen}>Other</Link>
                    <Link screen={TodoScreen}>Other</Link>
                    <Link screen={TodoScreen}>Other</Link>
                </section>
            </nav>
        </Screen>;
    return <body>{body}</body>;
}

app({
    init: loaded_state,
    view: view,
    node: document.body
});
