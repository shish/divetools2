import h from "hyperapp-jsx-pragma";
// import { DiveTable, SurfaceIntervalTimes, ResidualNitrogen } from "./tables";
import {GoToScreen, title2hash} from "./base";
import {ContinuousNitroxBlend, PartialPressureNitroxBlend} from "./nitrox";
import {VhfChannels} from "./vhf";
import {Settings} from "./settings";
import {Screen} from "./base";
import {About} from "./about";
import {EquivalentAirDepth} from "./ead";
import {MaxOperatingDepth} from "./mod";
import {BestMix} from "./bestmix";
import {Decompression} from "./deco";
import {PhoneticAlphabet} from "./phonetic";


const TodoScreen = () => (
    <Screen title={"To-Do"}>
        This screen is in progress
    </Screen>
);

const SCREENS = {
    "Decompression": {
        "Decompression\nCalculator": Decompression,
        "Equivalent\nAir Depth": EquivalentAirDepth,
        // "Dive Table": DiveTable,
        // "Surface\nIntervals": SurfaceIntervalTimes,
        // "Residual\nNitrogen": ResidualNitrogen,
    },
    "Nitrox": {
        "Max Operating\nDepth": MaxOperatingDepth,
        "Best Mix\nFor Depth": BestMix,
        "Continuous\nBlending": ContinuousNitroxBlend,
        "Partial Pressure\nBlending": PartialPressureNitroxBlend,
    },
    "Radio": {
        "VHF Channels": VhfChannels,
        "Phonetic\nAlphabet": PhoneticAlphabet,
    },
    /*"Checklists": {
        <Link screen={TodoScreen}>"Shore Dive</Link>
        <Link screen={TodoScreen}>Boat Dive</Link>
        <Link screen={TodoScreen}>Cox'n</Link>
        <Link screen={TodoScreen}>Other</Link>
    },*/
    /*
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
    "hidden": {
        "Settings": Settings,
        "About": About,
    }
};

function nl2br(s: string) {
    let parts = s.split("\n");
    let result = [];
    for(let i=0; i<parts.length; i++) {
        result.push(parts[i]);
        if(i<parts.length-1) result.push(<br/>);
    }
    return result;
}
const Link = ({title}) => (
    <a class={"button"} onclick={[GoToScreen, title]}><div>{nl2br(title)}</div></a>
);

export function Root(state: State) {
    let screen = null;
    for(let section in SCREENS) {
        for(let name in SCREENS[section]) {
            if (title2hash(name) == state.screen) {
                screen = SCREENS[section][name];
            }
        }
    }
    let body = screen ? screen({state}) :
        <Screen title={"Dive Tools"} blank={false} footer={[
            <Link title={"Settings"} />,
            <Link title={"About"} />,
        ]}>
            <nav>
                {
                    Object.keys(SCREENS)
                        .filter((x) => (x !== "hidden"))
                        .map((k) =>
                            <div>
                                <h3>{k}</h3>
                                <section>
                                    {
                                        Object.keys(SCREENS[k])
                                            .map((l) => <Link title={l} />)
                                    }
                                </section>
                            </div>
                        )
                }
                <p>&nbsp;</p>
            </nav>
        </Screen>;
    return <body>{body}</body>;
}
