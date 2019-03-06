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
        // console.log(`Calculate: ${inputToCalculate} = ${result}`);        
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
            <div id="display-all" className="m-3">
                <p id="display-accumulated" className="m-1 text-info">{this.props.accumulated}</p>
                <p id="display" className="m-1 text-white">{this.props.lastInput}</p>
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
        
        this.loseFocus = this.loseFocus.bind(this);
    }
    
    componentDidMount() {
        this.buttonElement = document.getElementById(this.props.id);
    }

    render() {
        return (
            <button type="button" id={this.props.id} data-eventkey={`${this.props.eventKey}`} className={`key-button ${this.props.className} ${this.props.additionalClasses}`} onClick={this.onClick}>
                {this.props.displayText}
            </button>        
        );
    }

    loseFocus() {
        this.buttonElement.blur();
    }

    onClick() {
        setTimeout(this.loseFocus, 100);
        this.props.onClick(this.props.displayText);
    }
}

//-----------------------------------------------------------------------------
// /src/containers/DisplayText
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

class calculatorKey {
    constructor(eventKey, id, displayText, additionalClasses="") {
        Object.assign(this, {eventKey, id, displayText, additionalClasses});
    }
} 

class digitKey extends calculatorKey{
    constructor(eventKey, id, displayText=eventKey, additionalClasses="digit-key col-4 bg-light") {
        super(eventKey, id, displayText, additionalClasses);
    }
} 

class operatorKey extends calculatorKey{
    constructor(eventKey, id, displayText=eventKey, additionalClasses="w-100 text-light bg-secondary") {
        super(eventKey, id, displayText, additionalClasses);
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
        
        const equalKey = new calculatorKey("Enter", "equals", "=", "col-12 bg-success");
        const backspaceIcon = (<i class="fas fa-backspace"></i>);
        const backspaceKey = new calculatorKey("Backspace", "backspace", backspaceIcon, "w-100 bg-danger");
        const clearAllKey = new calculatorKey("Delete", "clear", "AC", "w-100 bg-danger");
        const decimalPointKey = new calculatorKey(".", "decimal", ".", "col-4 bg-light");

        const numberKeys = [
            new digitKey( "9", "nine"),
            new digitKey( "8", "eight"),
            new digitKey( "7", "seven"),
            new digitKey( "6", "six"),
            new digitKey( "5", "five"),
            new digitKey( "4", "four"),
            new digitKey( "3", "three"),
            new digitKey( "2", "two"),
            new digitKey( "1", "one"),
            new digitKey( "0",  "zero", "0", "col-8  bg-light")
        ];
        
        const operationKeys = [
            new operatorKey( "/", "divide"),
            new operatorKey( "*", "multiply"),
            new operatorKey( "-", "subtract"),
            new operatorKey( "+", "add")
        ];
       

        const numberKeysElements = numberKeys.map( (key) =>             
                (this.getButtonComponent(key, "number", this.handleNumberClick)));
        const operationKeyElements = operationKeys.map( (key) => 
                (this.getButtonComponent(key, "operation", this.handleOperationClick)));

        return (
            <div id="input-keys" className="m-3" >
                <div className="row no-gutters">
                    <div className="col-6">
                        {this.getButtonComponent(clearAllKey, "clear", this.handleClearAll)}
                    </div>
                    <div className="col-6">
                        {this.getButtonComponent(backspaceKey, "backspace", this.handleBackspace)}
                    </div>
                </div>
                <div className="row  no-gutters">
                    <div className="col-9">
                        {numberKeysElements}  
                        {this.getButtonComponent(decimalPointKey, "decimal", this.handleDecimalPoint)}
                    </div>
                    <div className="col-3">
                        {operationKeyElements}      
                    </div>
                </div>
                <div className="row  no-gutters">
                    <div className="col-12">
                        {this.getButtonComponent(equalKey, "equal", this.handleEqualClick)}
                    </div>
                </div>
            </div>
        );
    }

    handleNumberClick(keyCode) {
        this.props.dispatch(processNewDigit(keyCode));
    }

    handleOperationClick(operator) {
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


//-----------------------------------------------------------------------------
//  /src/App.js
//-----------------------------------------------------------------------------

$(window).keydown(function(e) {
    let buttonElement = $("#input-keys").find(`[data-eventKey="${e.key}"]`);    
    if(buttonElement) {
        buttonElement.focus();
        buttonElement.click();
    }
});

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