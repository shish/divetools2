import h from "hyperapp-jsx-pragma";
import {BackButton, Screen} from "./base";

/* ================================================================= *\
 * VHF Channel List / Search
\* ================================================================= */

function intersect(a, b) {
    return a.filter(value => -1 !== b.indexOf(value))
}

// https://en.wikipedia.org/wiki/Marine_VHF_radio
const DUPLEX = [];  // 83, TODO: complete list?
// const VHF_RANGE = 35;  // "30-40 miles"

const STATIONS = [
    // Standard Channels
    {name: "Ship-to-ship", channels: [6, 8], standard: true},
    {name: "Port Operations", channels: [12, 14], standard: true},
    {name: "Bridge-to-bridge", channels: [13], standard: true},
    {name: "Distress, Urgency, Safety & Calling", channels: [16], standard: true},
    {name: "Coast Guard", channels: [67], standard: true},
    {name: "DSC (No Voice)", channels: [70], standard: true},
    {name: "Ship-to-ship", channels: [72, 77], standard: true},
    {name: "Marina", channels: ["M"], standard: true},

    // Ports
    {name: "Dublin Port",               channels: [12], coords: {lat: 53.3494, lon: -6.2022}},
    {name: "Dun Laoghaire Port",        channels: [14], coords: {lat: 53.3024, lon: -6.1264}},

    // Coast guard: http://www.malinheadcoastguardradio.com/vhf%20network.html
    // Dublin MRCC
    {name: "Carlingford Coast Guard",   channels: [67,  4], coords: {lat: 54.04, lon: -6.16}}, // approx
    {name: "Dublin Coast Guard",        channels: [67, 83], coords: {lat: 53.33, lon: -6.17}}, // approx
    {name: "Wicklow Head Coast Guard",  channels: [67,  2], coords: {lat: 52.98, lon: -6.04}}, // approx
    {name: "Rosslare Coast Guard",      channels: [67, 23], coords: {lat: 52.27, lon: -6.38}}, // approx
    {name: "Minehead Coast Guard",      channels: [67, 83], coords: {lat: 51.19, lon: -3.46}}, // approx
    // Valentia MRSC
    {name: "Cork Coast Guard",          channels: [67, 26], coords: {lat: 51.80, lon: -8.27}}, // approx
    {name: "Mizen Head Coast Guard",    channels: [67,  4], coords: {lat: 51.45, lon: -9.81}}, // approx
    {name: "Bantry Coast Guard",        channels: [67, 23], coords: {lat: 51.68, lon: -9.46}}, // approx
    {name: "Valentia Coast Guard",      channels: [67, 24], coords: {lat: 51.90, lon: -10.36}}, // approx
    {name: "Shannon Coast Guard",       channels: [67, 28], coords: {lat: 52.45, lon: -9.75}}, // approx
    {name: "Galway Coast Guard",        channels: [67,  4], coords: {lat: 53.25, lon: -9.00}}, // approx
    // L. Derg? 16, 61
    // Malin Head MRSC
    // L. Ree? 16, 62
    {name: "Clifden Coast Guard",       channels: [67, 26], coords: {lat: 53.48, lon: -10.02}}, // approx
    {name: "Belmullet Coast Guard",     channels: [67, 83], coords: {lat: 54.27, lon: -9.99}}, // approx
    {name: "Donegal Bay Coast Guard",   channels: [67,  2], coords: {lat: 54.36, lon: -8.67}}, // approx
    {name: "Glen Head Coast Guard",     channels: [67, 24], coords: {lat: 54.64, lon: -8.73}}, // approx
    {name: "Malin Head Coast Guard",    channels: [67, 23, 85], coords: {lat: 55.38, lon: -7.37}}, // approx
];
const STATIONS_WITH_COORDS = STATIONS.filter((x) => (x.coords));

const StationList = ({state, stations}) => (
    stations.map(
        (x) => (
            <tr>
                <td>{x.channels.map(
                    (x) => (DUPLEX.indexOf(x) !== -1) ? <span class={"duplex channel"}>{x}</span> : <span class={"simplex channel"}>{x}</span>)
                }</td>
                <td>-</td>
                <td>
                    {x.name}
                    {x.coords && state.location.lon &&
                        " (" + getDistanceFromLatLoninKm(x.coords, state.location).toFixed(1) + "km)"
                    }
                </td>
            </tr>)
    )
);

function EnableGeo(state, event) {
    event.preventDefault();
    return {
        ...state,
        settings: {...state.settings, geo_enabled: true}
    }
}
const EnableGeoButton = () => (
    <a class={"button"} onclick={EnableGeo}>Search GPS</a>
);

function format_lat_lon({lat, lon}: {lat: number, lon: number}) {
    let lats = Math.abs(lat).toFixed(2);
    let lons = Math.abs(lon).toFixed(2);
    return (
        (lat > 0 ? lats + "N" : lats + "S") +
        ", " +
        (lon > 0 ? lons + "E" : lons + "W")
    );
}

//
function getDistanceFromLatLoninKm(p1, p2) {
    let lat1 = p1.lat;
    let lon1 = p1.lon;
    let lat2 = p2.lat;
    let lon2 = p2.lon;
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
}
function deg2rad(deg) {
    return deg * (Math.PI/180)
}

function sort_by_distance(channels, position) {
    return channels.sort((a, b) => (
        getDistanceFromLatLoninKm(a.coords, position) >
        getDistanceFromLatLoninKm(b.coords, position)
    ) ? 1 : -1);
}
const GeoSearch = ({state}: {state: State}) => (
    [
        <tr><td colspan={3}>&nbsp;</td></tr>,
        (state.location.lat && state.location.lon) ?
            [
                <tr><th colspan={3}>
                    Channels Near {format_lat_lon(state.location)}:
                </th></tr>,
                <StationList state={state} stations={
                    sort_by_distance(STATIONS_WITH_COORDS, state.location).slice(0, 5)
                } />
            ] : <tr><th colspan={3}>(Can't detect GPS location)</th></tr>
    ]
);

export const VhfChannels = (state: State) => (
    <Screen title={"VHF Channels"} footer={[
        <BackButton/>,
        navigator.geolocation && !state.settings.geo_enabled && <EnableGeoButton />
    ]}>
        <input
            oninput={(state: State, event: MyInputEvent) => ({
                ...state,
                vhf_channels: {
                    search: event.target.value,
                }
            } as State)}
            placeholder={"Search"}
        />
        <table class={"vhf"}>
            {state.vhf_channels.search ?
                <StationList state={state} stations={STATIONS.filter((x) =>
                    (x.name.toLowerCase().indexOf(state.vhf_channels.search.toLowerCase()) !== -1))}
                    /> :
                <tbody>
                    <tr><th colspan={3}>Standard Channels:</th></tr>
                    <StationList state={state} stations={STATIONS.filter((x) => (x.standard))} />
                    {state.location.lat && state.location.lon && <GeoSearch state={state} />}
                </tbody>
            }
        </table>
    </Screen>
);
