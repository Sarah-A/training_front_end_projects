import React from 'react';
import { mapStateToProps , mapDispatchToProps} from "../store/store";
import {connect} from "react-redux";

export class EditorPanel extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        console.log(`recognized Change in Editor Panel: ${event.target.value}`);
        this.props.updateInput(event.target.value);
    }

    render() {
        return (
            <textarea id="editor" className="p-3 panel-content" value={this.props.input} onChange={this.handleChange}></textarea>            
        );
    }

    // componentWillMount() {
    //     loadDefaultState();
    // }
}

export const EditorContainer = connect(mapStateToProps, mapDispatchToProps)(EditorPanel);


