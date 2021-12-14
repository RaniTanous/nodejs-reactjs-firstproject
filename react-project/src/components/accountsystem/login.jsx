import Joi from "joi";
import { Redirect } from "react-router-dom";
import userSerivce from "../../services/userService";
import userService from "../../services/userService";
import Form from "../common/form";
import PageHeader from "../common/pageHeader";
// import http from "../services/httpService";
// import { apiUrl } from "../config.json";
// import { toast } from "react-toastify";

class Login extends Form {
  state = {
    form: {
      email: "",
      password: "",
    },
  };

  schema = {
    email: Joi.string()
      .required()
      .email({
        tlds: { allow: false },
      })
      .label("Email"),
    password: Joi.string().required().min(6).label("Password"),

  };

  async doSubmit() {
    const { email, password } = this.state.form;
    try {
      await userService.login(email, password);
      if (this.props.location.state?.from) {
        window.location = this.props.location.state.form.pathname;
        return;
      }
      window.location = "/";
    } catch ({ response }) {
      if (response && response.status === 400) {
        this.setState({ errors: { email: response.data } });
      }
    }
  }

  render() {
    if (userSerivce.getCurrentUser()) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <PageHeader title="Login into your account" />
        <div className="row">
          <div className="col-12">
            <p>
              Make sure to fill out the fields with the correct information!!
            </p>
          </div>
        </div>
        <form
          onSubmit={this.handleSubmit}
          noValidate="novalidate"
          autoComplete="off"
        >
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "Password", "password")}
          <div className="mt-2">{this.renderLoginButton("Login")}</div>
        </form>
      </div>
    );
  }
}

export default Login;
