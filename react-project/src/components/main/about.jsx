import React from "react";
import Form from "../common/form";

class About extends Form {
  state = {};

  render() {
    return (
      <>
        <p style={{marginTop: "10em", fontSize: "3em"}}>Steps to do in order to view the project:</p>
        <div className="list" style={{fontSize: "1em"}}>
          <ul className="list" style={{fontSize: "1em"}}>
            <li>Register a new admin account</li>
            <li>Go to Admin Panel and create a multiple restaurants</li>
            <li>You can view the restaurants on the restaurants nav-link</li>
            <li>Then go try and make an order near the restaurant button and choose the restaurant you want</li>
            <li>After you create an order, go to Admin Panel again and view the orders</li>
            <li>You can also see your OWN orders inside your profile</li>
            <li>You can edit the profile with pressing on the EDIT button inside profile</li>
            <li>You can view the active Orders at Admin Panel and the completed orders at Trahsed orders</li>
            <li>You can logout now and create a normal account and then go for the same process but with no admin controls.</li>
          </ul>
        </div>
      </>
    );
  }
}

export default About;
