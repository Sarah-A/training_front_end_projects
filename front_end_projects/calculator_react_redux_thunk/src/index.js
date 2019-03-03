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
const UPDATE_LAST = 'calculator.UPDATE_LAST';
const UPDATE_ACCUMULATED = 'calculator.UPDATE_ACCUMULATED';
const CALCULATE = 'calculator.CALCULATE';


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
// Thunks:
//---------------------------------------------------------------
function processNewDigit(newKey) {
    return function(dispatch, getState){
        let lastInput = getLastInput(getState());     
        
        if(isNumeric(newKey) && isNumeric(lastInput))
        { 
            lastInput = Number(lastInput + newKey).toString();                
        }
        // TODO:
                
        console.log(`In processNewInput with: ${lastInput}`);
        dispatch({
                type: CALCULATE, 
                accumulatedInput: "",
                lastInput: lastInput,
                result: null
        });
    }
}

function processNewOperator(operator) {
    return function(dispatch, getState) {
        dispatch({
            type: UPDATE_ACCUMULATED
        });
    }
}


//-----------------------------------------------------------------------------
// /src/store/calculator/reducer.js
//-----------------------------------------------------------------------------
const defaultCalculatorState = Immutable({
    accumulatedInput: "",
    lastInput: "",
    result: 0
});

function calculatorReducer(state = defaultCalculatorState, action) {
    switch(action.type) {
        case UPDATE_LAST:
            return state.merge({
                lastInput: (state.lastInput + action.newChar)
            });
        case UPDATE_ACCUMULATED:
            return state.merge({
                accumulatedInput: (state.accumulatedInput + state.lastInput),
                lastInput: ""
            });
        case CALCULATE:
            return state.merge({
                accumulatedInput: action.accumulatedInput,
                lastInput: action.lastInput,
                result: action.result
            });
        default:
            return state;
    }
}

//--------------------------------
// Selectors:
//--------------------------------
function getAccumulatedForDisplay(state) {
    return (state.calculator.accumulatedInput + state.calculator.lastInput);
}

function getLastForDisplay(state) {    
    if( (state.calculator.accumulatedInput.length === 0) && 
        (state.calculator.lastInput.length === 0)) {
        return "0";
    }
    return state.calculator.lastInput;
}

function getLastInput(state) {
    return state.calculator.lastInput;
}

// function isCalculationDone(state) {
//     return (state.calculator.result !== null);
// }

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
                <p id="display-accumulated text-muted">{this.props.accumulated}</p>
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
        this.handleCalculate = this.handleCalculate.bind(this);
        this.handleDecimalPoint = this.handleDecimalPoint.bind(this);
        this.handleClearInput = this.handleClearInput.bind(this);
        this.handleBackspace = this.handleBackspace.bind(this);

    }

    render() {
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
            }//,
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
            }//,
            // "-" : {
            //     ID: "subtract"
            // },
            // "*" : {
            //     ID: "multiply"
            // },
            // "/" : {
            //     ID: "divide"
            // },
            // "." : {
            //     ID: "decimal"
            // },
            // "\0x7F" : {
            //     ID: "clear"
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
            </div>
        );
    }

    handleNumberClick(keyChar) {
        console.log(`${keyChar} Clicked!!`);
        this.props.dispatch(processNewDigit(keyChar));
    }

    handleOperationClick(operator) {
        this.props.dispatch(processNewOperator(operator));
    }
    
    handleCalculate() {}
    
    handleDecimalPoint() {}

    handleClearInput() {}

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