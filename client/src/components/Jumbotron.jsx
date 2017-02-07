import React, {Component} from 'react';

class Jumbotron extends Component {
    
    render() {
        return (

            <div className="jumbotron">
                <div className="row">
                    <div className="col-sm-4 col-md-4">
                        
                       
                    </div>
                     <div className="col-sm-8 col-md-8">
                        <h1> Your own movie database </h1> <br/>
                        <p> ...to Add, Edit or Delete movies you must log in with Google </p>
                    </div>

                </div>
            </div>
        );
    }
}

export default Jumbotron;
