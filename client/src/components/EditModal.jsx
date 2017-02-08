import React, {Component, PropTypes} from 'react'
import {Modal, ModalManager, Effect} from 'react-dynamic-modal'
import axios from 'axios'
import qs from 'querystring'

class EditModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            movieId: props.movie[0]._id,
            email: props.email,
            movieTitle: props.movie[0].title,
            movieReleased: props.movie[0].released,
            movieUrl: props.movie[0].url

        }

    }

    onSubmit(event) {
      
        event.preventDefault()
        axios
            .post('https://evening-river-26102.herokuapp.com/api/user/updatemovie/' + this.state.movieId, qs.stringify({title: this.refs.title.value, released: this.refs.released.value, url: this.refs.url.value}))
            .then(function (response) {})
            .catch(function (error) {
                console.log(error)
            });
             this.props.getMovies(this.props.email);
    }

    render() {

        return (
            <Modal onRequestClose={this.props.onRequestClose} effect={Effect.Newspaper}>

                <form
                    className="form-inline"
                    onSubmit={this
                    .onSubmit
                    .bind(this)}>
                    <h2>
                        Edit - {this.state.movieTitle}
                    </h2>
                    <table className="table table-bordered table-responsive">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Year</th>
                                <th>Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input
                                        className="form-control"
                                        id="title"
                                        type="text"
                                        defaultValue={this.state.movieTitle}
                                        name="title"
                                        ref="title"/><br/>
                                </td>
                                <td>
                                    <input
                                        className="form-control"
                                        id="released"
                                        type="text"
                                        defaultValue={this.state.movieReleased}
                                        name="released"
                                        ref="released"/><br/></td>
                                <td>
                                    <input
                                        className="form-control"
                                        id="url"
                                        type="text"
                                        defaultValue={this.state.movieUrl}
                                        name="url"
                                        ref="url"/><br/></td>
                            </tr>

                        </tbody>

                    </table>

                    <div className="align-right">
                        <button className="btn btn-primary" type="submit" onClick={ModalManager.close}>Submit</button>
                    </div>

                </form>

            </Modal>
        );
    }
}

export default EditModal