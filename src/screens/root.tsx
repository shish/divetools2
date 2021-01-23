import h from "hyperapp-jsx-pragma";
import { Screen } from "./base";
import { AnchorHandler } from "../location";


const Section = ({title}, children) => (
    <div>
        <h3>{title}</h3>
        <section>{children}</section>
    </div>
);
const Link = ({href}, children) => (
    <a class={"button"} onclick={AnchorHandler} href={href}><div>{children}</div></a>
);

export function Root(state: State) {
    return <Screen title={"Dive Tools"} blank={false} footer={[
        <Link href={"/settings"}>Settings</Link>,
        <Link href={"/about"}>About</Link>,
    ]}>
        <nav>
            <Section title="Decompression">
                <Link href="/decompression">Decompression<br/>Calculator</Link>
                <Link href="/ead">Equivalent<br/>Air Depth</Link>
                {
                // "Dive Table": DiveTable,
                // "Surface\nIntervals": SurfaceIntervalTimes,
                // "Residual\nNitrogen": ResidualNitrogen,
                }
            </Section>
            <Section title="Nitrox">
                <Link href="/mod">Max Operating<br/>Depth</Link>
                <Link href="/bestmix">Best Mix<br/>For Depth</Link>
                <Link href="/contblend">Continuous<br/>Blending</Link>
                <Link href="/ppblend">Partial Pressure<br/>Blending</Link>
            </Section>
            <Section title="Radio">
                <Link href="/vhf">VHF Channels</Link>
                <Link href="/phonetic">Phonetic<br/>Alphabet</Link>
            </Section>
            <p>&nbsp;</p>
        </nav>
    </Screen>;
}

/*
"Checklists": {
    <Link screen={TodoScreen}>Shore Dive</Link>
    <Link screen={TodoScreen}>Boat Dive</Link>
    <Link screen={TodoScreen}>Cox'n</Link>
    <Link screen={TodoScreen}>Other</Link>
},
"Dive Log (Coming Later)": {
    "Usual Buddies": TodoScreen,
    "Dive Log": TodoScreen,
},
"The Sea (Coming Later)": {
    "Tides": TodoScreen,
    "Weather": TodoScreen,
    "Sea Maps": TodoScreen,
    "Dive Spots": TodoScreen,
},
*/
