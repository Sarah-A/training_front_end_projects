import {createStore} from "redux";
import { connect } from "react-redux";

const UPDATE = "UPDATE";

export function updateInput(input) {
    return {
        type: UPDATE,
        input
    };
}

const defaultState = {
    input: "#Header 1 \n ##Header 2 \n normal text :-)"
};

function reducer(state = defaultState, action) {
    switch (action.type) {
        case UPDATE:
            return {input: action.input};
        default:
            return state;
    }
}

export const store = createStore(reducer);

export function mapStateToProps(state) {
    return {
        input: state.input
    };
}

export function mapDispatchToProps(dispatch) {
    return {
        updateInput: (input) => dispatch(updateInput(input))
    };
}






