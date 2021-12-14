import Joi from "joi";
import React from "react";
import Form from "../common/form";
import PageHeader from "../common/pageHeader";
import { toast } from "react-toastify";
import resService from "../../services/resService";

class CreateRestaurant extends Form {
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
    const {
      form: { resImage, ...body },
    } = this.state;

    if (resImage) {
      body.resImage = resImage;
    }

    try {
      await resService.createRestaurant(body);
      toast("New restaurant has been created");
      // show success
      this.props.history.replace("/restaurants/panel");
    } catch ({ response }) {
      if (response && response.status === 400) {
        this.setState({ errors: { email: response.data } });
      }
    }
  }

  render() {
    return (
      <div className="container">
        <PageHeader title="Create a new Card" />
        <div className="row">
          <div className="col-12">
            <p>Create a new restaurant</p>
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
          <div className="mt-2">
            {this.renderLoginButton("Create Restaurant")}
          </div>
        </form>
      </div>
    );
  }
}

export default CreateRestaurant;
