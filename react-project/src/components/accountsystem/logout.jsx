import { Component } from "react";
import { toast } from "react-toastify";
import userSerivce from "../../services/userService";

class Logout extends Component {
  componentDidMount() {
    userSerivce.logout();
    toast("Good bye!!")
    setTimeout(() => {
      window.location = "/";
    }, 2000);
  }
  render() {
    return (
      <div className="container d-flex justify-content-center align-items-center" id="div">
        <p className="fn-2 text-danger">
          Good bye!
        </p>
      </div>
    );
  }
}

export default Logout;
