/**
 * Created by cochransean on 6/9/16.
 */
import React, {Component, PropTypes} from 'react';
import { ItemTypes } from '../constants';
import { DragSource } from 'react-dnd';

const cardSource = {
    beginDrag(props) {
        return {};
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class Card extends Component {

    render() {
        const { connectDragSource, isDragging } = this.props;

        return connectDragSource(
            <div className="plot-point card card-block" style={{
                opacity: isDragging ? 0.5 : 1
            }}>
                <div>
                    <p className="card-heading">Plot Point</p>
                    <p className="card-text">{this.props.card.point_text}</p>
                </div>
                <div>
                    <button className="delete-card-btn btn btn-centered btn-primary"><i className="fa fa-bomb" aria-hidden="true"></i></button>
                </div>
            </div>
        );
    }
}

Card.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.CARD, cardSource, collect)(Card);