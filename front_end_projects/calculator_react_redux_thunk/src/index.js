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
// /src/store/calculator/actionTypes.js
//-----------------------------------------------------------------------------

const EMPTY_LAST = 'calculator.EMPTY_LAST';
const BACKSPACE_LAST = 'calculator.BACKSPACE_LAST';
const UPDATE_LAST = 'calculator.UPDATE_LAST';
const UPDATE_ACCUMULATED = 'calculator.UPDATE_ACCUMULATED';
const UPDATE_RESULT = 'calculator.UPDATE_RESULT';
const ACCUMULATE_RESULT = 'calculator.ACCUMULATE_RESULT';
const CLEAR_ALL = 'calculator.CLEAR_ALL';


//-----------------------------------------------------------------------------
// /src/store/calculator/actions.js
//-----------------------------------------------------------------------------

function isNumeric(val) {
    return !isNaN(val);
}

function isOperation(key) {
    switch(key) {
        case "+":
        case "-":
        case "/":
        case "*":
            return true;
        default:
            return false;
    }
}

function isDecimalNumber(numAsStr) {
    if( numAsStr.indexOf(".") !== -1) {
        return true;
    }
    else {
        return false;
    }
}

//---------------------------------------------------------------
// Actions' Creators:
//---------------------------------------------------------------
function updateAccumulated() {
    return { 
        type: UPDATE_ACCUMULATED 
    };
}

function clearAll() {
    return { 
        type: CLEAR_ALL         
    };
}

function emptyLast() {
    return {
        type: EMPTY_LAST
    };
}

function updateLast(key) {
    return { 
        type: UPDATE_LAST,
        newChar: key 
    };
}

function updateResult(result) {
    return {
        type: UPDATE_RESULT,
        result
    };
}

function accumulteResult() {
    return {
        type: ACCUMULATE_RESULT
    };
}

function backspaceLast() {
    return {
        type: BACKSPACE_LAST
    };
}

//---------------------------------------------------------------
// Thunks:
//---------------------------------------------------------------


function processNewDigit(newInput) {
    return function(dispatch, getState){
        const lastState = getState();
        const lastInput = getLastInput(lastState);     

        console.log(`In processNewDigit with: ${lastInput}, ${newInput}`);

        if(isCalculationDone(lastState)) {
            dispatch(clearAll());
            dispatch(emptyLast());
        }
        else if( isOperation(lastInput)) {
            dispatch(updateAccumulated());
        }
        else if(lastInput === "0") {
            dispatch(emptyLast());
        }
        
        dispatch(updateLast(newInput));
    }
}

function processDecimalPoint() {
    return function (dispatch, getState) {
        let lastInput = getLastInput(getState());
        let newInput = ".";

        if(isDecimalNumber(lastInput)) {
            return;
        }

        if(!isNumeric(lastInput) || (Number(lastInput) === 0)) {
            newInput = "0.";            
        }

        dispatch(processNewDigit(newInput));
    }
}

function processNewOperator(operator) {
    return function(dispatch, getState) {
        const lastInput = getLastInput(getState());

        console.log(`In processNewOperator with: ${lastInput}, ${operator}`);

        if(isNumeric(lastInput)) {
            dispatch(updateAccumulated());
        }
        else if(isOperation(lastInput)) {
            dispatch(emptyLast());
        }
        else if(isCalculationDone(getState())) {            
            dispatch(accumulteResult());
        }
        dispatch(updateLast(operator));
        
    }
}

function processEqualKey() {
    return function(dispatch, getState) {
        let state = getState();
        const lastInput = getLastInput(state);
        let inputToCalculate = getAccumulated(state); 

        if(isCalculationDone(state)) {            
            return;
        }
        
        if(isOperation(lastInput)) {
            dispatch(emptyLast());
        }
        else {
            inputToCalculate += lastInput;
        }

        const result = eval(inputToCalculate);
        console.log(`Calculate: ${inputToCalculate} = ${result}`);        
        dispatch(updateResult(result));
        
    }
}

function processClearAllKey() {
    return function(dispatch, getState) {
        dispatch(clearAll());
    }
}

