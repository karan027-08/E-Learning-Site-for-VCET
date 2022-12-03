import React, { Component } from "react";
import "./Navbar.css";
import { NavLink, Redirect } from "react-router-dom";
import Logo from "../../../UI/Logo/Logo";
import AuthServices from "../../../../ApiServices/auth.service";
import { GoogleLogout } from "react-google-login";
import Search from "../../Search/search";

class Navbar extends Component {
  state = {
    isLoggedIn: false,
    userName: "Profile",
    redirect: null,
    isAdmin: null,
  };

  componentDidMount() {
    let userToken = AuthServices.getCurrentUser();
    let userName = AuthServices.getUserName();
    let isAdmin = AuthServices.getAdminStatus();

    if (userToken !== null) {
      this.setState({ isLoggedIn: true, userName: userName, isAdmin: isAdmin });
    }
  }

  logout = () => {
    this.setState({ redirect: "/login" });
    AuthServices.logout();
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }

    let LoginLinks = (
      <ul className="navbar-nav ml-auto">
        <li
          className="nav-item"
          data-toggle="tooltip"
          data-placement="top"
          title="Create Your Course"
        >
          <NavLink
            to="/teacherhome"
            activeClassName="teacherActive"
            className="nav-link teachLink"
          >
            Teach on V.C.E.T
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/bookmark" className="nav-link ">
            <i
              data-toggle="tooltip"
              data-placement="top"
              title="Bookmark"
              className="fa fa-book"
              aria-hidden="true"
            >
              <span id="bookmarkNav"> Bookmark </span>
            </i>
          </NavLink>
        </li>

        {/* <li className='nav-item '>
        <NavLink to="/"  
        className="nav-link profileName">
              {this.state.userName}</NavLink>
        </li> */}

        <li className="nav-item">
          <GoogleLogout
            clientId={process.env.REACT_APP_GOOGLE_API_KEY}
            buttonText="Logout"
            render={(renderProps) => (
              <NavLink
                to="/"
                onClick={this.logout}
                disabled={renderProps.disabled}
                className="nav-link logoutlink"
              >
                {" "}
                Logout{" "}
              </NavLink>
            )}
            onLogoutSuccess={this.logout}
          ></GoogleLogout>
        </li>
      </ul>
    );

    if (localStorage.getItem("user") === null) {
      LoginLinks = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink
              to="/signup"
              activeClassName="btnactive"
              className="nav-link Signupbtn"
            >
              Signup
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/login"
              activeClassName="btnactive"
              className="nav-link Loginbtn"
            >
              Login
            </NavLink>
          </li>
        </ul>
      );
    }
    if (this.state.isAdmin == "false") {
      LoginLinks = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink to="/bookmark" className="nav-link ">
              <i
                data-toggle="tooltip"
                data-placement="top"
                title="Bookmark"
                className="fa fa-book"
                aria-hidden="true"
              >
                <span id="bookmarkNav"> Bookmark </span>
              </i>
            </NavLink>
          </li>

          {/* <li className='nav-item '>
        <NavLink to="/"  
        className="nav-link profileName">
              {this.state.userName}</NavLink>
        </li> */}

          <li className="nav-item">
            <GoogleLogout
              clientId={process.env.REACT_APP_GOOGLE_API_KEY}
              buttonText="Logout"
              render={(renderProps) => (
                <NavLink
                  to="/"
                  onClick={this.logout}
                  disabled={renderProps.disabled}
                  className="nav-link logoutlink"
                >
                  {" "}
                  Logout{" "}
                </NavLink>
              )}
              onLogoutSuccess={this.logout}
            ></GoogleLogout>
          </li>
        </ul>
      );
    }

    return (
      <nav className=" navbar navbar-expand-lg sticky-top ">
        <NavLink to="/home/all" className="navbar-brand">
          <Logo />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fa fa-bars" aria-hidden="true"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown">
              <a
                href={"/"}
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Category
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <NavLink
                  className="dropdown-item"
                  to="/home/all"
                  activeClassName="active-categoryMenu"
                >
                  All Courses
                </NavLink>
                <NavLink
                  className="dropdown-item"
                  to="/home/Web Development"
                  activeClassName="active-categoryMenu"
                >
                  Web Development{" "}
                </NavLink>
                <NavLink
                  className="dropdown-item"
                  to="/home/Web Designing"
                  activeClassName="active-categoryMenu"
                >
                  Web Designing{" "}
                </NavLink>
                <NavLink
                  className="dropdown-item"
                  to="/home/React"
                  activeClassName="active-categoryMenu"
                >
                  React
                </NavLink>
                <NavLink
                  className="dropdown-item"
                  to="/home/NodeJs"
                  activeClassName="active-categoryMenu"
                >
                  NodeJs
                </NavLink>
                <NavLink
                  className="dropdown-item"
                  to="/home/ML"
                  activeClassName="active-categoryMenu"
                >
                  Machine Learning{" "}
                </NavLink>
                <NavLink
                  className="dropdown-item"
                  to="/home/Photography"
                  activeClassName="active-categoryMenu"
                >
                  Photography
                </NavLink>
                <NavLink
                  className="dropdown-item"
                  to="/home/IOT"
                  activeClassName="active-categoryMenu"
                >
                  IOT{" "}
                </NavLink>
              </div>
            </li>
          </ul>
          <Search />
          {LoginLinks}
        </div>
      </nav>
    );
  }
}

export default Navbar;
