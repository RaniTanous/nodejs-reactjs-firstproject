import React, { Component } from "react";
import resService from "../../services/resService";
import "../style/ourRestaurants.scss";
import PageHeader from "../common/pageHeader";

class allRestaurnts extends Component {
  state = { restaurants: [] };

  async componentDidMount() {
    const { data } = await resService.getRestaurants();

    if (data.length) {
      this.setState({
        restaurants: data,
      });
    }
  }

  render() {
    const { restaurants } = this.state;

    return (
      <div className="container">
        <PageHeader title="Restaurants!" />
        <div className="row">
          <div className="col-12">
            <p>All the restaurants are in the list below..</p>
          </div>
        </div>
       {restaurants.length ? (
 <div className="row">
 {restaurants.length &&
   restaurants.map((restaurant, index) => (
     <div className="col-6 col-md-3 col-lg-3 mt-3">
       <div className="card">
         <img
           src={restaurant.resImage}
           alt={restaurant.resName}
           className="img-thumbnail rounded"
         />
         <div className="card-body">
           <h5 className="card-title">{restaurant.resName}</h5>
           <p className="card-text">{restaurant.resDescription}</p>
           <p className="card-text border-top pt-2">
             <b>Tel: </b> {restaurant.resPhone}
             <br />
             <b>Address: </b> {restaurant.resAddress}
           </p>
         </div>
       </div>
     </div>
   ))}
</div>
       ): (
        <p>No restaurants are listed yet, please wait for an admin to list them again!</p>
       )}
      </div>
    );
  }
}

export default allRestaurnts;
