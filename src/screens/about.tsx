import h from "hyperapp-jsx-pragma";
import {Screen} from "./base";


/* ================================================================= *\
 * Donate
\* ================================================================= */

export const About = () => (
    <Screen title={"About"}>
        <h2>
            Created by Shish
        </h2>
        <p>Email: <a href={"mailto:s@shish.io"}>s@shish.io</a></p>
        <p>Source Code: <a href={"https://github.com/shish/DiveTools2"}>GitHub</a></p>
        <p>
            Ocean background
            <br/>by <a href={"https://commons.wikimedia.org/w/index.php?curid=20284104"}>Vanesa camaño</a>
            <br/>CC BY-SA 3.0
        </p>
        <p className={"donate"}>
            If you like this app and find it useful,
            <br/>feel free to donate
            via <a href={"https://paypal.me/shish2k"}>PayPal</a>
        </p>
    </Screen>
);