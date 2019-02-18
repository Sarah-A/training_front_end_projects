import React from 'react';
import { ConnectPanelToStore } from "../store/store";

export class PreviewPanel extends React.Component {
    constructor(props) {
        super(props);

        this.markdownInput = this.markdownInput.bind(this);
    }

    markdownInput() {
        return this.props.input;
    }

    render() {
        return (
            <p>{this.markdownInput()}</p>
        );
    }
}

export const PreviewContainer = ConnectPanelToStore(PreviewPanel);

