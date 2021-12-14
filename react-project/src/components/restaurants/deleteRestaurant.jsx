import { Component } from "react";
import { toast } from "react-toastify";
import resService from "../../services/resService";

class DeleteRestaurant extends Component {
  async componentDidMount() {
    await resService.deleteRestaurant(this.props.match.params.id);
    toast("Restaurant has been removed");
    this.props.history.replace("/restaurants/panel");
  }

  render() {
    return null;
  }
}

export default DeleteRestaurant;
