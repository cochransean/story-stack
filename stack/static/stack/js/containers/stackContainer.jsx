/**
 * Manages state and movements of cards
 */
import {connect} from 'react-redux'
import Stack from '../components/stack.jsx';
import * as actions from '../actions/index';


const mapStateToProps = (state) => {
    return state
};

// put callbacks that need to be injected into components here
const mapDispatchToProps = (dispatch) => {
    return {
        addCard: (card, location) => {
            dispatch(actions.addCard(card, location))
        },
        deleteCardClick: (card, location) => {
            dispatch(actions.deleteCard(card, location))
        },
        cardEnter: (location) => {
            dispatch(actions.cardEnter(location))
        }
    }
};

const StackContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Stack);

export default StackContainer