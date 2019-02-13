// src/js/components/App.jsx
import React from "react";
import List from "./List.jsx";
import FormContainer from "./FormContainer.jsx";


const App = () => (
    <div className="row mt-5">
    <div className="col-md-4 offset-md-1">
    <h2>Articles</h2>
        <List />
    </div>
    <div className="col-md-4 offset-md-1">
      <h2>Add a new article</h2>
      <FormContainer />
    </div>
    </div>
);

export default App;