function processBackspace() {
    return function(dispatch, getState) {
        const lastInput = getLastInput(getState());
        if(isNumeric(lastInput)) {
            dispatch(backspaceLast());
        }

    }
}


//-----------------------------------------------------------------------------
// /src/store/calculator/reducer.js
//-----------------------------------------------------------------------------
const defaultCalculatorState = Immutable({
    accumulatedInput: "",
    lastInput: "0",
    result: 0
});



function calculatorReducer(state = defaultCalculatorState, action) {
    switch(action.type) {
        case EMPTY_LAST:
            return state.merge({
                lastInput: ""
            })
        case BACKSPACE_LAST:
            return state.merge( (state.lastInput.length > 1) ?
                { lastInput: state.lastInput.slice(0,state.lastInput.length-1) } :
                { lastInput: "0" });
        case UPDATE_LAST:
            return state.merge({
                lastInput: state.lastInput + action.newChar
            });
        case UPDATE_ACCUMULATED:
            return state.merge({
                accumulatedInput: (state.accumulatedInput + state.lastInput),
                lastInput: ""
            });
        case UPDATE_RESULT:
            return state.merge({      
                accumulatedInput: (state.accumulatedInput + state.lastInput),     
                lastInput: "=",
                result: action.result
            });
        case ACCUMULATE_RESULT:
            return state.merge({
                accumulatedInput: state.result.toString(),
                lastInput: "",
                result: 0
            })
        case CLEAR_ALL:
            return state.merge({
                accumulatedInput: "",
                lastInput: "0",
                result: 0
            })
        default:
            return state;
    }
}


//--------------------------------
// Selectors:
//--------------------------------

function getAccumulated(state) {
    return state.calculator.accumulatedInput;
}

function getAccumulatedForDisplay(state) {    
    if(isCalculationDone(state)) {
        return (state.calculator.accumulatedInput + "=" + state.calculator.result);
    }
    else if(state.calculator.accumulatedInput.length > 0) {
        return (state.calculator.accumulatedInput + state.calculator.lastInput);
    }
}

function getLastForDisplay(state) {    
    
    if(isCalculationDone(state)) {
        return state.calculator.result;
    }
    else {
        return state.calculator.lastInput;
    }
}

function getLastInput(state) {
    return state.calculator.lastInput;
}

function isCalculationDone(state) {
    return (state.calculator.lastInput === "=");
}

//-----------------------------------------------------------------------------
// src/stor/reducers.js
//-----------------------------------------------------------------------------

const reducers = {
    calculator: calculatorReducer
};

//-----------------------------------------------------------------------------
// /src/componenets/DisplayView
//-----------------------------------------------------------------------------
class DisplayView extends React.Component {
    render() {        
        return (
            <div id="display-all">
                <p id="display-accumulated">{this.props.accumulated}</p>
                <p id="display">{this.props.lastInput}</p>
            </div>            
        );
    }
}

//-----------------------------------------------------------------------------
// /src/components/CalculatorButton
//-----------------------------------------------------------------------------

class CalculatorButton extends React.Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    render() {
        console.log(`creating a button: id: ${this.props.id} key: ${this.props.eventKey}`)
        return (
            <button id={this.props.id} eventkey={`${this.props.eventKey}`} className={`key-button ${this.props.className}`} onClick={this.onClick}>
                {this.props.display}
            </button>        
        );
    }

    onClick() {
        this.props.onClick(this.props.display);
    }
}

//-----------------------------------------------------------------------------
// /src/containers/Display
//-----------------------------------------------------------------------------
class CalculatorDisplay extends React.Component {
    render() {
        return (
            <DisplayView accumulated={this.props.accumulated} lastInput={this.props.lastInput} />
        );
    }
}

function mapStateToProps(state) {
    return {
        accumulated: getAccumulatedForDisplay(state),
        lastInput: getLastForDisplay(state)
    };
}

const ConnectedDisplay = connect(mapStateToProps)(CalculatorDisplay);

