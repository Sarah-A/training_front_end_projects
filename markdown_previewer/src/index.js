import React from 'react';
import { render } from "react-dom";
import {Provider, connect } from "react-redux";
import App from './js/components/App.jsx';
import {store} from "./js/store/store";


render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById("app")
);

