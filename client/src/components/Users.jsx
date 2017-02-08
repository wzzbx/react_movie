import React, {Component} from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import ListUserMovies from './ListUserMovies.jsx';

class Users extends Component {
    constructor(props) {
        super(props);

        this.getUsers = this
            .getUsers
            .bind(this);

        this.filterList = this
            .filterList
            .bind(this);
        this.setUserEmail = this
            .setUserEmail
            .bind(this);

        this.state = {
            users: [],
            searchList: [],
            userMovies: [],
            userEmail: ''
        }

    }

    componentDidMount() {
        this.getUsers();

    }

    filterList(event) {
        let state = this.state.users;

        let updatedList = this.state.searchList;

        updatedList = updatedList.filter((item) => {

            if (item.name.toLowerCase().indexOf(event.target.value) != -1) 
                return updatedList.push(item);
            }
        );
        this.setState({searchList: updatedList});
        if (event.target.value == '') 
            this.setState({searchList: state});
        }
    
    getUsers() {

        let that = this;
        axios
            .get('https://localhost:3000/api/users')
            .then(function (response) {
                let users = Object.assign({}, response.data);
                users = Object
                    .keys(users)
                    .map(function (key) {
                        return users[key];
                    });
                that.setState({users: users});
                that.setState({searchList: users});
            })
            .catch(function (error) {
                console.log(error)
            })

    }

    setUserEmail(event) {

        this.setState({userEmail: event.target.value})

    }

    render() {
        return (

            <div className="row">
                <div className="col-sm-4">
                    <input
                        type="text"
                        placeholder="Search User"
                        onChange={this.filterList}
                        style={{
                        marginBottom: 2 + 'px',
                        marginLeft: 2 + 'px'
                    }}/>      

                    <div className="list-group">

                        {this
                            .state
                            .searchList
                            .map((user) => {
                                return (
                                 
                                    <button
                                        className="btn btn-warning"
                                        style={{
                                        marginBottom: 2 + 'px',
                                        marginLeft: 2 + 'px',
                                        marginTop: 8 + 'px',
                                        marginRigh: 2 + 'px'
                                    }}
                                        key={user._id}
                                        type="button"
                                        className="list-group-item"
                                        value={user.email}
                                        onClick={this.setUserEmail}>{user.name}
                                        - Movies</button>
                                )
                            })}
                    </div>

                </div>
                <ListUserMovies email={this.state.userEmail}/>
            </div>

        );
    }
}

export default Users;