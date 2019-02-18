import React from 'react';
import { ConnectPanelToStore} from "../store/store";

export class EditorPanel extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        console.log("recognized Change in Editor Panel!!");
        // TODO - Dispatch store update!!
    }

    render() {
        return (
            <textarea id="editor" className="p-3" defaultValue={this.props.input} onChange={this.handleChange()}></textarea>            
        );
    }
}

export const EditorContainer = ConnectPanelToStore(EditorPanel);


