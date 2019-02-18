import React from 'react';
import { render } from "react-dom";
import {Provider, connect } from "react-redux";
import Panels from './js/components/panels.jsx';
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



const panels = document.getElementById("main-wrapper");
if(panels != undefined) {
    console.log("Found panels!!");
    render(
        <Provider store={store}>
            <Panels />
        </Provider>, 
        panels);    
}
else {
    console.log("Couldn't find panels id!!!");
}
// panels ? ReactDOM.render(<h1>React Rendering is working!</h1>, panels) : console.log("Couldn't find panels id!!!");