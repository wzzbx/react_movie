import React, {Component, PropTypes} from 'react'
import axios from 'axios'
import qs from 'querystring'
import {Modal, ModalManager, Effect} from 'react-dynamic-modal'
import Auth from '../auth/Auth.js'
import AddModal from './AddModal.jsx'
import EditModal from './EditModal.jsx'

class ListUserMovies extends Component {
    constructor(props) {
        super(props);
        this.getMovies = this
            .getMovies
            .bind(this);
        this.deleteMovie = this
            .deleteMovie
            .bind(this);
        this.editMovie = this
            .editMovie
            .bind(this);
        this.addMovie = this
            .addMovie
            .bind(this);
        this.state = {
            email: "",
            movieId: "",
            movies: [],
            searchList: [],
            isDisabled: false
        }
        
    }
    addMovie(){
        if( this.state.email === '' || this.state.isDisabled ) return;
       
        ModalManager.open(<AddModal
            email={this.state.email}
            
            onRequestClose={() => true}
            getMovies={this.getMovies}/>);


    }


    editMovie(event) {
        let movie = this
            .state
            .movies
            .filter((movie) => {
                if (movie._id === event.target.id) 
                    return movie;
                }
            )
        console.log(movie)
        ModalManager.open(<EditModal
            email={this.state.email}
            movie={movie}
            onRequestClose={() => true}
            getMovies={this.getMovies}/>);
    }
    getMovies(email) {
    
        let that = this;
      
        axios
            .get('https://localhost:3000/api/user/' + email + '/movies')
            .then(function (response) {

                let movies = Object.assign({}, response.data);
                movies = Object
                    .keys(movies)
                    .map(function (key) {
                        return movies[key];
                    });
          
                that.setState({movies: movies});
                that.setState({searchList: movies});
               
            })
            .catch(function (error) {
                console.log(error)
            })

    }
  
  
      
    

    deleteMovie(event) {
        let email = this.state.email;
      
        axios
            .get('https://localhost:5000/api/user/' + email + '/deletemovie/' + event.target.value)
            .then(function (response) {
               
            })
            .catch(function (error) {
                console.log(error);
            })
            this.getMovies(email);
    }

    componentWillReceiveProps(newProps) {
     
        if ( Auth.isUserAuthenticated() && Auth.loggedUser === newProps.email) {  this.setState({ isDisabled: false }) } else { this.setState({isDisabled: true}) }
        
        if (this.state.email !== newProps.email) {
            console.log("setting email");
            this.setState({
                email: newProps.email
            }) 
            
            this.getMovies(newProps.email);
        }

    }

  
    
    render() {
        return (
            <div className="col-sm-8" style= {{marginTop: 7 + 'px'}}>
         
                <button
                   className= {this.state.isDisabled===true  ? 'btn btn-primary disabled' : 'btn btn-primary'}  
                    style={{
                    marginBottom: 2 + 'px'
                }}
                
                onClick= {this.addMovie}  
               >Add Movie</button>
            
                <table className="table table-bordered table-hover table-responsive">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Year</th>
                            <th>Link</th>
                              {Auth.isUserAuthenticated() && Auth.loggedUser === this.state.email &&
                            <th>Actions</th>
                              }
                        </tr>
                    </thead>
                    <tbody>
                        {this
                            .state
                            .movies
                            .map((movie) => {
                                return (
                                    <tr key={movie._id}>
                                        <td>{movie.title}</td>
                                        <td>{movie.released}</td>
                                        <td>
                                            <a href={movie.url}>{movie.url}</a>
                                        </td>
                                        {Auth.isUserAuthenticated() && Auth.loggedUser === this.state.email &&
                                        <td>    

                                          
                                            <button className="btn btn-danger" onClick={this.deleteMovie} value={movie._id}>Delete</button>
                                            <button className="btn btn-primary" onClick={this.editMovie} id={movie._id}>Edit</button>
                                        </td>
                               }

                                    </tr>
                                )
                            })}
                    </tbody>
                </table>

            </div>
        );
    }
}

export default ListUserMovies;