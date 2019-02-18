import {createStore} from "redux";

const UPDATE = "UPDATE";

const defaultState = {
    input: "#Header 1 \n ##Header 2 \n normal text :-)"
};

function reducer(state = defaultState, action) {
    return state;
}

export const store = createStore(reducer);


export function mapStateToProps(state) {
    return {
        input: state.input
    };
}

