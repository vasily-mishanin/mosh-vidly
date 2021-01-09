import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class LoginForm extends Form {
  // validate(), validateProperty(), handleChange(), handleSubmit()  are from Form component

  //initialize the STATE
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  //schema for Joi validation
  // "username" and "password" are validated target properties
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };
  //   constructor(props) {
  //     super();
  //     this.state = {};
  //   }
  /* in plain (vanilla) JS we can
const elem = document.getElementById('username');
and then somewhere in our code get elem.value */
  // in React we use  React.createRef() to grab actual element from DOM;
  //const username = this.username.current.value;
  username = React.createRef(); // create ref obj
  password = React.createRef(); // create ref obj

  componentDidMount() {
    //this.username.current.focus();
  }

  doSubmit = () => {
    console.log("Submitted");
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form action="" onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "text", true)}
          {this.renderInput("password", "Password", "password")}
          {/* validate() => if no errors => disabled=(null) i.e. false, else disabled={errors} i.e. true */}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}
export default LoginForm;
