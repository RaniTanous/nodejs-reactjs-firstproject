import React, { Component } from "react";
import resService from "../../services/resService";
import "../style/adminpanel.scss";
import { Link } from "react-router-dom";

class RestaurantPanel extends Component {
  state = { restaurants: [] };

  async componentDidMount() {
    const { data } = await resService.getRestaurants();
    if (data.length) {
      this.setState({
        restaurants: data,
      });
    }
  }

  turnRestaurant() {
    const restaurant = document.getElementById("restaurantdiv");
    if (restaurant.style.display === "none") {
      restaurant.style.display = "block";
    } else {
      restaurant.style.display = "none";
    }
  }

  render() {
    const { restaurants } = this.state;
    return (
      <div className="container" id="restaurantdiv">
        {restaurants.length ? (
          <>
            <Link to={`/restaurants/create`}>Create a new restaurant</Link>
            <table className="table table-hover table-dark mt-5">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="text-center font-monospace align-middle fs-5"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="text-center font-monospace align-middle fs-5"
                  >
                    Photo
                  </th>
                  <th
                    scope="col"
                    className="text-center font-monospace align-middle fs-5"
                  >
                    Restaurant Name
                  </th>
                  <th
                    scope="col"
                    className="text-center font-monospace align-middle fs-5"
                  >
                    Restaurant Description
                  </th>
                  <th
                    scope="col"
                    className="text-center font-monospace align-middle fs-5"
                  >
                    Restaurant Address
                  </th>
                  <th
                    scope="col"
                    className="text-center font-monospace align-middle fs-5"
                  >
                    Restaurant Phone
                  </th>
                  <th
                    scope="col"
                    className="text-center font-monospace align-middle fs-5"
                  >
                    Restaurant Open Hours
                  </th>
                  <th
                    scope="col"
                    className="text-center font-monospace align-middle fs-5"
                  >
                    Restaurant Number
                  </th>
                  <th
                    scope="col"
                    className="text-center font-monospace align-middle fs-5"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody id="tbody">
                {restaurants.length &&
                  restaurants.map((restaurant, index) => (
                    <tr key={restaurant._id}>
                      <th
                        scope="row"
                        className="text-center font-monospace align-middle fs-5"
                      >
                        {index + 1}
                      </th>
                      <td>
                        <img
                          style={{ width: "89px", height: "80px" }}
                          src={restaurant.resImage}
                          alt={restaurant.resName}
                          className="table-img"
                        />
                      </td>
                      <td className="text-center font-monospace align-middle fs-5">
                        {restaurant.resName}
                      </td>
                      <td className="text-center font-monospace align-middle fs-5">
                        {restaurant.resDescription}
                      </td>
                      <td className="text-center font-monospace align-middle fs-5">
                        {restaurant.resAddress}
                      </td>
                      <td className="text-center font-monospace align-middle fs-5">
                        {restaurant.resPhone}
                      </td>
                      <td className="text-center font-monospace align-middle fs-5">
                        {restaurant.resOpenHours}
                      </td>
                      <td className="text-center font-monospace align-middle fs-5">
                        {restaurant.resNumber}
                      </td>
                      <td className="text-center font-monospace align-middle fs-5">
                        <Link to={`/restaurants/edit/${restaurant._id}`}>
                          Edit
                        </Link>{" "}
                        <Link to={`/restaurants/delete/${restaurant._id}`}>
                          Delete
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <p className="mt-5"> 
              Sorry, there's no created restauranat yet!!!
              <br></br>
              <button className="btn btn-primary">
                <Link
                  to="/restaurants/create"
                  className="btn-primary text-decoration-none"
                >
                  Create a Restaurant
                </Link>
              </button>
            </p>
          </>
        )}
      </div>
    );
  }
}

export default RestaurantPanel;
