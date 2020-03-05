import { h } from "hyperapp";  // JSX will be turned into "h" by rollup
import { Screen } from "./base";
import dive_table from '../assets/dive-table.jpg';
import repetitive_dive_table from '../assets/repetitive-dive-table.jpg';

const DiveTable = ({state}) => (
    <Screen title={"Dive Table"}>
        <img src={dive_table} />
    </Screen>
);

const RepetitiveDiveTable = ({state}) => (
    <Screen title={"Repetitive Dive Table"}>
        <img src={repetitive_dive_table} />
    </Screen>
);

export { DiveTable, RepetitiveDiveTable };