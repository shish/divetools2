import { h } from "hyperapp";  // JSX will be turned into "h" by rollup
import { Screen } from "./base";

const VhfChannels = ({state}) => (
    <Screen title={"VHF Channels"}>
        <ul>
            <li>16 - Contact & Emergency</li>
        </ul>
    </Screen>
);

export { VhfChannels };