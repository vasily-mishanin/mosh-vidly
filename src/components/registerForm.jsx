import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";

//RegisterForm -> Form -> Component from React
class RegisterForm extends Form {
  state = { data: { username: "", password: "", name: "" }, errors: {} };

  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().min(5).required().label("Username"),
    nickname: Joi.string().alphanum().required().label("Name"),
  };

  doSubmit = () => {
    console.log("Submitted");
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form action="" onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "text", true)}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("nickname", "Name", "nickname")}
          {/* validate() => if no errors => disabled=(null) i.e. false, else disabled={errors} i.e. true */}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}
export default RegisterForm;
