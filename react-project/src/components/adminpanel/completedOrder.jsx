import { Component } from "react";
import { toast } from "react-toastify";
import orderService from "../../services/orderService";

class completedOrder extends Component {

  async componentDidMount() {
    await orderService.assignOrder(this.props.match.params.id);
    toast("Order has been completed");
    this.props.history.replace("/orders/panel");
  }

  render() {
    return null;
  }
}

export default completedOrder;
