import React, { Component } from "react";
import { render } from "react-dom";
import { Provider, connect } from "react-redux";
import { createStore } from "redux";

//******************************************************************************************************************************//
//      store.js                                                                                                                //
//******************************************************************************************************************************//
const PRESS_PAD = "PRESS_PAD";

function PressPad(padKey) {
    console.log(`in PressPad with: ${padKey}`);
    return {
        type: PRESS_PAD,
        padKey
    };
}

class DrumsData {

    constructor() {
        this.drumPads = new Map([
        [   "Q", 
            {
                file: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
                display: "Chord 1"
            }
        ], 
        [   "W",
            {
                file: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
                display: "Chord 2"
            }
        ], 
        [   "E",
            {
                file: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
                display: "Chord 3"
            }
        // ], 
        // [    "A",
        //     {
        //         file: "",
        //         display: ""
        //     }
        // ],
        // [   "S",
        //     {
        //         file: "",
        //         display: ""
        //     }
        // ],
        // [   "D",
        //     {
        //         file: "",
        //         display: ""
        //     }
        // ],
        // [   "Z",
        //     {
        //         file: "",
        //         display: ""
        //     }
        // ],
        // [   "X", 
        //     {  
        //         file: "",
        //         display: "" 
        //     }
        // ],
        // [   "C", 
        //     {  
        //         file: "",
        //         display: "" 
        // }
        ]
        ]);
    }

    pads() {
        console.log(this.drumPads);
        return Array.from(this.drumPads.keys());
    }

    display(pad) {
        return this.drumPads[pad].display;
    }

    audioFile(pad) {
        return this.drumPads[pad].file;
    }

    
}


const defaultState = {
    padKey: undefined
};

function reducer(state = defaultState, action) {
    // console.log(`in reducer with: ${action.padKey}`);
    switch(action.type) {
        case PRESS_PAD:
            console.log(`in reducer new pad: ${action.padKey}`);
            return {
                padKey: action.padKey
            };
        default:
            return state;
    }
}

const store = createStore(reducer);


function mapStateToProps(state) {
    return {padKey: state.padKey};
}

function mapDispatchToProps(dispath) {
    return {
        pressPad: (padKey) => dispath(PressPad(padKey))
    };
}




//******************************************************************************************************************************//
//      React componenets:                                                                                                      //
//******************************************************************************************************************************//

class DrumPad extends Component {
    constructor(props) {
        super(props);

        this.handlePress = this.handlePress.bind(this);
    }

    handlePress(event) {
        console.log(`in ${this.props.padKey}.handlePress()`);
        this.props.pressPad(this.props.padKey);
    }

    render() {
        console.log(`in DrumPad.reder with: ${this.props.padKey}`);
        return (
            <button type="button" className="drum-pad" onClick={this.handlePress}>{this.props.padKey}</button>
        );        
    }
}


class Display extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(`in Display.reder with: ${this.props.padKey}`);
        return (
            <p>{this.props.padKey}</p>
    
        );
    }
}

const ConnectedDrumPad = connect(null, mapDispatchToProps)(DrumPad);
const ConnectedDisplay = connect(mapStateToProps, null)(Display);

class App extends Component {
    constructor(props) {
        super(props);
        this.drums = new DrumsData();
    }

    render() {
        // const drumPadsComponents = Array.from( drumPads.entries(), ( [key,value]) => {
        //     // console.log(`drum-pad: ${key}`);
        //     return (<ConnectedDrumPad padKey={key} fileName={value.file} key={key}/>);
        // });
        const drumPadsComponents = this.drums.pads().map( (padKey) => <ConnectedDrumPad padKey={padKey} key={padKey}/>);

        console.log(drumPadsComponents);

        return (
        <div id="drum-machine">
            Hello React :-)
            {drumPadsComponents}            
            <ConnectedDisplay />
        </div>
        );
    }

}


//******************************************************************************************************************************//
//      index.js
//******************************************************************************************************************************//

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app")
);

