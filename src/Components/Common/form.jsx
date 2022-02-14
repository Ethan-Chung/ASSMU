import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';

// component inherited by LoginForm
class Form extends Component {
    state = {
        data: {},
        errors: {}
    } 

    validate = () => {
        // makes our code look cleaner
        const options = { abortEarly: false };

        // first argument is object we want to validate. Second argument is our schema
        const { error } = Joi.validate(this.state.data, this.schema, options);

        // if result.error is falsy then return null, otherwise get that array and map it into an object
        if (!error) return null;

        // empty object
        const errors = {};

        // mapping this array into an object
        for (let item of error.details)
            errors[item.path[0]] = item.message;  // setting property in our errors object to the error message
        return errors;
    }

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };  // whatever name is at runtime will be used to set the name key
        const schema = { [name]: this.schema[name] };  // dynamically setting value from our schema object
        const { error } = Joi.validate(obj, schema);  // we want the default abortEarly here so errors are displayed one at a time

        // if error is defined return the first detail of the error message property, otherwise return null 
        return error ? error.details[0].message : null;
        
    };

    // prevents default behavior of this event (i.e. reloading the page when we submit a form)
    handleSubmit = e => {
        e.preventDefault();

        const errors = this.validate();  // this method will return an object for error catching
        this.setState({ errors: errors || {} });  // if truthy return error object, otherwise return an empty object
        if (errors) return;  // if we have errors immediately return so we don't call the server

        this.doSubmit();
    };

    // when the input field text changes
    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };  // clone errors property of our state object
        const errorMessage = this.validateProperty(input);  // returns an error message from the given input

        // if this errorMessage is truthy we will store it in our errors object
        if (errorMessage) errors[input.name] = errorMessage;  // we set set errors of input name to our errorMessage
        else delete errors[input.name];  // if we don't get an error message we should delete the existing property so 
        // the error is cleared

        const data = { ...this.state.data };  // clone the data object

        // string that identifies the name of the target property
        data[input.name] = input.value;  // set the username the input field

        this.setState({ data, errors });  // pass our new data object
    };

    renderButton(label) {
        return (
            <button 
                // a returned null is considered falsy, an object is truthy
                disabled={ this.validate() }  // whether or not the button should be disabled
                className="btn btn-primary">
                { label }
            </button>
        )
    };

    renderInput(name, label, type = 'text') {
        // object destructuring
        const { data, errors } = this.state;

        return(
            <Input
                type={ type }  // tells if the input should be displayed in clear text or not
                name={ name }  // so we can identify the field
                label={ label }  // the text above the input field
                value={ data[name] }  // call method when text changes
                onChange={ this.handleChange }  // call method when text changes
                error={ errors[name] }  // error object that specifies the field that is invalid
            />
        );
    }

}
 
export default Form;