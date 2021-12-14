import Joi from "joi";
import React, { Component } from "react";
import Input from "./input";

class Form extends Component {
  validateInput({ name, value }) {
    // acquire data
    const data = {
      [name]: value,
    };

    const schema = Joi.object({
      [name]: this.schema[name],
    });

    // validate by data
    const { error } = schema.validate(data);

    return error ? error.details[0].message : null;
  }

  validateForm() {
    // acquire data
    const {
      schema,
      state: { form },
    } = this;

    // validate by data
    const { error } = Joi.object({ ...schema }).validate(form, {
      abortEarly: false,
    });

    // return null if all good
    if (!error) {
      return null;
    }

    // rearrange validation data
    const errors = {};
    for (const detail of error.details) {
      errors[detail.path[0]] = detail.message;
    }

    // return arranged errors
    return errors;
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validateForm();
    this.setState({ errors });

    if (errors) {
      return;
    }

    this.doSubmit();
  };

  handleChange = ({ target }) => {
    const { form, errors } = this.state;
    console.log(target);
    this.setState({
      form: {
        ...form,
        [target.name]: target.value,
      },
      errors: {
        ...errors,
        [target.name]: this.validateInput(target),
      },
    });
  };

  renderInput(name, label, type = "text") {
    const { form, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        label={label}
        onInput={this.handleChange}
        value={form[name]}
        error={errors && errors[name]}
      />
    );
  }

  renderButton(label) {
    return (
      <button disabled={this.validateForm()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderLoginButton(label) {
    return <button className="btn btn-primary">{label}</button>;
  }
}

export default Form;
