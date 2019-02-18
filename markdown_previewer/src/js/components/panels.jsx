import React from 'react';

class Panel extends React.Component {
    constructor(props) {
        super(props);        
    }

    render() {
        // console.log(this.props.title);
        const title = this.props.title;
        const titleText = title.charAt(0).toUpperCase() + title.slice(1);
        return(
            <div id={title + "-panel"} className="panel card col-12 col-lg-6 p-0">
                <div id={title + "-header"} className="card-header">{titleText}</div> 
                <div id={title + "-content"} className="card-body panel-content p-3">                        
                    test content    
                </div>                    
            </div>
        );
    }
}


class EditorPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Panel title="editor" textContents={this.props.input} />
        );
    }
}

class PreviewPanel extends React.Component {
    constructor(props) {
        super(props);

        this.markdownInput = this.markdownInput.bind(this);
    }

    markdownInput() {
        return this.props.input;
    }

    render() {
        return (
            <Panel title="preview" textContents={this.markdownInput()} />
        );
    }
}


export default function Panels() {
    return (
        <div id="panels-wrapper" class="row h-100 w-100">
            <EditorPanel />
            <PreviewPanel />
        </div>
    );
}

function makePanelsDraggable() {
    // $(".panel").draggable({
    //     containment: "#panels-wrapper",
    //     opacity: 0.35,
    //     // snap: true,
    //     // // snapTolerance: 100
    //     // snapMode: "outer"
    // }).resizable({
    //     containment: "#panels-wrapper"
    // });
}

$(document).ready(makePanelsDraggable);