import React from "react";
import ReactDOM from "react-dom";
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

//-----------------------------------------------------------------------------------------------------------
// DrumsData should probably be connected to the store but since I didn't learn the backend yet,
// I'm leaving it out now to simplify the solution.
//-----------------------------------------------------------------------------------------------------------

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

const drumMachineData = new DrumsData();

const defaultState = {
    selectpadKey: undefined,
};

function reducer(state = defaultState, action) {
    
    // console.log(`in reducer with: ${action.padKey}`);
    switch(action.type) {
        case PRESS_PAD:
            console.log(`in reducer new pad: ${action.padKey}`);
            return {
                padKey: action.padKey,                
            };
        default:
            return state;
    }
}

const store = createStore(reducer);

function mapStateToProps(state) {
    return {
        padKey: state.padKey        
    };
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
class DrumPad extends React.Component {
    constructor(props) {
        super(props);

        this.clipName = drumMachineData.getClipName(this.props.padKey);
        this.audioFile = `https://s3.amazonaws.com/freecodecamp/drums/${this.clipName}.mp3`;

        this.handlePress = this.handlePress.bind(this);
        this.activatePad = this.activatePad.bind(this);
        this.deactivatePad = this.deactivatePad.bind(this);
    }

    activatePad() {
        $(this.buttonElement).addClass("active-drum-pad");
    }

    deactivatePad() {
        $(this.buttonElement).removeClass("active-drum-pad");
    }

    handlePress(event) {
        console.log(`in ${this.props.padKey}.handlePress()`);
        this.activatePad();
        this.props.pressPad(this.props.padKey);
        this.audioElement.currentTime = 0;
        this.audioElement.play();
        setTimeout(this.deactivatePad, 500);        
        this.buttonElement.blur();
    }

    render() {
        console.log(`in DrumPad.reder with: ${this.props.padKey}`);
        return (
            <button type="button" id={this.clipName} className="badge badge-light shadow drum-pad col-3 m-1" accessKey={this.props.padKey} onClick={this.handlePress}>{this.props.padKey}
                <audio id={this.props.padKey} className="clip" type="audio/mp3" preload="auto" src={this.audioFile}>   
                {this.clipName}.mp3                 
                </audio>
            </button>
        );        
    }

    componentDidMount() {
        this.audioElement = document.getElementById(this.props.padKey); 
        this.buttonElement = document.getElementById(this.clipName);
    }
}

$(window).keydown(function(e) {
    const audioElement = $(`#${e.key.toUpperCase()}`);
    // console.log(`in keydown with: ${e.key.toUpperCase()}`);
    if(audioElement) {
        audioElement.parent().focus();
        audioElement.parent().click();
    }
});

//---------------------------------------------------------------------
// Display
//---------------------------------------------------------------------
class Display extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(`in Display.reder with: ${this.props.padKey}`);
        return (
            <p id="display">{drumMachineData.getDisplay(this.props.padKey)}</p>
    
        );
    }
}



//---------------------------------------------------------------------
// App
//---------------------------------------------------------------------
class App extends React.Component {
    constructor(props) {
        super(props);        
    }

    render() {
        const drumPadsComponents = drumMachineData.getPads().map( (padKey) => {
            // console.log(`App.render.map: padKey: ${padKey}`);
            // console.log(`clipName: ${this.drums.getClipName(padKey)}`);
            return <ConnectedDrumPad padKey={padKey} key={padKey} />;
        });

        return (
        <div id="drum-machine" className="d-flex flex-column">       
        <div id="drum-machine-title" className="h2 text-center">Drum Machine</div>
        <div className="d-flex flex-column flex-lg-row align-items-center justify-content-around">
            <div id="drum-pads" className="drum-panel row align-items-center justify-content-around w-100 w-lg-50">
                {drumPadsComponents}            
            </div>
            <div id="drum-display" className="drum-panel row w-100 w-lg-50">
                <ConnectedDisplay />            
            </div>
        </div>
        </div>
        );
    }

}

const ConnectedDrumPad = connect(null, mapDispatchToProps)(DrumPad);
const ConnectedDisplay = connect(mapStateToProps, null)(Display);


//******************************************************************************************************************************//
//      index.js
//******************************************************************************************************************************//

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app")
);

