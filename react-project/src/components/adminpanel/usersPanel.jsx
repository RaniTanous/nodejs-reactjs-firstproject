import React, { Component } from "react";
import "../style/adminpanel.scss";
import { Link } from "react-router-dom";
import userService from "../../services/userService";

class UserPanel extends Component {
  state = { user: [], users: [] };

  async componentDidMount() {
    const onlineUsers = await userService.getUsers();
    const updatedUsers = onlineUsers.data;
    if (updatedUsers.length) {
      this.setState({
        users: updatedUsers,
      });
    }
  }

  render() {
    const { users } = this.state;
    return (
      <>
        <div className="container" id="usersdiv">
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
                  Name
                </th>
                <th
                  scope="col"
                  className="text-center font-monospace align-middle fs-5"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="text-center font-monospace align-middle fs-5"
                >
                  Administrator
                </th>
                <th
                  scope="col"
                  className="text-center font-monospace align-middle fs-5"
                >
                  Active/Not-Active
                </th>
                <th
                  scope="col"
                  className="text-center font-monospace align-middle fs-5"
                >
                  Created At
                </th>
                <th
                  scope="col"
                  className="text-center font-monospace align-middle fs-5"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.length &&
                users.map((user, index) => (
                  <tr key={user._id}>
                    <th
                      scope="row"
                      className="text-center font-monospace align-middle fs-5"
                    >
                      {index + 1}
                    </th>
                    <td className="text-center font-monospace align-middle fs-5">
                      {user.name}
                    </td>
                    <td className="text-center font-monospace align-middle fs-5">
                      {user.email}
                    </td>
                    <td className="text-center font-monospace align-middle fs-5">
                      {user?.biz ? <p id="yes">Yes</p> : <p id="no">No</p>}
                    </td>
                    <td className="text-center font-monospace align-middle fs-5">
                      {user?.isActive ? (
                        <p
                          className="text-center font-monospace align-middle fs-5"
                          id="active"
                        ></p>
                      ) : (
                        <p
                          className="text-center font-monospace align-middle fs-5"
                          id="inactive"
                        ></p>
                      )}
                    </td>
                    <td className="text-center font-monospace align-middle fs-5">
                      {user.createdAt}
                    </td>
                    <td className="text-center font-monospace align-middle fs-5">
                      {" "}
                      <Link to={`/users/delete/${user._id}`}>Delete</Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default UserPanel;
