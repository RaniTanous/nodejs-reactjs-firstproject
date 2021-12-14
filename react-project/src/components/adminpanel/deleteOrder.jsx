import { Component } from "react";
import { toast } from "react-toastify";
import orderService from "../../services/orderService";

class DeleteOrder extends Component {
  async componentDidMount() {
    await orderService.deleteOrder(this.props.match.params.id);
    toast("Order has been removed");
    this.props.history.replace("/orders/panel");
  }

  render() {
    return null;
  }
}

export default DeleteOrder;
