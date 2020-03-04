// ====================================================================
// State and state management functions
// ====================================================================

const state = {
    // global app bits
    screen: null,

    nitrox_calc: {
        ean: 32,
        mod: 32,
        ppo2: 1.4,
    },

    nitrox_blend: {
        have_bar: 0,
        have_ean: 21,
        want_bar: 230,
        want_ean: 21,
    },

    vhf_channels: {
        search: "",
    },

    phonetic: {
        word: "",
    },

    settings: {
        min_o2: 21,
        max_o2: 40,
        max_tank_pressure: 230,
        tank_pressure_step: 5,
    }
};

export {state};
