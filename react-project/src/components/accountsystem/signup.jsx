import Joi from "joi";
import Form from "../common/form";
import PageHeader from "../common/pageHeader";
import { toast } from "react-toastify";
import userSerivce from "../../services/userService";
import { Redirect } from "react-router-dom";

class SignUp extends Form {
  state = {
    form: {
      email: "",
      password: "",
      lastName: "",
      name: "",
      address: "",
      phone: "",
      role: "",
      isActive: false,
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
    name: Joi.string().required().min(2).label("Name"),
    lastName: Joi.string().required().min(2).label("Last Name"),
    address: Joi.string().required().min(2).label("Address").allow(),
    phone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/),
    role: Joi.string().required().min(2).label("Role").allow(),
    isActive: Joi.boolean().required().allow(),
  };

  async doSubmit() {
    const { form } = this.state;
    const body = { ...form, biz: false, isActive: false };

    try {
      await userSerivce.createUser(body);
      // show success
      toast.success("You are registered successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // move to signin
      this.props.history.replace("/signin");
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
        <PageHeader title="Sign Up with Real App" />
        <div className="row">
          <div className="col-12">
            <p>Open a new account, It's free you yemen!!</p>
          </div>
        </div>
        <form
          onSubmit={this.handleSubmit}
          noValidate="novalidate"
          autoComplete="off"
        >
          {this.renderInput("name", "First Name")}
          {this.renderInput("lastName", "Last name")}
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("address", "Address")}
          {this.renderInput("role", "Role and Experience")}
          {this.renderInput("phone", "Phone Number")}
          {this.renderInput("password", "Password", "password")}

          <div className="mt-2">{this.renderButton("Sign Up")}</div>
        </form>
      </div>
    );
  }
}

export default SignUp;
