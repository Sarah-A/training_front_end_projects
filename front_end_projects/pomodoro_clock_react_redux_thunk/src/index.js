// For CodePen:
// const {createStore, combineReducers, applyMiddleware} = Redux;
// const {Provider, connect } = ReactRedux;
// const thunk = ReduxThunk.default;

// For PC Environment:

import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk'
import ReactDOM from 'react-dom';
import Immutable from 'seamless-immutable';

//-----------------------------------------------------------------------------
// Notes:
//  * Since the project requires that I create this project as a codePen,
//      I have to use only one .js file. Therefore, all the js code is in 
//      this single file. However, in order to show the design, I use comments
//      to show where every part of the code should be in a real project
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
// src/utils
//-----------------------------------------------------------------------------

function isNumeric(val) {
    return !isNaN(val);
}

//-----------------------------------------------------------------------------
// src/store/reducers/clock/actionTypes.js
//-----------------------------------------------------------------------------
const CHANGE_TIMER_LENGTH = 'clock.CHANGE_TIMER_LENGTH';
const RESET_SETTINGS = 'clock.RESET_SETTINGS';
//-----------------------------------------------------------------------------
// src/store/reducers/clock/actions.js
//-----------------------------------------------------------------------------
function changeTimerLengthAction(timerType, newLength) {
    return {
        type: CHANGE_TIMER_LENGTH,
        timerType,
        newLength
    };
}


function changeTimerLength(timerType, value) {
    return function(dispatch, getState) {
        console.log(` in changeTimerLength with: ${timerType},${value}`);

        let timerLength = getTimerLength(timerType, getState());
        let newTimerLength = timerLength;

        if(value === "increment") {
            newTimerLength += 1;
        }
        else if( value === "decrement") {
            newTimerLength -= 1;
        }
        else if(isNumeric(value)) {
            newTimerLength = Number(value);
        }
        
        
        if( (newTimerLength != timerLength) && 
        (newTimerLength < 61) && 
        (newTimerLength > 0 )) {
            console.log(`old timer: ${timerLength}, new timer: ${newTimerLength}`);
            dispatch(changeTimerLengthAction(timerType, newTimerLength));
        }
    }
}

//-----------------------------------------------------------------------------
// src/store/reducers/clock/reducer.js
//-----------------------------------------------------------------------------

const SESSION_TIMER = 'clock.SESSION_TIMER';
const BREAK_TIMER = 'clock.BREAK_TIMER';

const defaultClockState = Immutable({
    sessionLength: 25,
    breakLength: 5
});


function clockReducer(state = defaultClockState, action) {
    switch(action.type) {
        case CHANGE_TIMER_LENGTH:
            const timerLengthToMerge = (action.timerType === SESSION_TIMER) ?
                                {sessionLength: action.newLength} :
                                {breakLength: action.newLength};
            return state.merge(timerLengthToMerge);
        case RESET_SETTINGS:
            return state.merge(defaultClockState);
        default:
            return state;
    }
}

//--------------------------------
// Selectors:
//--------------------------------

function getTimerLength(timerType, state) {
    switch(timerType) {
        case SESSION_TIMER:
            return state.clock.sessionLength;
        case BREAK_TIMER:
            return state.clock.breakLength;
        default:
            throw new Error(`Invalid timerType in getTimerLength: ${timerType}`);
    }
}

//-----------------------------------------------------------------------------
// src/store/reducers.js
//-----------------------------------------------------------------------------

const reducers = {
    clock: clockReducer
};

//-----------------------------------------------------------------------------
// src/components/TogglePanel
//-----------------------------------------------------------------------------
class TogglePanel extends React.Component {
    render () {
        return (
            <button type="button" id="sidebar-toggler-button" className="btn btn-outline-info rounded-0 h-100 mr-3 text-large" 
                                data-toggle="collapse" data-target="#clock-sidebar" aria-expanded="false" aria-controls="clock-sidebar">
                            <i className="fas fa-angle-right"></i>
                        </button>
        );    
    }
}

//-----------------------------------------------------------------------------
//  src/containers/Clock.js
//-----------------------------------------------------------------------------
class Clock extends React.Component {
    render() {
        return (
            <div id="clock">
                <p>Pomodoro Clock...</p>
                <p>{this.props.sessionLength} , {this.props.breakLength}</p>
            </div>
        );
    }
}

function mapStateToClockProps(state) {
    return {
        sessionLength: getTimerLength(SESSION_TIMER, state),
        breakLength: getTimerLength(BREAK_TIMER,state)
    };
}

const ConnectedClock = connect(mapStateToClockProps)(Clock);

//-----------------------------------------------------------------------------
// src/containters/ClockSettings.js
//-----------------------------------------------------------------------------

class ClockSettings extends React.Component {

    constructor(props) {
        super(props);

        this.handleChangeBreakTime = this.handleChangeBreakTime.bind(this);
    }

    render() {
        return (
            <div id="clock-sidebar" className="collapse">
                <label id="break-label" htmlFor="break-length">Break Length</label>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <button className="btn btn-outline-info" type="button" value="decrement" aria-label="decrement time" onClick={this.handleChangeBreakTime}>
                            <i className="fas fa-angle-down"></i>
                        </button>
                    </div>
                    <input type="text" id="break-length" className="form-control" value={this.props.breakLength} onChange={this.handleChangeBreakTime} placeholder=""></input>
                    <div className="input-group-append">
                        <button className="btn btn-outline-info" type="button" value="increment" arial-label="increment time">
                            <i className="fas fa-angle-up"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    handleChangeBreakTime(e) {
        // Extend time in store.
        console.log(`Change Break Time Button Clicked: ${e.currentTarget.value}`);
        this.props.dispatch(changeTimerLength(BREAK_TIMER, e.currentTarget.value));
    }
}

function StateToSettingsProps(state) {
    return {
        sessionLength: getTimerLength(SESSION_TIMER, state),
        breakLength: getTimerLength(BREAK_TIMER,state)  
    };
}

const ConnectedClockSettings = connect(StateToSettingsProps)(ClockSettings);

//-----------------------------------------------------------------------------
// src/App.js - the main React.Component of the application
//-----------------------------------------------------------------------------

class App extends React.Component {
    render() {
        return (
            <div id="pomodoro" className="d-flex align-items-center border border-info">
                <ConnectedClockSettings />
                <TogglePanel />
                <ConnectedClock />
            </div>
        );
    }
}


//-----------------------------------------------------------------------------
// src/index.js - create the store and connect it to the App
//-----------------------------------------------------------------------------

const store = createStore(combineReducers(reducers), applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app")
);