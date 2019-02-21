//****************************************************************************
// Redux (Store):
//****************************************************************************

// Imports:
import { createStore } from "redux";
import { combineReducers } from "redux";

//----------------------------------------------
// Actions Definitions and Creators
//----------------------------------------------
const ACTION_1 = "ACTION_1";
...

function actionCreator1(...) {
    return {
        type: ACTION_1,
        ...
    };
}

function actionCreator2(...) {...}

//----------------------------------------------
// States and Reducers Definitions:
//----------------------------------------------


let defaultState1 = ...;
function reducer1(state = defaultState1, action) {...}

let defaultState2 = ...;
function reducer2(state = defaultState2, action) {...}

...

const rootReducer = combineReducers( {
    stateProperty1: reducer1,
    stateProperty2: reducer2,
    ...
});
// Note: 
// The resulting state will have the structure: {stateProperty1, stateProperty2,...}
// and each property will be sent to the appropriate reducer on change.


//----------------------------------------------
// Create the Store:
//----------------------------------------------
const store = createStore(rootReducer);


// Redux also support the following functions (see below). 
// However, in react-redux system, they will be called by the react-redux library
// internally when connecting the mapStateToProps and mapDispatchToProps:
//      * subscribe a Change-handler to be called whenever the state changes:
//          function handleChange() {...}
//          const unsubscribe = store.subscribe(handleChange);
//      * dispatch - for dispatching actions to the store to change the state:
//          store.dispatch(actionCreator1(...));

//****************************************************************************
// react-redux (connecting library):
//****************************************************************************

// imports:
import React, { Component } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { connect } from "react-redux";

// Connect your React app (App) to your store so you can access it:
render(
  <Provider store={store}>
    <App />
  </Provider>,
  // The target element might be either root or app,
  // depending on your development environment
  // document.getElementById("app")
  document.getElementById("root")
);

//--------------------------------------------------------------------
//  HTML:
//  The HTML will have a single "app" or "root" element that will contain
//  the "App" content as defined above. 
//--------------------------------------------------------------------
<html>
    .....
    <div id="root">
        {/* the content of the "root" element will be replaced by the 
        react-generated content through the App component */}
    </div>
</html>


//--------------------------------------------------------------------
// mapStateToProps:
// For every Container component that need to access the state:
//--------------------------------------------------------------------


function mapStateToProps(state) {
    return {componentProperty1: state.stateProperty1, ...};
}

const ConnectedContainer1 = connect(mapStateToProps, null)(Container1);
// Container1 is a regular React component, define in the React section below
// Container1 will be able to access the properties through:
//      this.props.componentProperty1 etc.

//--------------------------------------------------------------------
// mapStateToProps:
// For every Container component that need to dispatch actions:
//--------------------------------------------------------------------


function mapDispatchToProps(dispatch) {
    return {
        componentFunction1: (actionParameters...) => dispatch(actionCreator1(actionParameters...)),
        ...
    };
}


const ConnectedContainer2 = connect(null, mapDispatchToProps)(Container2);
// Container2 is a regular React component, define in the React section below
// Container2 will be able to access the componentFunctions through:
//  this.props.componenetFunction1(actionParameters...);

// Note: different containers can connect to the same mapping functions if they need
//       access to the same data/actions.


//****************************************************************************
// React:
//****************************************************************************

//--------------------------------------------------------------------
// Containers:
// the components that carries all the logic: functions for handling state changes, 
// internal component state and so on.
// The containers connect between the store (redux) and the React view
//--------------------------------------------------------------------

class Container1 extends React.Component {...}          
class Container2 extends React.Component {...}          

//--------------------------------------------------------------------
// Presentational:
// Components that only render the intended markup. 
// Usually, they will:
//  ** Be Stateless pure functions
//  ** Not contain private states
//  ** Receive all required date from their matching container component 
//  ** The same presentational component can be used by more than one 
//      Container componenet to display different types of data in a 
//      standard way
//--------------------------------------------------------------------

function Presentational1(props) {
    // return (
    //     <html markup using props (both state and fucntions) received from Container1
    //      through the props
    //     >
    // );
}

//--------------------------------------------------------------------
//  App:
//  The main React component that contain the rest of the React 
//  components in the App. This is the same App that we used in the 
//  react-redux Provider call
//--------------------------------------------------------------------
const App = () => (
    ...
        <ConnectedContainer1 />
        <ConnectedContainer2 />
    ...
);



