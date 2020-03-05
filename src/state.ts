export interface State {
    screen: any,

    mod: {
        fo2: number,
    },
    best_mix: {
        mod: number,
    },

    nitrox_blend: {
        have_bar: number,
        have_fo2: number,
        want_bar: number,
        want_fo2: number,
        topup_fo2: number,
    },

    ead: {
        depth: number,
        fo2: number,
    },

    vhf_channels: {
        search: string,
    },

    phonetic: {
        word: string,
    },

    settings: {
        min_fo2: number,
        max_fo2: number,
        max_ppo2: number,
        max_tank_pressure: number,
        tank_pressure_step: number,
    }
}

export const state: State = {
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