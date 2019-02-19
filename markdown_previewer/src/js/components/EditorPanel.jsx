import React from 'react';
import { mapStateToProps , mapDispatchToProps} from "../store/store";
import {connect} from "react-redux";

function Editor(props) {
    return (
        <textarea id="editor" className="p-3 panel-content" value={props.input} onChange={props.handleChange}></textarea> 
    );
}

export class EditorContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.updateInput(event.target.value);
    }

    render() {
        return (
            <Editor input={this.props.input} handleChange={this.handleChange} />
        );
    }
}

export const ConnectedEditor = connect(mapStateToProps, mapDispatchToProps)(EditorContainer);


