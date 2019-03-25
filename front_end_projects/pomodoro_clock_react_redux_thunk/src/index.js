"use strict";

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
// accurateInterval library from: https://codepen.io/no_stack_dub_sack/pen/VKJGKd:
//-----------------------------------------------------------------------------
window.accurateInterval = function(time, fn) {
    var cancel, nextAt, timeout, wrapper, _ref;
    nextAt = new Date().getTime() + time;
    timeout = null;
    if (typeof time === 'function') _ref = [time, fn], fn = _ref[0], time = _ref[1];
    wrapper = function() {
      nextAt += time;
      timeout = setTimeout(wrapper, nextAt - new Date().getTime());
      return fn();
    };
    cancel = function() {
      return clearTimeout(timeout);
    };
    setTimeout(wrapper, nextAt - new Date().getTime());
    return {
      cancel: cancel
    };
  };


//-----------------------------------------------------------------------------
// src/utils
//-----------------------------------------------------------------------------

function isNumeric(val) {
    return !isNaN(val);
}

function minutesToSeconds(minutes) {
    return (minutes * 60);
}

function secondsForDispaly(seconds) {
    return {
        minutes: (Math.floor(seconds / 60)).toString().padStart(2, "0"),
        seconds: (seconds % 60).toString().padStart(2, "0")
    }
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

function resetSettingsAction() {
    return {
        type: RESET_SETTINGS
    };
}


function changeTimerLength(timerType, value) {
    return function (dispatch, getState) {
        console.log(` in changeTimerLength with: ${timerType},${value}`);

        let timerLength = getTimerLength(timerType, getState());
        let newTimerLength = timerLength;

        if (value === "increment") {
            newTimerLength += 1;
        }
        else if (value === "decrement") {
            newTimerLength -= 1;
        }
        else if (isNumeric(value)) {
            newTimerLength = Number(value);
        }

        if ((newTimerLength != timerLength) &&
            (newTimerLength < 61) &&
            (newTimerLength > 0)) {
            console.log(`old timer: ${timerLength}, new timer: ${newTimerLength}`);
            dispatch(changeTimerLengthAction(timerType, newTimerLength));
        }
    }
}

function resetSettings() {
    return function (dispatch, getState) {
        dispatch(resetSettingsAction());
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
    switch (action.type) {
        case CHANGE_TIMER_LENGTH:
            const timerLengthToMerge = (action.timerType === SESSION_TIMER) ?
                { sessionLength: action.newLength } :
                { breakLength: action.newLength };
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
    switch (timerType) {
        case SESSION_TIMER:
            return state.clock.sessionLength;
        case BREAK_TIMER:
            return state.clock.breakLength;
        default:
            throw new Error(`Invalid timerType in getTimerLength: ${timerType}`);
    }
}

function getTimerLabel(timerType) {

    switch(timerType) {
        case SESSION_TIMER:
        default:
            return 'Session';
        case BREAK_TIMER:
            return 'Break';
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
    render() {
        return (
            <button type="button" id="sidebar-toggler-button" className="btn btn-outline-info rounded-0 h-100 mr-3 text-large"
                data-toggle="collapse" data-target="#clock-sidebar" aria-expanded="false" aria-controls="clock-sidebar">
                <i className="fas fa-angle-right"></i>
            </button>
        );
    }
}

//-----------------------------------------------------------------------------
// src/components/ButtonView
//-----------------------------------------------------------------------------
class ButtonView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button className="btn btn-outline-info" id={this.props.id} type="button" onClick={this.onClick} value={this.props.value} aria-label={this.props.ariaLabel}>
                {this.props.icon}
            </button>
        );
    }

    onClick = (e) => {
        this.props.onClick(e.currentTarget.value);
    }
}

//-----------------------------------------------------------------------------
// src/componenets/TimerSettingsView
//-----------------------------------------------------------------------------
class TimerSettingsView extends React.Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        const timerTypeLabel = this.props.timerTypeLabel;
        const timerType = timerTypeLabel.charAt(0).toLowerCase() + timerTypeLabel.slice(1);
        const incrementDecrementButton = (type, icon) => {
            return (
                <ButtonView onClick={this.onChangeClick} 
                                    id = {`${timerType}-${type}`}
                                    value={type} 
                                    ariaLabel={`${type} timer`}
                                    icon = {<i className={icon}></i>} />
        );}

        return (
            <div>
                <label id={`${timerType}-label`} htmlFor={`${timerType}-length`}>{timerTypeLabel} Length</label>
                <div className="input-group">
                    <div className="input-group-prepend">
                        {incrementDecrementButton("decrement", "fas fa-angle-down")}
                    </div>
                    <input type="text" id={`${timerType}-length`} className="form-control" value={this.props.timerLength} onChange={this.handleChange}></input>
                    <div className="input-group-append">
                        {incrementDecrementButton("increment", "fas fa-angle-up")}                                                
                    </div>
                </div>
            </div>
        );
    }

    onChangeClick = (value) => {
        console.log(`Up/Down Change Timer Button Clicked: ${value}`);
        this.props.handleChange(value);
    }

    handleChange = (e) => {
        console.log(`Timer Length Changed to: ${e.currentTarget.value}`);
        this.props.handleChange(e.currentTarget.value);
    }
}

