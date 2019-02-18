import React from 'react';
import { render } from "react-dom";
import {Provider, connect } from "react-redux";
import App from './js/components/App.jsx';
import {store} from "./js/store/store";

// $(".panel").draggable({
//     containment: "#panels-wrapper",
//     opacity: 0.35,
//     // snap: true,
//     // // snapTolerance: 100
//     // snapMode: "outer"
// }).resizable({
//     containment: "#panels-wrapper"
// });

// function makePanelsDraggable() {
//     $(".panel").draggable({
//         containment: "#panels-wrapper",
//         opacity: 0.35,
//         // snap: true,
//         // // snapTolerance: 100
//         // snapMode: "outer"
//     }).resizable({
//         containment: "#panels-wrapper"
//     });
// }


render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById("app")
);