//-----------------------------------------------------------------------------
// /src/containers/CalculatorInput
//-----------------------------------------------------------------------------
const KEY = "KEY_CHAR";
const ID = "ID";

class calculatorKey {
    constructor(eventKey, id, display) {
        Object.assign(this, {eventKey, id, display});     
    }
} 
 
class CalculatorInput extends React.Component {

    constructor(props) {
        super(props);
        this.handleNumberClick = this.handleNumberClick.bind(this);
        this.handleOperationClick = this.handleOperationClick.bind(this);
        this.handleEqualClick = this.handleEqualClick.bind(this);
        this.handleDecimalPoint = this.handleDecimalPoint.bind(this);
        this.handleClearAll = this.handleClearAll.bind(this);
        this.handleBackspace = this.handleBackspace.bind(this);

    }

    getButtonComponent(key, type, handler) {        
        return (
        <CalculatorButton {...key} key={key.id} className={`${type}-button`} onClick={handler} />
        );
    }

    render() {
        
        const equalKey = new calculatorKey("Enter", "equals", "=");
        const backspaceKey = new calculatorKey("Backspace", "backspace", "<=");
        const clearAllKey = new calculatorKey("Delete", "clear", "AC");
        const decimalPointKey = new calculatorKey(".", "decimal", ".");

        const numberKeys = [
            new calculatorKey( "0",  "zero", "0"),
            new calculatorKey( "1", "one", "1"),
            new calculatorKey( "2", "two", "2"),
            new calculatorKey( "3", "three", "3"),
            new calculatorKey( "4", "four", "4"),
            new calculatorKey( "5", "five", "5"),
            new calculatorKey( "6", "six", "6"),
            new calculatorKey( "7", "seven", "7"),
            new calculatorKey( "8", "eight", "8"),
            new calculatorKey( "9", "nine", "9")
        ];
                   
        const operationKeys = [
            new calculatorKey( "/", "divide", "/"),
            new calculatorKey( "*", "multiply", "*"),
            new calculatorKey( "-", "subtract", "-"),
            new calculatorKey( "+", "add", "+")
        ];
       

        const numberKeysElements = numberKeys.map( (key) =>             
                (this.getButtonComponent(key, "number", this.handleNumberClick)));
        const operationKeyElements = operationKeys.map( (key) => 
                (this.getButtonComponent(key, "operation", this.handleOperationClick)));

        return (
            <div id="input-keys">
                {numberKeysElements}  
                {this.getButtonComponent(decimalPointKey, "decimal", this.handleDecimalPoint)}
                {operationKeyElements}  
                {this.getButtonComponent(equalKey, "equal", this.handleEqualClick)}
                {this.getButtonComponent(clearAllKey, "clear", this.handleClearAll)}
                {this.getButtonComponent(backspaceKey, "backspace", this.handleBackspace)}
            </div>
        );
    }

    handleNumberClick(keyCode) {
        console.log(`${keyCode} Clicked!!`);
        this.props.dispatch(processNewDigit(keyCode));
    }

    handleOperationClick(operator) {
        console.log(`${operator} Clicked!!`);
        this.props.dispatch(processNewOperator(operator));
    }
    
    handleEqualClick() {
        this.props.dispatch(processEqualKey());        
    }
    
    handleDecimalPoint() {
        this.props.dispatch(processDecimalPoint());
    }

    handleClearAll() {
        this.props.dispatch(processClearAllKey());
    }

    handleBackspace() {
        this.props.dispatch(processBackspace());
    }
}

const ConnectedInput = connect()(CalculatorInput);

$(window).keydown(function(e) {
    const buttonElement = $("#input-keys").find(`[eventKey="${e.key}"]`);
    if(buttonElement) {
        buttonElement.click();
    }
});

//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
//  /src/App.js
//-----------------------------------------------------------------------------
class App extends React.Component {
    render() {
        return (
            <div className="calculator rounded">
                <ConnectedDisplay />
                <ConnectedInput />
            </div>
        );
    }
}

//export defult App;



//-----------------------------------------------------------------------------
//  /src/index.js
//-----------------------------------------------------------------------------
const store = createStore(combineReducers(reducers), applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);