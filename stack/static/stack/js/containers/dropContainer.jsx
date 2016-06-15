import {connect} from 'react-redux'
import DropZone from '../components/dropzone.jsx';
import * as actions from '../actions/index';


const mapStateToProps = (state, ownProps) => {
    return {
        dropContents: state.board[ownProps.location[0]][ownProps.location[1]].contents,
        globalGameInfo: state.globalGameInfo,
        counter: state.counter
    }
};

// put callbacks that need to be injected into components here
const mapDispatchToProps = (dispatch) => {
    return {
        addCard: (card, location) => {
            dispatch(actions.addCard(card, location))
        },
        deleteCard: (card, location, counter) => {

            // stop here since there are no more deletes left
            if (counter <= 0) {
                return
            }
            dispatch(actions.deleteCard(card, location));
        },
        deleteCardComplete: () => {
            dispatch(actions.deleteCardComplete());
        },
        moveCard: (card, oldLocation, newLocation) => {
            dispatch(actions.moveCard(card, oldLocation, newLocation))
        },
        startAnimation: (location) => {
            dispatch(actions.startAnimation(location));
        },
        finishAnimation: (location) => {
            dispatch(actions.finishAnimation(location));
        }
    }
};

const DropContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DropZone);

export default DropContainer