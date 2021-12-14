import { Component } from "react";
import { toast } from "react-toastify";
import userService from "../../services/userService";

class DeleteUser extends Component {
  async componentDidMount() {
    await userService.deleteUser(this.props.match.params.id);
    toast("User has been removed");
    this.props.history.replace("/users/panel");
  }

  render() {
    return null;
  }
}

export default DeleteUser;
