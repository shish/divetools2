/// <reference path='./divetools.d.ts'/>
import {app, h} from "hyperapp";
import {WatchPosition} from "hyperapp-fx";
import {AutoHistory} from "hyperapp-auto-history";
// import { DiveTable, SurfaceIntervalTimes, ResidualNitrogen } from "./screens/tables";
import {GoToScreen, title2hash} from "./screens/base";
import {ContinuousNitroxBlend, PartialPressureNitroxBlend} from "./screens/nitrox";
import {VhfChannels} from "./screens/vhf";
import {Settings} from "./screens/settings";
import {Screen} from "./screens/base";
import {About} from "./screens/about";
import {EquivalentAirDepth} from "./screens/ead";
import {MaxOperatingDepth} from "./screens/mod";
import {BestMix} from "./screens/bestmix";
import {Decompression} from "./screens/deco";
import {PhoneticAlphabet} from "./screens/phonetic";


// ===========================================================================
// Base State
// ===========================================================================

let state: State = {
    // global app bits
    screen: null,

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

    location: {
        lat: null,
        lon: null,
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
        geo_enabled: false,
    }
};

try {
    state.settings = {
        ...state.settings,
        ...JSON.parse(window.localStorage.getItem("settings") || "{}")
    };
}
catch(err) {
    console.log("Error loading state:", err);
}


// ===========================================================================
// Base View
// ===========================================================================

const TodoScreen = () => (
    <Screen title={"To-Do"}>
        This screen is in progress
    </Screen>
);

const SCREENS = {
    "Decompression": {
        "Decompression\nCalculator": Decompression,
        "Equivalent\nAir Depth": EquivalentAirDepth,
        // "Dive Table": DiveTable,
        // "Surface\nIntervals": SurfaceIntervalTimes,
        // "Residual\nNitrogen": ResidualNitrogen,
    },
    "Nitrox": {
        "Max Operating\nDepth": MaxOperatingDepth,
        "Best Mix\nFor Depth": BestMix,
        "Continuous\nBlending": ContinuousNitroxBlend,
        "Partial Pressure\nBlending": PartialPressureNitroxBlend,
    },
    "Radio": {
        "VHF Channels": VhfChannels,
        "Phonetic\nAlphabet": PhoneticAlphabet,
    },
    /*"Checklists": {
        <Link screen={TodoScreen}>"Shore Dive</Link>
        <Link screen={TodoScreen}>Boat Dive</Link>
        <Link screen={TodoScreen}>Cox'n</Link>
        <Link screen={TodoScreen}>Other</Link>
    },*/
    "Dive Log (Coming Later)": {
        "Usual Buddies": TodoScreen,
        "Dive Log": TodoScreen,
    },
    "The Sea (Coming Later)": {
        "Tides": TodoScreen,
        "Weather": TodoScreen,
        "Sea Maps": TodoScreen,
        "Dive Spots": TodoScreen,
    },
    "hidden": {
        "Settings": Settings,
        "About": About,
    }
};

function nl2br(s: string) {
    let parts = s.split("\n");
    let result = [];
    for(let i=0; i<parts.length; i++) {
        result.push(parts[i]);
        if(i<parts.length-1) result.push(<br/>);
    }
    return result;
}
const Link = ({title}) => (
    <a class={"button"} onClick={[GoToScreen, title]}><div>{nl2br(title)}</div></a>
);

function view(state: State) {
    let screen = null;
    for(let section in SCREENS) {
        for(let name in SCREENS[section]) {
            if (title2hash(name) == state.screen) {
                screen = SCREENS[section][name];
            }
        }
    }
    let body = screen ? screen({state}) :
        <Screen title={"Dive Tools"} blank={false} footer={[
            <Link title={"Settings"} />,
            <Link title={"About"} />,
        ]}>
            <nav>
                {
                    Object.keys(SCREENS)
                        .filter((x) => (x !== "hidden"))
                        .map((k) =>
                            <div>
                                <h3>{k}</h3>,
                                <section>
                                    {
                                        Object.keys(SCREENS[k])
                                            .map((l) => <Link title={l} />)
                                    }
                                </section>
                            </div>
                        )
                }
                <p>&nbsp;</p>
            </nav>
        </Screen>;
    return <body>{body}</body>;
}


// ===========================================================================
// Base Subscriptions
// ===========================================================================

const PositionWatcher = WatchPosition({
    action: (state: State, position) => ({
        ...state,
        location: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
        }
    }),
    error: (state: State, error) => ({
        ...state, settings: {...state.settings, geo_enabled: false}
    }),
});

const HistoryManager = AutoHistory({
    init: state,
    push: ["screen"],
    replace: []
});

function subscriptions(state) {
    HistoryManager.push_state_if_changed(state);
    return [
        HistoryManager,
        state.settings.geo_enabled && PositionWatcher
    ];
}

app({
    init: state,
    view: view,
    subscriptions: subscriptions,
    node: document.body
});
