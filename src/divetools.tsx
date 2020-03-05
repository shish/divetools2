/// <reference path='./globals.d.ts'/>
import {app} from "hyperapp";
import {State, state} from "./state";
import {view} from "./view";

let loaded_state: State = state;
try {
    let saved_state = JSON.parse(window.localStorage.getItem("state") || "{}");
    loaded_state = {...loaded_state, ...saved_state};
}
catch(err) {
    console.log("Error loading state:", err);
}

app({init: loaded_state, view: view, node: document.body});
