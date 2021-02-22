import h from "hyperapp-jsx-pragma";
import {Screen} from "./base";


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

function word_to_phonetic(word: string): string {
    let words = "";
    for (let i = 0; i < word.length; i++) {
        words += (ALPHABET[word[i].toLowerCase()] || "("+word[i]+"?)") + " ";
    }
    return words;
}

function alpha_table() {
    let c1: any[] = [];
    let c2: any[] = [];
    let n = 0;
    for (let k in ALPHABET) {
        if (k === ' ') continue;
        if (n < 13) {
            c1.push(<tr>
                <td>{k}</td>
                <td>-</td>
                <td>{ALPHABET[k]}</td>
            </tr>);
        } else {
            c2.push(<tr>
                <td>{k}</td>
                <td>-</td>
                <td>{ALPHABET[k]}</td>
            </tr>);
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

export const PhoneticAlphabet = (state: State) => (
    <Screen title={"Phonetic Alphabet"}>
        <input
            oninput={(state: State, event: MyInputEvent) => ({
                ...state, phonetic: {word: event.target.value}
            } as State)}
            value={state.phonetic.word}
            placeholder={"Enter text to translate"}
        />
        <p>{word_to_phonetic(state.phonetic.word)}</p>
        {alpha_table()}
    </Screen>
);