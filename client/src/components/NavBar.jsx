import React, {Component} from 'react'
import Auth from '../auth/Auth.js'
import {Link, IndexLink} from 'react-router'

class NavBar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">React movie database</a>
                        </div>

                        <ul className="nav navbar-nav navbar-right">

                            {Auth.isUserAuthenticated()
                                ? (
                                    <li>
                                        <Link to="/logout">
                                            <span className="glyphicon glyphicon-user"></span>
                                            Sign Out
                                        </Link>
                                    </li>
                                )
                                : (
                                    <li>
                                        <a href="https://evening-river-26102.herokuapp.com/auth/google">
                                            <span className="glyphicon glyphicon-log-in"></span> Login
                                        </a>
                                    </li>
                                )}

                        </ul>
                    </div>
                </nav>
            </div>

        )
    }
}
export default NavBar;