import {h} from "hyperapp";  // JSX will be turned into "h" by rollup
import {Screen} from "./base";
import dive_table from '../assets/dive-table.jpg';
import repetitive_dive_table from '../assets/repetitive-dive-table.jpg';
import {State} from "../state";

export const DiveTable = ({state}: {state: State}) => (
    <Screen title={"Dive Table"}>
        <img src={dive_table} />
    </Screen>
);

export const RepetitiveDiveTable = ({state}: {state: State}) => (
    <Screen title={"Repetitive Dive Table"}>
        <img src={repetitive_dive_table} />
    </Screen>
);