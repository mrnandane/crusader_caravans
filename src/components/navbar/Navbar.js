import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
// import { connect } from "react-redux";
import "./Navbar.scss";
import logo from "../../assets/images/crusader-logo.svg";
import glossaryLogo from "../../assets/images/glossary.png";
// import homeIcon from "../../assets/images/homeIcon.png";
// import backtestIcon from "../../assets/images/backtestIcon.png";
// import featureListIcon from "../../assets/images/featureListIcon.png";
import notificationIcon from "../../assets/images/notificationIcon.png";
// import predictionIcon from "../../assets/images/predictionIcon.png";
import profileIcon from "../../assets/images/profileIcon.png";

const NavItem = ({ iconPath, navLabel, navigateTo }) => {
  const linkClassName = `row mx-0 ml-2 nav-item align-items-center`;
  const isExact = navigateTo === "/";
  return (
    <li className={linkClassName}>
      <NavLink
        className="nav-link"
        to={navigateTo}
        exact={isExact}
        activeClassName="active-nav"
      >
        <span>
          <img src={iconPath} alt="icon" className="scale-50" />
        </span>
        <span className="nav-label-text p-2">{navLabel}</span>
      </NavLink>
    </li>
  );
};

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProfilePopup: false
    };
  }

  showProfile = event => {
    event.preventDefault();
    this.setState({ showProfilePopup: true }, () => {
      document.addEventListener("click", this.hideProfile);
    });
  };

  hideProfile = () => {
    this.setState({ showProfilePopup: false }, () => {
      document.removeEventListener("click", this.hideProfile);
    });
  };
  onLogoClicked = () => {
    this.props.history.push("/");
  };
  setPreference = () => {
    // this.props.history.push('/preferences');
  };
  logout = () => {
    // localStorage.clear();
    // var logoutObj = this.props.kc;
    // logoutObj.logout();
  };
  render() {
    // const classNameNavBarWrapper = `row mx-0 ${
    //   this.props.location.pathname === '/preferences' ? 'd-none' : 'd-block'
    //   }`;
    return (
      <div className="row mx-0">
        <div className="col-md-12 p-0">
          <div>
            <nav className="navbar navbar-expand-lg">
              <div
                className="collapse navbar-collapse"
                id="navbarTogglerDemo01"
              >
                <span
                  className="navbar-brand col-md-1 text-center"
                  onClick={this.onLogoClicked}
                >
                  <img src={logo} alt="Logo" height="80" width="150" />
                </span>
                {/* <ul className="col-md-6 navbar-nav mr-auto mt-2 mt-lg-0">
                  <NavItem iconPath={homeIcon} navLabel="Home" navigateTo="/" />
                  <NavItem
                    iconPath={featureListIcon}
                    navLabel="Feature List"
                    navigateTo="/feature-list"
                  />
                  <NavItem
                    iconPath={backtestIcon}
                    navLabel="Backtest"
                    navigateTo="/backtest"
                  />
                  <NavItem
                    iconPath={predictionIcon}
                    navLabel="Predictions"
                    navigateTo="/predictions"
                  />
                </ul> */}
                <div className="col-md-3 col-md-offset-3 d-none">
                  <span className="pl-5">
                    <img src={glossaryLogo} alt="icon" height="32" width="91" />
                  </span>
                  <span className="pl-3">
                    <img
                      src={notificationIcon}
                      alt="icon"
                      className="scale-50"
                    />
                  </span>
                  <span className="pl-3">
                    <span>
                      <img src={profileIcon} alt="icon" className="scale-50" />
                    </span>
                    {/* <span className={'glyphicon glyphicon-menu-down'} /> */}
                    <i
                      className="icon-down-open-2"
                      onClick={this.showProfile}
                    />
                    {this.state.showProfilePopup ? (
                      <ul className="drop-list">
                        <li className="drop-menu" onClick={this.setPreference}>
                          Manage Profile
                        </li>
                        <li className=" drop-menu logout" onClick={this.logout}>
                          Sign Out
                        </li>
                      </ul>
                    ) : null}
                  </span>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   kc: state.keycloak
// });
export default withRouter(Navbar);
