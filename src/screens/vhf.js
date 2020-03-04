import { h } from "hyperapp";  // JSX will be turned into "h" by rollup
import { Screen } from "./base";


/* ================================================================= *\
 * VHF Channel List / Search
\* ================================================================= */

// https://en.wikipedia.org/wiki/Marine_VHF_radio
const DUPLEX = [83];  // TODO: complete list?
const VHF_RANGE = 35;  // "30-40 miles"

const CHANNELS = [
    {name: "Dublin Port", channels: [12]},
    {name: "Dun Laoghaire Port", channels: [14]},
    {name: "Dublin Coast Guard", channels: [83]},
    {name: "Ship-to-ship", channels: [6, 8, 72, 77], standard: true},
    {name: "Port Operations", channels: [12, 14], standard: true},
    {name: "Bridge-to-bridge", channels: [13], standard: true},
    {name: "Distress, Urgency, Safety & Calling", channels: [16], standard: true},
    {name: "Coast Guard", channels: [67], standard: true},
    {name: "DSC (No Voice)", channels: [70], standard: true},
    {name: "Marina", channels: ["M"], standard: true},
];

const ChannelSearch = ({filter}) => (
    <ul>
        {
            CHANNELS
                .filter(
                    filter
                )
                .map(
                    (x) => (
                        <li>{x.channels.join(", ")} - {x.name}</li>)
                )
        }
    </ul>
);

const VhfChannels = ({state}) => (
    <Screen title={"VHF Channels"}>
        <input
            onInput={(state, event) => ({
                ...state,
                vhf_channels: {
                    search: event.target.value,
                }
            })}
            placeholder={"Search"}
        />
        {state.vhf_channels.search ?
            <ChannelSearch filter={(x) =>
                (x.name.toLowerCase().indexOf(state.vhf_channels.search.toLowerCase()) !== -1)}
                /> :
            <ul>
                <li>Standard Channels:</li>
                <ChannelSearch filter={(x) => (x.standard)} />
            </ul>
        }
    </Screen>
);


/* ================================================================= *\
 * Phonetic Alphabet
\* ================================================================= */

const ALPHABET = {
    a: 'Alpha',
    b: 'Bravo',
    c: 'Charlie',
    d: 'Delta',
    e: 'Echo',
    f: 'Foxtrot',
    g: 'Golf',
    h: 'Hotel',
    i: 'India',
    j: 'Juliet',
    k: 'Kilo',
    l: 'Lima',
    m: 'Mike',
    n: 'November',
    o: 'Oscar',
    p: 'Papa',
    q: 'Quebec',
    r: 'Romeo',
    s: 'Sierra',
    t: 'Tango',
    u: 'Uniform',
    v: 'Victor',
    w: 'Whisky',
    x: 'Xray',
    y: 'Yankee',
    z: 'Zulu',
    ' ': ' - ',
};

function word_to_phonetic(word) {
    let words = "";
    for(let i=0; i<word.length; i++) {
        words += ALPHABET[word[i].toLowerCase()] + " ";
    }
    return words;
}

function alpha_table() {
    let c1 = [];
    let c2 = [];
    let n = 0;
    for(let k in ALPHABET) {
        if(k === ' ') continue;
        if(n < 13) {
            c1.push(<tr><td>{k}</td><td>-</td><td>{ALPHABET[k]}</td></tr>);
        }
        else {
            c2.push(<tr><td>{k}</td><td>-</td><td>{ALPHABET[k]}</td></tr>);
        }
        n++;
    }
    return <table className={"phonetic"}>
        <tr>
            <td>
                <table>{c1}</table>
            </td>
            <td>
                <table>{c2}</table>
            </td>
        </tr>
    </table>;
}

const PhoneticAlphabet = ({state}) => (
    <Screen title={"Phonetic Alphabet"}>
        <input
            onInput={(state, event) => ({
                ...state,
                phonetic: {
                    word: event.target.value,
                }
            })}
            value={state.phonetic.word}
            placeholder={"Enter text to translate"}
        />
        <p>{word_to_phonetic(state.phonetic.word)}</p>
        {alpha_table()}
    </Screen>
);

export { VhfChannels, PhoneticAlphabet };