//-----------------------------------------------------------------------------
//  src/containers/Clock.js
//-----------------------------------------------------------------------------
class Clock extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentTimer: SESSION_TIMER,
            leftInSeconds: minutesToSeconds(this.props.sessionLength),
            isTimerRunning: false
        };

    }

    render() {
       
        let startPauseButtonAriaLabel, startPauseButtonIcon;

        const timeLeftDisplay = secondsForDispaly(this.state.leftInSeconds);
        if (this.state.isTimerRunning) {
            startPauseButtonAriaLabel = "Pause timer";
            startPauseButtonIcon = <i className="fas fa-pause"></i>;
        }
        else {
            startPauseButtonAriaLabel = "Start timer";
            startPauseButtonIcon = <i className="fas fa-play"></i>
        }

        const breakOnlyClass = this.state.currentTimer === BREAK_TIMER ? "break" : "";

        return (
            <div id="clock" className={`m-auto d-flex flex-column align-items-center ${breakOnlyClass}`}>
                <h1 id="timer-label">{getTimerLabel(this.state.currentTimer)}</h1>
                <p className="h2" id="time-left">{timeLeftDisplay.minutes}:{timeLeftDisplay.seconds}</p>
                <audio id="beep">
                    <source src="https://goo.gl/65cBl1" type="audio/mpeg" />
                </audio>
                <div className="d-flex w-100 mt-5">
                    <ButtonView onClick={this.onStartPauseClick} 
                                id="start_stop"
                                value="" 
                                ariaLabel={startPauseButtonAriaLabel} 
                                icon = {startPauseButtonIcon} />
                    <ButtonView onClick={this.onStopClick} 
                                id="stop"
                                value="stop" 
                                ariaLabel="stop timer" 
                                icon = {<i className="fas fa-stop"></i>} />
                    <ButtonView onClick={this.onResetClick} 
                                id="reset"
                                value="reset" 
                                ariaLabel="reset all timers" 
                                icon = {<i className="fas fa-sync-alt"></i>} />
                </div>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if(!this.state.isTimerRunning && (prevProps.sessionLength !== this.props.sessionLength)) {
            this.initLeftInSeconds();
        }
    }

    componentDidMount() {
        this.alarmElement = $("#beep");
    }

    playAlarm = () => {
        this.alarmElement.trigger("play");
    }

    stopAlarm = () => {
        this.alarmElement.trigger("pause");
        this.alarmElement.currentTime = 0;
    }

    resetTimers = (callback = ()=>{}) => {
        this.stopAlarm();
        this.setState({
            currentTimer: SESSION_TIMER,
            leftInSeconds: minutesToSeconds(this.props.sessionLength),
            isTimerRunning: false
            },
            callback
        );
    }

    onResetClick = () => {
        this.resetTimers(()=>{
            this.props.dispatch(resetSettings());
        });  
    }

    timerStartPauseCallback = () => {
        if (this.state.isTimerRunning) {
            console.log(`time started!`);
            this.timerTickCallback();
        }
        else {
            console.log(`time paused!`);
        }
    }

    onStopClick = () => {
        this.resetTimers();
    }

    onStartPauseClick = () => {
        this.setState({
            isTimerRunning: !(this.state.isTimerRunning)
        },
            this.timerStartPauseCallback        // Note: since setState is asynchronous, we can't know when it will execute and therefore,
                                                // we must continue its processing using a callback.
        );
    }

    timerTickCallback = () => {
        console.log(`in Timer tick callback. Time left: ${this.state.leftInSeconds}`);

        if (this.state.leftInSeconds === 0) {
            this.handleTimerExpiry();
        }

        accurateInterval(this.onTimerTick, 1000);
    }

    onTimerTick = () => {

        if (!this.state.isTimerRunning) {
            return;
        }

        this.setState({
            leftInSeconds: this.state.leftInSeconds - 1
            },
            this.timerTickCallback
        );
    }

    getNextTimer = () => {
        if(this.state.currentTimer == SESSION_TIMER) {
            return BREAK_TIMER;
        }
        else {
            return SESSION_TIMER;
        }    
    }

    getCurrentTimerLength = () => {
        return ( (this.state.currentTimer === SESSION_TIMER) ?
                 this.props.sessionLength :
                 this.props.breakLength);
    }

    handleTimerExpiry = () => {

        this.playAlarm();
        
        this.setState({
            currentTimer: this.getNextTimer()
            },
            this.initLeftInSeconds);
    }

    initLeftInSeconds = () => {        
        this.setState({
            leftInSeconds: minutesToSeconds(this.getCurrentTimerLength())
        });
    }
}

function mapStateToClockProps(state) {
    return {
        sessionLength: getTimerLength(SESSION_TIMER, state),
        breakLength: getTimerLength(BREAK_TIMER, state)
    };
}

const ConnectedClock = connect(mapStateToClockProps)(Clock);

//-----------------------------------------------------------------------------
// src/containters/ClockSettings.js
//-----------------------------------------------------------------------------

class ClockSettings extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="clock-sidebar" className="collapse p-2">
                <TimerSettingsView timerTypeLabel={getTimerLabel(SESSION_TIMER)} timerLength={this.props.sessionLength} handleChange={this.handleChangeSessionTimer} />
                <TimerSettingsView timerTypeLabel={getTimerLabel(BREAK_TIMER)} timerLength={this.props.breakLength} handleChange={this.handleChangeBreakTimer} />
            </div>
        );
    }

    handleChangeBreakTimer = (newValue) => {
        this.props.dispatch(changeTimerLength(BREAK_TIMER, newValue));
    }

    handleChangeSessionTimer = (newValue) => {
        this.props.dispatch(changeTimerLength(SESSION_TIMER, newValue));
    }

}

function StateToSettingsProps(state) {
    return {
        sessionLength: getTimerLength(SESSION_TIMER, state),
        breakLength: getTimerLength(BREAK_TIMER, state)
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
