declare module '*.jpg';
declare module 'hyperapp';

type MyInputEvent = {
    target: HTMLTextAreaElement;
};

type Bar = number & { __bar__: void };
type Meters = number & { __meters__: void };
type Fraction = number & { __fraction__: void };
type Minutes = number & { __minutes__: void };

type State = {
    path: any,

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

    location: {
        lat: number,
        lon: number,
    },

    phonetic: {
        word: string,
    },

    dive_table: {
        depth: Meters,
        time: Minutes,
    },

    settings: {
        min_fo2: Fraction,
        max_fo2: Fraction,
        max_ppo2: Bar,
        max_tank_pressure: Bar,
        tank_pressure_step: number,
        max_depth: Meters,
        max_time: Minutes,
        geo_enabled: boolean,
    }
}