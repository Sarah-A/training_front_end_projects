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
    return state;
}

export const store = createStore(reducer);

function mapStateToProps(state) {
    return {
        input: state.input
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateInput: (input) => dispatch(updateInput(input))
    };
}

export const ConnectPanelToStore = connect(mapStateToProps, null);




