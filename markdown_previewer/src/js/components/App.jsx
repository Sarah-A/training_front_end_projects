// src/js/components/App.jsx
import React from "react";
import { EditorContainer } from "./EditorPanel.jsx";
import { PreviewContainer } from "./PreviewPanel.jsx";


const App = () => (
    <div id="panels-wrapper" className="row h-100 w-100">
        <div id="editor-panel" className="panel card col-12 col-lg-6 p-0">
            <div id="editor-header" className="card-header">Editor</div>
            <div id="editor-content" className="card-body panel-content p-0">
                <EditorContainer />                
            </div>
        </div>
        <div id="preview-panel" className="panel card col-12 col-lg-6 p-0">
            <div id="preview-header" className="card-header">Preview</div>
            <div id="preview-content" className="card-body panel-content p-3">
                <PreviewContainer />                
            </div>
        </div>        
    </div>
);

export default App;