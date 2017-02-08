import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Users from './Users.jsx';
import axios from 'axios';

class HomePage extends Component {
    constructor(props) {
        super(props);
     
        this.state = {
            token: ''
        }
       
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="full-width-div">

                            <Users/>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;