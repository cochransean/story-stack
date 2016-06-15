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
            dispatch(actions.addCard(card, location));
        },
        wipeBoard: () => {
            dispatch(actions.wipeBoard());
        },
        wipeComplete: ()=> {
            dispatch(actions.wipeComplete());
        }
    }
};

const StackContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Stack);

export default StackContainer