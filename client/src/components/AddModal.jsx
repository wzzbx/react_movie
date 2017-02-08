import React, {Component, PropTypes} from 'react'
import {Modal, ModalManager, Effect} from 'react-dynamic-modal'
import axios from 'axios'
import qs from 'querystring'
import Auth from '../auth/Auth.js'

class AddModal extends Component {
    constructor(props) {
        super(props);

    }

    onSubmit(event) {
        event.preventDefault()

        axios
            .post('https://localhost:3000/api/user/' + this.props.email + '/createmovie', qs.stringify({title: this.refs.title.value, released: this.refs.released.value, url: this.refs.url.value}))
            .then(function (response) {
                console.log(response);
            })
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
                        Add movie to Your collection
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
                                        name="title"
                                        ref="title"/><br/>
                                </td>
                                <td>
                                    <input
                                        className="form-control"
                                        id="released"
                                        type="text"
                                        name="released"
                                        ref="released"/><br/></td>
                                <td>
                                    <input className="form-control" id="url" type="text" name="url" ref="url"/><br/></td>
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

export default AddModal;