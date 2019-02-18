import {createStore} from "redux";
import { connect } from "react-redux";

const UPDATE = "UPDATE";

export function updateInput(input) {
    return {
        type: UPDATE,
        input
    };
}

export function loadDefaultState() {
    $.ajax({
        url: "./src/js/store/default_input.txt",
        success: function(input) {
            store.dispatch(updateInput(input));
        }
    });
}

const defaultState = {
    input: ""
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
loadDefaultState();

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






