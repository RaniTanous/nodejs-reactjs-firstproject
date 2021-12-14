import React, { Component } from "react";
import resService from "../../services/resService";
import "../style/ourRestaurants.scss";
import PageHeader from "../common/pageHeader";
import orderService from "../../services/orderService";
import userService from "../../services/userService";

class trashedOrders extends Component {
  state = { restaurants: [], orders: [], users: [] };

  async componentDidMount() {
    const userData = await userService.getUsers();
    const restData = await resService.getRestaurants();
    const orderData = await orderService.getOrders();
    const readyOrders = orderData.data;
    const readyRests = restData.data;
    const readyUsers = userData.data;
    this.setState({
      orders: readyOrders,
      users: readyUsers,
      restaurants: readyRests,
    });
  }

  render() {
    const { orders } = this.state;
    return (
      <div className="container">
        <PageHeader title="Orders Panel!" />
        <div className="row">
          <div className="col-12">
            <p>All the orders are listed below!..</p>
          </div>
        </div>
        <div className="row">
          {orders.length &&
            orders.map((order, index) => (
              <div className="col-6 col-md-3 col-lg-3 mt-3" key={order._id}>
                {order?.isActive ? (
                  <></>
                ) : (
                  <div className="card" style={{ width: "18rem" }}>
                    <div className="card-body">
                      <h5 className="card-title">
                        {order.user.name}{" "}
                        <span style={{ fontSize: "12px" }}>
                          ({order.user.user_id})
                        </span>{" "}
                      </h5>
                      <p className="card-text">
                        <b>Order includes:</b>
                        <br />
                        {order.orderIncludes}
                      </p>
                      <p className="card-text border-top pt-2" id="parent">
                        <b>Tel: </b> {order.orderOwnerPhone}
                        <br />
                        <b>Address: </b> {order.orderAddress}
                        <br></br>
                        <b>For: </b> {order.user.name} ({order.user.email})
                        <br />
                        <b>Restaurant: </b> {order.restaurant.name}
                        <br />
                        <br />
                        <br />
                      </p>
                      <p className="text-success text-center">Completed</p>
                      <p
                        className="text-center font-monospace align-middle fs-5"
                        id="inactive"
                      ></p>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default trashedOrders;
