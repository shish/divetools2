import {h} from "hyperapp";  // JSX will be turned into "h" by rollup
import {Screen} from "./base";
import dive_table from '../static/dive-table.jpg';
import repetitive_dive_table from '../static/repetitive-dive-table.jpg';

const DIVE_TABLE = {
    12: {
        19: [0, 0, 3, "A"],
        25: [0, 0, 3, "B"],
        37: [0, 0, 3, "C"],
        57: [0, 0, 3, "D"],
        82: [0, 0, 3, "E"],
        111: [0, 0, 3, "F"],
        125: [0, 0, 3, "G"],
    },
    9000: {},
};

function get_dive_table(depth, time) {
    let depth_group = {};
    for(let d in DIVE_TABLE) {
        if(parseInt(d) > depth) {
            depth_group = DIVE_TABLE[d];
            break;
        }
    }

    let time_group = "";
    for(let t in depth_group) {
        if(parseInt(t) > time) {
            time_group = depth_group[t];
            break;
        }
    }
    console.log(time_group);
    return <p>
        9m stop: {time_group[2]}min
        <br/>6m stop: {time_group[1]}min
        <br/>3m stop: {time_group[0]}min
        <br/>Repetitive Group: {time_group[3]}
    </p>;
}

export const Decompression = ({state}: {state: State}) => (
    <Screen title={"Decompression Stops"}>
        <h2>Depth: {state.dive_table.depth}m</h2>
        <input
            type={"range"}
            min={0}
            max={state.settings.max_depth}
            step={1}
            value={state.dive_table.depth}
            oninput={(state: State, event: MyInputEvent) => ({
                ...state,
                dive_table: {
                    ...state.dive_table,
                    depth: parseInt(event.target.value),
                }
            } as State)}
        />
        <h2>Time: {state.dive_table.time}min</h2>
        <input
            type={"range"}
            min={0}
            max={state.settings.max_time}
            step={1}
            value={state.dive_table.time}
            oninput={(state: State, event: MyInputEvent) => ({
                ...state,
                dive_table: {
                    ...state.dive_table,
                    time: parseInt(event.target.value),
                }
            } as State)}
        />
        {get_dive_table(state.dive_table.depth, state.dive_table.time)}
    </Screen>
);

export const DiveTable = () => (
    <Screen title={"Dive Table"} blank={false}>
        <img alt={"Dive Table"} src={dive_table} />
    </Screen>
);

export const SurfaceIntervalTimes = () => (
    <Screen title={"Surface Intervals"} blank={false}>
        <img alt={"Surface Interval Times"} src={repetitive_dive_table} />
    </Screen>
);

export const ResidualNitrogen = () => (
    <Screen title={"Residual Nitrogen"} blank={false}>
        <img alt={"Residual Nitrogen"} src={repetitive_dive_table} />
    </Screen>
);
