import h from "hyperapp-jsx-pragma";
import { O2, Screen } from "./base";

type DepthGroup = [number, number, number, string];

const DIVE_TABLE = {
    12: {
        19: [0, 0, 0, "A"],
        25: [0, 0, 0, "B"],
        37: [0, 0, 0, "C"],
        57: [0, 0, 0, "D"],
        82: [0, 0, 0, "E"],
        111: [0, 0, 0, "F"],
        125: [0, 0, 0, "G"],
    },
    15: {
        16: [0, 0, 0, "A"],
        20: [0, 0, 0, "B"],
        29: [0, 0, 0, "C"],
        41: [0, 0, 0, "D"],
        59: [0, 0, 0, "E"],
        75: [0, 0, 0, "F"],
        90: [0, 0, 7, "G"],
    },
    18: {
        14: [0, 0, 0, "A"],
        17: [0, 0, 0, "B"],
        25: [0, 0, 0, "C"],
        33: [0, 0, 0, "D"],
        44: [0, 0, 0, "E"],
        47: [0, 0, 0, "F"],
        70: [0, 0, 11, "G"],
    },
    21: {
        12: [0, 0, 0, "A"],
        15: [0, 0, 0, "B"],
        22: [0, 0, 0, "C"],
        28: [0, 0, 0, "D"],
        34: [0, 0, 0, "E"],
        50: [0, 0, 8, "F"],
        60: [0, 0, 16, "G"],
    },
    24: {
        16: [0, 0, 0, "A"],
        20: [0, 0, 0, "B"],
        29: [0, 0, 0, "C"],
        41: [0, 0, 0, "E"],
        59: [0, 0, 4, "F"],
        75: [0, 0, 8, "F"],
        90: [0, 0, 17, "G"],
    },
    27: {
        10: [0, 0, 0, "A"],
        12: [0, 0, 0, "B"],
        18: [0, 0, 0, "C"],
        20: [0, 0, 0, "E"],
        30: [0, 0, 5, "F"],
        35: [0, 0, 10, "F"],
        40: [0, 2, 13, "G"],
    },
    30: {
        9: [0, 0, 0, "A"],
        11: [0, 0, 0, "B"],
        16: [0, 0, 0, "C"],
        17: [0, 0, 0, "D"],
        25: [0, 0, 5, "E"],
        30: [0, 2, 7, "F"],
        35: [0, 3, 14, "G"],
    },
    33: {
        8: [0, 0, 0, "A"],
        10: [0, 0, 0, "B"],
        14: [0, 0, 0, "D"],
        20: [0, 0, 4, "E"],
        25: [0, 2, 7, "F"],
        30: [0, 4, 11, "G"],
    },
    36: {
        7: [0, 0, 0, "A"],
        9: [0, 0, 0, "B"],
        12: [0, 0, 0, "D"],
        20: [0, 2, 5, "E"],
        25: [0, 4, 9, "F"],
    },
    39: {
        7: [0, 0, 0, "A"],
        8: [0, 0, 0, "B"],
        10: [0, 0, 0, "D"],
        15: [0, 0, 4, "E"],
        20: [0, 3, 7, "F"],
    },
    42: {
        6: [0, 0, 0, "A"],
        7: [0, 0, 0, "B"],
        9: [0, 0, 0, "D"],
        12: [0, 0, 4, "D"],
        15: [0, 1, 5, "E"],
        18: [0, 4, 6, "F"],
    },
    45: {
        6: [0, 0, 0, "A"],
        7: [0, 0, 0, "B"],
        9: [0, 0, 0, "D"],
        12: [0, 0, 5, "E"],
        15: [0, 3, 5, "E"],
        18: [2, 4, 9, "F"],
    },
    48: {
        6: [0, 0, 0, "A"],
        9: [0, 0, 3, "E"],
        12: [0, 2, 5, "E"],
        15: [0, 4, 6, "F"],
        18: [2, 4, 9, "F"],
    },
    51: {
        5: [0, 0, 0, "A"],
        9: [0, 0, 4, "E"],
        12: [0, 3, 6, "E"],
        15: [2, 4, 8, "F"],
    },
};

function get_depth_group(depth: number): string {
    for (let d in DIVE_TABLE) {
        if (parseInt(d) >= depth) {
            return d;
        }
    }
    throw new Error("No depth group for " + depth);
}

function get_time_group(depth_group: DepthGroup, time: number) {
    for (let t in depth_group) {
        if (parseInt(t) >= time) {
            return t;
        }
    }
    return [];
}

function get_dive_table(depth: number, time: number) {
    let depth_group = DIVE_TABLE[get_depth_group(depth)];
    if (!depth_group) return <div>Tables don't go this deep</div>;

    let time_group = depth_group[get_time_group(depth_group, time)];
    if (!time_group) return <div>Tables don't go this long</div>;

    return (
        <div>
            {time_group[0] > 0 && <div>9m stop: {time_group[0]}min</div>}
            {time_group[1] > 0 && <div>6m stop: {time_group[1]}min</div>}
            {time_group[2] > 0 ? (
                <div>3m stop: {time_group[2]}min</div>
            ) : (
                <div>3m safety stop: 3min</div>
            )}
            <div>Repetitive Group: {time_group[3]}</div>
        </div>
    );
}

export const Decompression = (state: State) => (
    <Screen title={"Decompression Stops"}>
        <p>
            (Assuming <O2 /> at 21%, one dive per day)
        </p>
        <h2>Depth: {state.dive_table.depth}m</h2>
        <input
            type={"range"}
            min={0}
            max={state.settings.max_depth}
            step={1}
            value={state.dive_table.depth}
            oninput={(state: State, event: MyInputEvent) =>
                ({
                    ...state,
                    dive_table: {
                        ...state.dive_table,
                        depth: event.target.valueAsNumber,
                    },
                } as State)
            }
        />
        <h2>Time: {state.dive_table.time}min</h2>
        <input
            type={"range"}
            min={0}
            max={state.settings.max_time}
            step={1}
            value={state.dive_table.time}
            oninput={(state: State, event: MyInputEvent) =>
                ({
                    ...state,
                    dive_table: {
                        ...state.dive_table,
                        time: event.target.valueAsNumber,
                    },
                } as State)
            }
        />
        {get_dive_table(state.dive_table.depth, state.dive_table.time)}
    </Screen>
);
