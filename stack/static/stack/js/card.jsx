/**
 * Created by cochransean on 6/9/16.
 */
import React from 'react';

const Card = () => {

    return (
        <div className="plot-point card card-block">
            <div>
                <p className="card-heading">Plot Point</p>
                <p className="card-text">This is an example of some text that could appear here.</p>
            </div>
            <div>
                <button className="delete-card-btn btn btn-centered btn-primary"><i className="fa fa-bomb" aria-hidden="true"></i></button>
            </div>
        </div>
    );
};

export default Card;