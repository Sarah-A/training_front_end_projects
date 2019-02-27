// src/js/components/App.jsx
import React from "react";
import { ConnectedEditor } from "./EditorPanel.jsx";
import { ConnectedPreview } from "./PreviewPanel.jsx";


const App = () => (
    <div id="panels-wrapper" className="d-inline-flex flex-column flex-lg-row align-items-stretch h-100 w-100">
        <ConnectedEditor />                
        <ConnectedPreview />                      
    </div>
);

export default App;