import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = { data: {}, errors: {} };

  //form validation
  validate = () => {
    //Joi validation
    //abortEarly means -> first error -> stop validation
    const options = { abortEarly: false };
    //Joi.validate is not validate()
    const result = Joi.validate(this.state.data, this.schema, options); //return Joi object with errors info
    //also use Joi.validate result destructuring
    const { error } = result;
    console.log(result);
    //no errors
    if (!error) return null;
    //else
    const errors = {};
    //mapping result.error into errors
    for (let item of error.details) {
      errors[item.path[0]] = item.message; // see from console errors["username"]=""username" is not allowed to be empty" e.c.
    }
    return errors;
    // const errors = {};
    // const { data } = this.state;
    // //validation logic from Scratch (without Joi)
    // if (data.username.trim() === "") {
    //   errors.username = "Username is required";
    // }
    // if (data.password.trim() === "") {
    //   errors.password = "Password is required";
    // }
    // // Object.keys(errors) returns keys - array of object {errors} properties
    // return Object.keys(errors).length === 0 ? null : errors;
  };

  //property onchange validation
  validateProperty = (input) => {
    const { name, value } = input;
    // if (name === "username") {
    //   if (value.trim() === "") return "Username is required";
    // }
    // if (name === "password") {
    //   if (value.trim() === "") return "Password is required";
    // }
    //JOI validation
    const obj = { [name]: value }; //first argument for validate();
    const schema = { [name]: this.schema[name] }; // second argument, dynamic notation
    const result = Joi.validate(obj, schema); //no need of abortEarly cuz it'd too much messages
    // conditional returning message from JOI object {...error{...details[{..message}]}}
    return result.error ? result.error.details[0].message : null;
  };

  //Sunbmit Form=>validate()-> this.doSubmit();
  handleSubmit = (e) => {
    e.preventDefault(); //do not reload the page
    //validation call
    const newErrors = this.validate(); // null or {errors} object
    //if no errors (null) returned from validate() then state.errors = {}
    //state.errors shouldn't be nully - it will cause runtime errors
    this.setState({ errors: newErrors || {} });
    console.log(newErrors);
    if (newErrors) return; // if there are errors then STOP submitting

    //here we can Call a server or save data
    this.doSubmit();
  };

  // when type smth in <input> => grab value and update state
  //i.e. Change=>validateProperty()
  handleChange = (event) => {
    //destructuring of event object
    const { currentTarget: input } = event; // "event.currentTarget" rename to "input"
    //handle errors
    const newErrors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input); //input = currentTarget
    errorMessage
      ? (newErrors[input.name] = errorMessage)
      : delete newErrors[input.name];
    //handle change, new State
    const newAccount = this.state.data;
    // newAccount.username = e.currentTarget.value;
    // //or as we know "newAccount.username"  is equal to "newAccount["username"]"
    // newAccount["username"] = e.currentTarget.value;
    // //or for multiple inputs use object bracket notaton to change target property
    newAccount[input.name] = input.value; // input.name = "username" or "password"
    this.setState({ data: newAccount, errors: newErrors }); //change state -> RErender components
  };

  //helper RENDER methods
  renderButton(label) {
    return (
      <button className="btn btn-primary" disabled={this.validate()}>
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text", focus) {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
        type={type}
        focus={focus}
      />
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
        options={options}
      />
    );
  }
}

export default Form;
