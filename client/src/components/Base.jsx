import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router'
import Auth from '../auth/Auth.js'
import {browserHistory} from 'react-router'
import Jumbotron from './Jumbotron.jsx'
import NavBar from './NavBar.jsx'

class Base extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      token: ''
    }

    console.log(this.state.token)
  }

  componentWillMount() {
    this.login()
  }
  componentDidMount() {
    browserHistory.push('/')
  }

  login() {
    let that = this;
    let token_user = window
      .location
      .hash
      .substr(1)
    let _token_user = token_user.split('user=')
    let _token = _token_user[0].slice(0, -1)
    let _user = _token_user[1]

    if (_token) {

      Auth.authenticateUser(_token)
      Auth.loggedUser = _user;

    }

  }

  render() {
    return (
      <div>
        <NavBar />
        <Jumbotron />
        {this.props.children}
      
      </div>

    );
  }

}


Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;