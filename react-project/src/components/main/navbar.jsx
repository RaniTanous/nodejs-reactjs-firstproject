import { Link, NavLink } from "react-router-dom";
import "../style/navbar.scss";
const Navbar = ({ user }) => {
  return (
    <>
      <nav
        className="navbar-expand-md navbar navbar-dark bg-dark shadow-sm"
        aria-label="Fourth navbar example"
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            Real<i className="bi bi-geo-fill"></i>App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample04"
            aria-controls="navbarsExample04"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExample04">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/about"
                  activeClassName="active"
                >
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/restaurants/all">
                  Restaurnts
                </NavLink>
              </li>{" "}
              <li className="nav-item">
                <NavLink className="nav-link" to="/orders/create">
                  Order
                </NavLink>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto mb-2 mb-md-0">
              {user?.biz && (
                <ul className="dropdown nav-item">
                  <span className="text-danger nav-link">Admin Panel</span>
                  <div className="dropdown-content">
                    <li>
                      <NavLink
                        className="nav-link navlinkspecial"
                        to="/orders/panel"
                        activeClassName="active"
                      >
                        Orders
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="nav-link navlinkspecial"
                        to="/orders/completed"
                        activeClassName="active"
                      >
                        Trashed Orders
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="nav-link navlinkspecial"
                        to="/users/panel"
                        activeClassName="active"
                      >
                        Users
                      </NavLink>
                    </li>{" "}
                    <li>
                      <NavLink
                        className="nav-link navlinkspecial"
                        to="/restaurants/panel"
                        activeClassName="active"
                      >
                        Restaurants
                      </NavLink>
                    </li>
                  </div>
                </ul>
              )}
              {user ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to={`/users/myprofile/${user._id}`}
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/logout"
                    >
                      Sign Out
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signin">
                      Sign In
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signup">
                      Sign Up
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signupbiz">
                      Sign Up for Admin
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
