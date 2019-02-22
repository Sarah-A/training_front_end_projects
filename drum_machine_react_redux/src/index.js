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
                clipName: "Chord_1",
                display: "Chord 1"
            }
        ], 
        [   "W",
            {
                clipName: "Chord_2",
                display: "Chord 2"
            }
        ], 
        [   "E",
            {
                clipName: "Chord_3",
                display: "Chord 3"
            }
        ], 
        [   "A",
            {
                clipName: "Give_us_a_light",
                display: "Shaker"
            }
        ], 
        [   "S",
        {
            clipName: "Dry_Ohh",
            display: "Open HH"
        }
        ], 
        [   "D",
            {
                clipName: "Bld_H1",
                display: "Closed HH"
            }
        ], 
        [   "Z",
        {
            clipName: "punchy_kick_1",
            display: "Punchy Kick"
        }
        ], 
        [   "X",
        {
            clipName: "side_stick_1",
            display: "Side Stick"
        }
        ], 
        [   "C",
            {
                clipName: "Brk_Snr",
                display: "Snare"
            }
        ]
        ]);
    }

    getPads() {
        console.log(this.drumPads);
        return Array.from(this.drumPads.keys());
    }

    getDisplay(pad) {
        return (this.drumPads.has(pad)? this.drumPads.get(pad).display : "");
    }

    getClipName(pad) {
        console.log(`in getClipName. pad: ${pad}`);
        return this.drumPads.get(pad).clipName;
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

//---------------------------------------------------------------------
// DrumPad
//---------------------------------------------------------------------
class DrumPad extends Component {
    constructor(props) {
        super(props);

        this.clipName = this.props.drums.getClipName(this.props.padKey);
        this.audioFile = `https://s3.amazonaws.com/freecodecamp/drums/${this.clipName}.mp3`;

        this.handlePress = this.handlePress.bind(this);
    }

    handlePress(event) {
        console.log(`in ${this.props.padKey}.handlePress()`);
        
        this.props.pressPad(this.props.padKey);
        this.audioElement.currentTime = 0;
        this.audioElement.play();
    }

    render() {
        console.log(`in DrumPad.reder with: ${this.props.padKey}`);
        return (
            <button type="button" id={this.clipName} className="drum-pad" accessKey={this.props.padKey} onClick={this.handlePress}>{this.props.padKey}
                <audio id={this.props.padKey} className="clip" type="audio/mp3" preload="auto" src={this.audioFile}>   
                {this.clipName}.mp3                 
                </audio>
            </button>
        );        
    }

    componentDidMount() {
        this.audioElement = document.getElementById(`${this.props.padKey}`);       
    }
}

$(window).keydown(function(e) {
    const audioElement = $(`#${e.key.toUpperCase()}`);
    // console.log(`in keydown with: ${e.key.toUpperCase()}`);
    if(audioElement) {
        audioElement.parent().click();
    }
});

//---------------------------------------------------------------------
// Display
//---------------------------------------------------------------------
class Display extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(`in Display.reder with: ${this.props.padKey}`);
        return (
            <p id="display">{this.props.drums.getDisplay(this.props.padKey)}</p>
    
        );
    }
}

const ConnectedDrumPad = connect(null, mapDispatchToProps)(DrumPad);
const ConnectedDisplay = connect(mapStateToProps, null)(Display);

//---------------------------------------------------------------------
// App
//---------------------------------------------------------------------
class App extends Component {
    constructor(props) {
        super(props);
        this.drums = new DrumsData();
    }

    render() {
        const drumPadsComponents = this.drums.getPads().map( (padKey) => {
            // console.log(`App.render.map: padKey: ${padKey}`);
            // console.log(`clipName: ${this.drums.getClipName(padKey)}`);
            return <ConnectedDrumPad padKey={padKey} key={padKey} drums={this.drums}/>;
        });

        return (
        <div id="drum-machine">            
            {drumPadsComponents}            
            <ConnectedDisplay drums={this.drums}/>            
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

