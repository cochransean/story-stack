import {connect} from 'react-redux'
import DropZone from '../components/dropzone.jsx';
import * as actions from '../actions/index';


const mapStateToProps = (state, ownProps) => {
    return {
        dropContents: state.board[ownProps.location[0]][ownProps.location[1]],
        globalGameInfo: state.globalGameInfo
    }
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
        },
        cardLeave: (location) => {
            dispatch(actions.cardLeave(location))
        }
    }
};

const DropContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DropZone);

export default DropContainer