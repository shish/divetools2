/// <reference path='./divetools.d.ts'/>
import {app} from "hyperapp";
import {WatchPosition} from "hyperapp-fx";
import {AutoHistory} from "hyperapp-auto-history";
import {Root} from "./screens/root";


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
    view: Root,
    subscriptions: subscriptions,
    node: document.body
});
