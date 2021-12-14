import React, { Component } from "react";
import "../style/myprofile.scss";
import userSerivce from "../../services/userService";
import { Link } from "react-router-dom";

class myProfile extends Component {
  state = { user: {}, orders: {} };
  async componentDidMount() {
    const user = userSerivce.getCurrentUser();
    const usered = await userSerivce.getUser(user._id);
    const readyUser = usered.data;
    const ordersData = readyUser.orders;
    console.log(ordersData);
    this.setState({
      user: readyUser,
      orders: ordersData,
    });
  }

  render() {
    const { user, orders } = this.state;

    return (
      <div className="container mt-5">
        <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar7.png"
                      alt="Admin"
                      className="rounded-circle"
                      width="150"
                    />
                    <div className="mt-3">
                      <h4>{user.name}</h4>
                      <p className="text-secondary mb-1">Role: {user.role}</p>
                      <p className="text-muted font-size-sm">
                        Address: {user.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {user.name} {user.lastName}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{user.email}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Phone</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{user.phone}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Address</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {user.address}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-12">
                      <Link
                        className="btn btn-info "
                        target="__blank"
                        to={`/users/myprofile/${user._id}/edit`}
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <p className="fs-1">Orders: {orders.length}</p>
            </div>
            <div className="d-flex row">
              {orders.length ? (
                orders.reverse().map((order, index) => (
                  <div key={order._id}>
                    <div
                      className="card col-3 col-md-3 col-lg-3 mt-5"
                      style={{ width: "100%" }}
                    >
                      <div className="card-body">
                        <h5 className="card-title">
                          <span>{index + 1}</span>
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
                          <b>For: </b> {order.user.name} ({order.user.email}
                          )
                          <br />
                          <b>Restaurant: </b> {order.restaurant.name}
                          <br />
                          <br />
                          <br />
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>
                  Sorry {user.name}, you have not created any order yet!!
                  <br></br>
                  <button className="btn btn-primary">
                    <Link to="/orders/create" className="btn-primary text-decoration-none">
                      Create Order
                    </Link>
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default myProfile;
