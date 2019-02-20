// src/js/components/App.jsx
import React from "react";
import { ConnectedEditor } from "./EditorPanel.jsx";
import { ConnectedPreview } from "./PreviewPanel.jsx";


const App = () => (
    <div id="panels-wrapper" className="row h-100 w-100">
        <ConnectedEditor />                
        <ConnectedPreview />                      
    </div>
);

export default App;