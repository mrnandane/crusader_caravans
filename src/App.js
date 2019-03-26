import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.scss";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import PageNotFound from "./pages/errorPage/PageNotFound";
import Navbar from "./components/navbar/Navbar";
import LoginPage from "./pages/login/LoginPage";
// import { setKeycloakObj } from "./../src/pages/login/LoginPage_Action";
// import Keycloak from "keycloak-js";
import PreLoader from "./components/pre-loader/PreLoader";

// const kc = Keycloak("/keycloak.json");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: true,
      // isFirstTimeLoggedIn: undefined,
      showNavbar: true
      // keycloak: null
    };
  }

  componentDidMount() {
    // kc.init({ onLoad: "login-required" }).then(authenticated => {
    //   console.log("kc", kc);
    //   console.log("authenticated", authenticated);
    //   localStorage.setItem("keycloakToken", JSON.stringify(kc));
    //   this.props.setKeycloakObj(kc);
    //   this.setState({
    //     keycloak: kc
    //   });
    // });
    // if (JSON.parse(localStorage.getItem("keycloakToken")) !== null) {
    //   this.props.setKeycloakObj(
    //     JSON.parse(localStorage.getItem("keycloakToken"))
    //   );
    // }
  }

  componentWillReceiveProps(nextProps) {
    // this.setState({
    //   isFirstTimeLoggedIn: nextProps.auth.data.is_first_login,
    //   isAuthenticated: nextProps.auth.isAuthenticated
    // });
  }

  render() {
    const user = JSON.parse(localStorage.getItem("userprofile"));
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          user ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    );

    // if (this.state.keycloak) {
    return (
      <Router>
        <div className="h-100">
          <Navbar />
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/login" component={LoginPage} />
            {/* <PrivateRoute path="/feature-list" component={FeatureListPage} />
            <PrivateRoute path="/backtest" component={BackTestPage} />
            <PrivateRoute path="/predictions" component={PredictionsPage} />
            <PrivateRoute path="/preferences" component={PreferencesPage} />
            <PrivateRoute
              path="/create-feature"
              component={CreateFeaturePage}
            /> */}
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    );
    // }
    // return <PreLoader />;
  }
}
// const mapStateToProps = state => ({
//   auth: state.auth
// });

// const mapDispatchToProps = { setKeycloakObj };

export default App;

//export default connect(mapStateToProps)(App);
