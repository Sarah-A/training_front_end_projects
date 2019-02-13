// src/js/components/Form.jsx

import React, { Component } from "react";

function Form(props) {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={props.title}
                    onChange={props.handleChange}
                />
            </div>
            <button type="submit" className="btn btn-success btn-lg">
                SAVE
            </button>
        </form>
    );
}

export default Form;