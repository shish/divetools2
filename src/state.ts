export interface State {
    screen: any,

    mod: {
        fo2: Fraction,
    },
    best_mix: {
        mod: Meters,
    },

    nitrox_blend: {
        have_bar: Bar,
        have_fo2: Fraction,
        want_bar: Bar,
        want_fo2: Fraction,
        topup_fo2: Fraction,
    },

    ead: {
        depth: Meters,
        fo2: Fraction,
    },

    vhf_channels: {
        search: string,
    },

    phonetic: {
        word: string,
    },

    settings: {
        min_fo2: Fraction,
        max_fo2: Fraction,
        max_ppo2: Bar,
        max_tank_pressure: Bar,
        tank_pressure_step: number,
    }
}

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

    settings: {
        min_fo2: 0.21 as Fraction,
        max_fo2: 0.40 as Fraction,
        max_ppo2: 1.4 as Bar,
        max_tank_pressure: 230 as Bar,
        tank_pressure_step: 5,
    }
};