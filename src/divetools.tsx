/// <reference path='./divetools.d.ts'/>
import {app, h, text} from "hyperapp";
import {WatchPosition} from "hyperapp-fx";
import {onUrlChange, onUrlRequest, pushUrl} from "./navigation";
import {Root} from "./screens/root";

// import { DiveTable, SurfaceIntervalTimes, ResidualNitrogen } from "./tables";
import {ContinuousNitroxBlend, PartialPressureNitroxBlend} from "./screens/nitrox";
import {VhfChannels} from "./screens/vhf";
import {Settings} from "./screens/settings";
import {About} from "./screens/about";
import {EquivalentAirDepth} from "./screens/ead";
import {MaxOperatingDepth} from "./screens/mod";
import {BestMix} from "./screens/bestmix";
import {Decompression} from "./screens/deco";
import {PhoneticAlphabet} from "./screens/phonetic";


export const default_settings = {
    min_fo2: 0.21 as Fraction,
    max_fo2: 0.40 as Fraction,
    max_ppo2: 1.4 as Bar,
    max_tank_pressure: 230 as Bar,
    tank_pressure_step: 5,
    max_depth: 56 as Meters,
    max_time: 60 as Minutes,
    geo_enabled: false,
};

let state: State = {
    // global app bits
    url: window.location,

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
        ...default_settings
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

const routes = {
    "/": Root,
    "/decompression": Decompression,
    "/ead": EquivalentAirDepth,
    "/mod": MaxOperatingDepth,
    "/bestmix": BestMix,
    "/contblend": ContinuousNitroxBlend,
    "/ppblend": PartialPressureNitroxBlend,
    "/vhf": VhfChannels,
    "/phonetic": PhoneticAlphabet,
    "/settings": Settings,
    "/about": About,
    "404": () => h("body", {onclick: function(state) {console.log(state); return state;}}, text("404")),
};

app({
    init: state,
    view: (state) => (routes[state.url.pathname] ?? routes["404"])(state),
    subscriptions: state => [
        onUrlChange((state, url) => ({ ...state, url: url })),
        onUrlRequest((state, location) => [state, pushUrl(location.pathname)]),
        state.settings.geo_enabled && PositionWatcher
    ],
    node: document.body
});
