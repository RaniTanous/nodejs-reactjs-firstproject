import React, { Component } from "react";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/main/navbar";
import Home from "./components/main/home";
import About from "./components/main/about";
import Footer from "./components/main/footer";
import SignUp from "./components/accountsystem/signup";
import Login from "./components/accountsystem/login";
import userSerivce from "./services/userService";
import Logout from "./components/accountsystem/logout";
import SignUpBiz from "./components/accountsystem/signupBiz";
import ProtectedRoute from "./components/common/protectedRoute";
import allRestaurnts from "./components/restaurants/ourRestaurants";
import CreateRestaurant from "./components/restaurants/createRestaurant";
import DeleteRestaurant from "./components/restaurants/deleteRestaurant";
import UserPanel from "./components/adminpanel/usersPanel";
import RestaurantPanel from "./components/adminpanel/restaurantsPanel";
import EditRestaurant from "./components/restaurants/editRestaurant";
import CreateOrder from "./components/orders/createOrder";
import OrdersPanel from "./components/adminpanel/ordersPanel";
import trashedOrders from "./components/adminpanel/trashedOrders";
import completedOrder from "./components/adminpanel/completedOrder";
import myProfile from "./components/main/myProfile";
import editProfile from "./components/main/editProfile";
import DeleteUser from "./components/adminpanel/deleteUser";

class App extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    const user = userSerivce.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <div className="App d-flex flex-column min-vh-100">
        <ToastContainer />
        <header>
          <Navbar user={user} />
        </header>
        <main className="container flex-fill">
          <Switch>
            <ProtectedRoute
              path="/restaurants/edit/:id"
              component={EditRestaurant}
              user={user}
              biz={true}
            />
            <ProtectedRoute
              path="/users/myprofile/:id/edit"
              component={editProfile}
              user={user}
              biz={true}
            />
            <ProtectedRoute
              path="/restaurants/delete/:id"
              component={DeleteRestaurant}
              biz={true}
            />{" "}
            <ProtectedRoute
              path="/users/delete/:id"
              component={DeleteUser}
              biz={true}
            />
            <ProtectedRoute
              path="/restaurants/all"
              component={allRestaurnts}
              user={user}
            />
            <ProtectedRoute
              path="/restaurants/panel"
              component={RestaurantPanel}
            />{" "}
            <ProtectedRoute
              path={"/users/myprofile/:id"}
              component={myProfile}
              user={user}
            />
            <ProtectedRoute
              path="/orders/complete/:id"
              component={completedOrder}
              biz={true}
            />
            <ProtectedRoute path="/orders/panel" component={OrdersPanel} />
            <ProtectedRoute
              path="/orders/completed"
              component={trashedOrders}
            />
            <ProtectedRoute path="/users/panel" component={UserPanel} />
            <ProtectedRoute path="/orders/create" component={CreateOrder} />
            <ProtectedRoute path="/restaurants" component={CreateRestaurant} />
            <Route path="/About" component={About} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signupbiz" component={SignUpBiz} />
            <Route path="/signin" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route exact path="/" component={Home} />
            <Redirect to="/page-not-found" />
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

export default App;
