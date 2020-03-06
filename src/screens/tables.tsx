import {h} from "hyperapp";  // JSX will be turned into "h" by rollup
import {Screen} from "./base";
import dive_table from '../assets/dive-table.jpg';
import repetitive_dive_table from '../assets/repetitive-dive-table.jpg';

export const DiveTable = () => (
    <Screen title={"Dive Table"}>
        <img alt={"Dive Table"} src={dive_table} />
    </Screen>
);

export const RepetitiveDiveTable = () => (
    <Screen title={"Repetitive Dive Table"}>
        <img alt={"Repetitive Dive Table"} src={repetitive_dive_table} />
    </Screen>
);