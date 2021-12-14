import Joi from "joi";
import React from "react";
import Form from "../common/form";
import PageHeader from "../common/pageHeader";
import resService from "../../services/resService";
import { toast } from "react-toastify";

class EditRestaurant extends Form {
  state = {
    form: {
      resName: "",
      resDescription: "",
      resAddress: "",
      resPhone: "",
      resOpenHours: "",
      resImage: "",
    },
  };
  schema = {
    _id: Joi.string(),
    resName: Joi.string().min(2).max(255).required().label("Restaurant Name"),
    resDescription: Joi.string()
      .min(2)
      .max(1024)
      .required()
      .label("Restaurant Description"),
    resAddress: Joi.string()
      .min(2)
      .max(400)
      .required()
      .label("Restaurant Address"),
    resPhone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/)
      .label("Restaurant Phone"),
    resOpenHours: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/)
      .label("Open hours"),
    resImage: Joi.string().min(6).max(1024).label("Restaurant Image").allow(""),
  };

  async doSubmit() {
    const { form } = this.state;
    await resService.editRestaurant(form);
    toast("Restaurant has been updated successfully");
    this.props.history.replace("/restaurants/panel");
  }
  mapToViewModel({
    _id,
    resName,
    resDescription,
    resAddress,
    resPhone,
    resOpenHours,
    resImage,
  }) {
    return {
      _id,
      resName,
      resDescription,
      resAddress,
      resPhone,
      resOpenHours,
      resImage,
    };
  }

  async componentDidMount() {
    const resId = this.props.match.params.id;
    const { data } = await resService.getRestaurant(resId);

    this.setState({ form: this.mapToViewModel(data) });
  }

  hanldeCancel = () => {
    this.props.history.push("/restaurants/panel");
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
          {this.renderInput("resName", "Restaurant Name")}
          {this.renderInput("resDescription", "Restaurant Description")}
          {this.renderInput("resAddress", "Restaurant Address")}
          {this.renderInput("resPhone", "Restaurant Phone")}
          {this.renderInput("resOpenHours", "Restaurant Open Hours")}
          {this.renderInput("resImage", "Restaurant Image")}
          <div className="mt-2">{this.renderLoginButton("Update Restaurant")}</div>
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

export default EditRestaurant;
