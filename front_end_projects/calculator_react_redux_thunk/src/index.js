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
//      I have to use only one .js file. Therefore, all teh js code is in 
//      this single file. However, in order to show the design, I use comments
//      to show where every part of the code should be in a real project
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
// /src/store/calculator/actionTypes.js
//-----------------------------------------------------------------------------

const CLEAR_LAST = 'calculator.CLEAR_LAST';
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

function ClearLast() {
    return {
        type: CLEAR_LAST
    };
}

function updateLast(newKey) {
    return { 
        type: UPDATE_LAST,
        newChar: newKey 
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

//---------------------------------------------------------------
// Thunks:
//---------------------------------------------------------------


function processNewDigit(newKey) {
    return function(dispatch, getState){
        const lastState = getState();
        const lastInput = getLastInput(lastState);     

        console.log(`In processNewDigit with: ${lastInput}, ${newKey}`);

        if(isCalculationDone(lastState)) {
            dispatch(clearAll());
            dispatch(ClearLast());
        }        

        if(lastInput === "0") {
            dispatch(ClearLast());
        }
        
        if( isOperation(lastInput)) {
            dispatch(updateAccumulated());
        }
        
        dispatch(updateLast(newKey));
    }
}

function processDecimalPoint() {
    return function (dispatch, getState) {
        let lastInput = getLastInput(getState());
        let newInput = ".";

        if(lastInput.indexOf(".") !== -1) {
            return;
        }

        if(Number(lastInput) === 0) {
            newInput = "0.";
            dispatch(ClearLast());
        }
        dispatch(updateLast(newInput));
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
            dispatch(ClearLast());
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
        if(isCalculationDone(state)) {            
            return;
        }
        else 
        {
            let inputToCalculate = getAccumulated(state); 
            if(isOperation(lastInput)) {
                dispatch(ClearLast());
            }
            else {
                inputToCalculate += lastInput;
            }

            console.log(`Calculate: ${inputToCalculate}`);
            const result = eval(inputToCalculate);
            console.log(`In process calculate. result = ${result}`);
            dispatch(updateResult(result));
        }
    }
}

function processClearAllKey() {
    return function(dispatch, getState) {
        dispatch(clearAll());
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
        case CLEAR_LAST:
            return state.merge({
                lastInput: ""
            })
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
    console.log(`in getAccumulatedForDisplay with (${state.calculator.accumulatedInput.toString().length}): ${state.calculator.accumulatedInput}`);
    console.log(typeof(state.calculator.accumulatedInput));
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

// function getResult(state) {
//     return state.calculator.result;
// }

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
            <div className="display">
                <p id="display-accumulated text-secondary">{this.props.accumulated}</p>
                <p id="display-last">{this.props.lastInput}</p>
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
        return (
            <button id={this.props.id} className={`key-button ${this.props.className}`} onClick={this.onClick}>{this.props.display}</button>        
        );
    }

    onClick() {
        this.props.onClick(this.props.keyChar);
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

    render() {
        const equalKey = {
            keyChar: "=",
            id: "equals",
            display: "="
        };

        const clearAllKey = {
            keyChar: "\0x7F" ,
            id: "clear_all",
            display: "AC"
        };

        const numberKeys = [
            { 
              keyChar: "0",
              id: "zero",
              display: "0" 
            },
            { 
                keyChar: "1",
                id: "one",
                display: "1" 
            },
            { 
                keyChar: "2",
                id: "two",
                display: "2" 
            },           
            // "2" : {
            //     ID: "two"
            // },
            // "3" : {
            //     ID: "three"
            // },
            // "4" : {
            //     ID: "four"
            // },
            // "5" : {
            //     ID: "five"
            // },
            // "6" : {
            //     ID: "six"
            // },
            // "7" : {
            //     ID: "seven"
            // },
            // "8" : {
            //     ID: "eight"
            // },
            // "9" : {
            //     ID: "nine"
            // },
            // "=" : {
            //     ID: "equals"
            // }
        ];
        const operationKeys = [
            {
                keyChar: "+",
                id: "add",
                display: "+"             
            },
            // "-" : {
            //     ID: "subtract"
            // },
            {
                keyChar: "*",
                id: "multiply",
                display: "*"
            }
            // "/" : {
            //     ID: "divide"
            // },
            // "." : {
            //     ID: "decimal"
            // },
            // "\0x7F" : {
            //     ID: "clear_ALL            "
            // },
            // "\0x08" : {
            //     ID: "backspace"
            // }         
        ];

        const numberKeysElements = numberKeys.map( (key) => (
            <CalculatorButton id={key.id} key={key.id} className="number-button" keyChar={key.keyChar} display={key.display} onClick={this.handleNumberClick} />
        ));
        const operationKeyElements = operationKeys.map( (key) => (
            <CalculatorButton id={key.id} key={key.id} className="operation-button" keyChar={key.keyChar} display={key.display} onClick={this.handleOperationClick} />
        ));

        return (
            <div className="input-keys">
                {numberKeysElements}  
                {operationKeyElements}  
                <CalculatorButton id={equalKey.id} key={equalKey.id} className="equal-button" keyChar={equalKey.keyChar} display={equalKey.display} onClick={this.handleEqualClick} />
                <CalculatorButton id={clearAllKey.id} key={clearAllKey.id} className="clear-button" keyChar={clearAllKey.keyChar} display={clearAllKey.display} onClick={this.handleClearAll} />
            </div>
        );
    }

    handleNumberClick(keyChar) {
        console.log(`${keyChar} Clicked!!`);
        this.props.dispatch(processNewDigit(keyChar));
    }

    handleOperationClick(operator) {
        console.log(`${operator} Clicked!!`);
        this.props.dispatch(processNewOperator(operator));
    }
    
    handleEqualClick() {
        this.props.dispatch(processEqualKey());        
    }
    
    handleDecimalPoint() {}

    handleClearAll() {
        this.props.dispatch(processClearAllKey());
    }

    handleBackspace() {}
}

const ConnectedInput = connect()(CalculatorInput);

//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
//  /src/App.js
//-----------------------------------------------------------------------------
class App extends React.Component {
    render() {
        return (
            <div className="calculator">
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