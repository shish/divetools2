const state = {
    // global app bits
    screen: null,

    // Max Operating Depth
    mod: {
        fo2: 0.32,
    },
    best_mix: {
        mod: 32,
    },

    nitrox_blend: {
        have_bar: 20,
        have_fo2: 0.33,
        want_bar: 100,
        want_fo2: 0.40,
        topup_fo2: 0.33,
    },

    ead: {
        depth: 33,
        fo2: 0.32,
        // ead == 27
    },

    vhf_channels: {
        search: "",
    },

    phonetic: {
        word: "",
    },

    settings: {
        min_fo2: 0.21,
        max_fo2: 0.40,
        max_ppo2: 1.4,
        max_tank_pressure: 230,
        tank_pressure_step: 5,
    }
};

export {state};
