import React, { Component } from 'react';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { fetchUser } from './LoginPage_Action';
import { Redirect } from 'react-router';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstLogin: false,
      isAuthenticated: false,
      userData: null
    };
  }

  componentDidMount() {
    let user = JSON.parse(localStorage.getItem('keycloakToken'));
    let decoded = jwt_decode(user.token);
    this.props.fetchUser(decoded.email);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      firstLogin: nextProps.auth.data.is_first_login,
      isAuthenticated: nextProps.auth.isAuthenticated,
      userData: nextProps.auth.data
    });
  }

  render() {
    if (this.state.firstLogin && this.state.isAuthenticated) {
      return <Redirect to="/preferences" />;
    } else if (!this.state.firstLogin && this.state.isAuthenticated) {
      return <Redirect to="/" />;
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = { fetchUser };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
