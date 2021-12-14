import React, { Component } from "react";
import resService from "../../services/resService";
import "../style/ourRestaurants.scss";
import PageHeader from "../common/pageHeader";
import orderService from "../../services/orderService";
import userService from "../../services/userService";
import { Link } from "react-router-dom";

class OrdersPanel extends Component {
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
            orders.reverse().map((order, index) => (
              <>
                {order?.isActive ? (
                  <>
                    <div key={order._id}>
                      <div
                        className="card col-4 col-md-4 col-lg-2 mt-5"
                        style={{ width: "100vh" }}
                      >
                        <div className="card-body">
                          <h5 className="card-title">
                            Ordering Person: {order.user.name}{" "}
                            <span style={{ fontSize: "12px" }}>
                              ({order.user.user_id})
                            </span>{" "}
                          </h5>
                          <hr />
                          <p className="card-text mt-5 mb-5">
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
                          <p
                            className="text-center font-monospace align-middle fs-5"
                            id="active"
                          ></p>
                        </div>
                        <div className="d-flex">
                          <div className="m-auto">
                            <button className="btn btn-primary">
                              <Link
                                to={`/orders/complete/${order._id}`}
                                style={{
                                  color: "white",
                                  fontSize: "1em",
                                  textDecoration: "none",
                                }}
                              >
                                Complete
                              </Link>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </>
            ))}
        </div>
      </div>
    );
  }
}

export default OrdersPanel;
