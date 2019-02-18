// src/js/components/App.jsx
import React from "react";
import { EditorContainer } from "./EditorPanel.jsx";
import { PreviewContainer } from "./PreviewPanel.jsx";


const App = () => (
    <div id="panels-wrapper" className="row h-100 w-100">
        <div className="panel card col-12 col-lg-6 p-0">
            <div className="card-header">Editor</div>
            <div className="card-body p-0">
                <EditorContainer />                
            </div>
        </div>
        <div className="panel card col-12 col-lg-6 p-0">
            <div className="card-header">Preview</div>
            <div className="card-body p-3">
            <p id="preview" className="panel-content">
                <PreviewContainer />                
            </p>            
            </div>
        </div>        
    </div>
);

export default App;