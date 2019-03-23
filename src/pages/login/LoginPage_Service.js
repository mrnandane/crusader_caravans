import * as axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const getUserDetails = email => {
  let keyCloak = JSON.parse(localStorage.getItem('keycloakToken'));
  var config = {
    headers: { Authorization: 'Bearer ' + keyCloak.token }
  };
  return (
    axios
      .get(`/api/v1/user/email/${email}`, config)
      // .get(`/api/v1/user/filter/email/${email}`, config)
      .then(res => res.data)
  );
};

export { getUserDetails };
