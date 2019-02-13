// src/js/components/Form.jsx

import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addArticle } from "../actions/index";
import Form from "./Form.jsx"

function mapDispatchToProps(dispatch) {
    return {
    addArticle: article => dispatch(addArticle(article))
    };
}

class ConnectedForm extends Component {
    
    constructor() {
        super();
        this.state = {
            title: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { title } = this.state;
        const id = uuidv1();
        this.props.addArticle({ title, id });
        this.setState({ title: "" });
    }

    render() {
        const { title } = this.state;
        return (
            <Form 
                state={title}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
            />
        );
    }
}

const FormContainer = connect(null, mapDispatchToProps)(ConnectedForm);
export default FormContainer;