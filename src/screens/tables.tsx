import h from "hyperapp-jsx-pragma";
import dive_table from "../static/dive-table.jpg";
import residual_nitrogen_times from "../static/residual-nitrogen-times.jpg";
import surface_interval_times from "../static/surface-interval-times.jpg";
import { Screen } from "./base";
// import repetitive_dive_table from '../static/repetitive-dive-table.jpg';

export const DiveTable = () => (
    <Screen title={"Dive Table"} blank={false}>
        <img alt={"Dive Table"} src={dive_table} />
    </Screen>
);

export const SurfaceIntervalTimes = () => (
    <Screen title={"Surface Intervals"} blank={false}>
        <img alt={"Surface Interval Times"} src={surface_interval_times} />
    </Screen>
);

export const ResidualNitrogen = () => (
    <Screen title={"Residual Nitrogen"} blank={false}>
        <img alt={"Residual Nitrogen"} src={residual_nitrogen_times} />
    </Screen>
);
