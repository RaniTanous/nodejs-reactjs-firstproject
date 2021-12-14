import Joi from "joi";
import React from "react";
import Form from "../common/form";
import PageHeader from "../common/pageHeader";
import { toast } from "react-toastify";
import userService from "../../services/userService";


class editProfile extends Form {
  state = {
    form: {
      email: "",
      lastName: "",
      name: "",
      address: "",
      phone: "",
      role: "",
    },
  };
  schema = {
    _id: Joi.string(),
    email: Joi.string()
      .required()
      .email({
        tlds: { allow: false },
      })
      .label("Email"),
    name: Joi.string().required().min(2).label("Name"),
    lastName: Joi.string().required().min(2).label("Last Name"),
    address: Joi.string().required().min(2).label("Address").allow(),
    phone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/),
    role: Joi.string().required().min(2).label("Role").allow(),
  };

  async doSubmit() {
    const { form } = this.state;
    const user = userService.getCurrentUser();
    const usered = await userService.getUser(user._id);
    const readyUser = usered.data;
    const userId = readyUser._id;
    await userService.editUser(form);
    toast("User has been updated successfully");
    this.props.history.replace(`/users/myprofile/${userId}`);
  }
  mapToViewModel({ _id, email, name, lastName, address, phone, role }) {
    return {
      _id,
      email,
      name,
      lastName,
      address,
      phone,
      role,
    };
  }

  async componentDidMount() {
    const userID = this.props.match.params.id;
    const { data } = await userService.getUser(userID);

    this.setState({ form: this.mapToViewModel(data) });
  }

  hanldeCancel = () => {
    this.props.history.push(`/myprofile/:id`);
  };

  render() {
    return (
      <div className="container">
        <PageHeader title="Edit a Restaurant" />
        <div className="row">
          <div className="col-12">
            <p>Edit the restaurant</p>
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
          <div className="mt-2">{this.renderLoginButton("Update Profile")}</div>
          <div className="mt-2">
            <button onClick={this.hanldeCancel} className="btn btn-danger ml-2">
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default editProfile;
