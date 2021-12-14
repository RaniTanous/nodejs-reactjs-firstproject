import Joi from "joi";
import React from "react";
import Form from "../common/form";
import PageHeader from "../common/pageHeader";
import { toast } from "react-toastify";
import resService from "../../services/resService";
import orderService from "../../services/orderService";
import userSerivce from "../../services/userService";

class CreateOrder extends Form {
  state = {
    restaurants: [],
    form: {
      orderIncludes: "",
      orderAddress: "",
      orderOwnerPhone: "",
      isActive: true,
    },
    selectedRest: "",
  };

  async componentDidMount() {
    const { data } = await resService.getRestaurants();
    if (data.length) {
      this.setState({
        restaurants: data,
      });
    }
  }

  schema = {
    orderIncludes: Joi.string()
      .min(2)
      .max(1024)
      .required()
      .label("Order Description"),
    orderAddress: Joi.string()
      .min(2)
      .max(400)
      .required()
      .label("Order Address"),
    orderOwnerPhone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/)
      .label("Order Phone"),
    isActive: Joi.boolean().required(),
  };

  async doSubmit() {
    const selectedRest = this.state.selectedRest;
    const form = this.state.form;
    const body = { ...form, selectedRest, isActive: true };
    const user = userSerivce.getCurrentUser()
    try {
      console.log(body);
      await orderService.createOrder(body);
      toast("New order has been created");
      // show success
      this.props.history.replace(`/users/myprofile/${user._id}`);
    } catch ({ response }) {
      if (response && response.status === 400) {
        this.setState({ errors: { email: response.data } });
        console.log(body);
      }
    }
  }

  render() {
    const { restaurants } = this.state;
    return (
      <div className="container">
        <PageHeader title="Create a new order" />
        <div className="row">
          <div className="col-12">
            <p>Create a new order!</p>
          </div>
        </div>
        <form
          onSubmit={this.handleSubmit}
          noValidate="novalidate"
          autoComplete="off"
        >
          {this.renderInput("orderIncludes", "What do you like to order?")}
          {this.renderInput("orderAddress", "Your Address?")}
          {this.renderInput("orderOwnerPhone", "Phone Number?")}
          {restaurants.length &&
            restaurants.map((restaurant, index) => (
              <div key={restaurant._id}>
                <input
                  type="checkbox"
                  onChange={({ target: { value, checked } }) => {
                    if (checked) {
                      this.setState({
                        selectedRest: value,
                      });
                    } else {
                      this.setState({
                        selectedRest: " ",
                      });
                    }
                  }}
                  id={"cb-" + restaurant._id}
                  value={restaurant._id}
                />{" "}
                <label htmlFor={"cb-" + restaurant._id}>
                  {restaurant.resName}
                </label>
              </div>
            ))}
          <div className="mt-2">{this.renderLoginButton("Create Order")}</div>
        </form>
      </div>
    );
  }
}

export default CreateOrder;
