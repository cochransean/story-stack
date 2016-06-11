/**
 * Manages state and movements of cards
 */
import {connect} from 'react-redux'
import Stack from '../components/stack.jsx';


const mapStateToProps = (state) => {
    return state
};

const StackContainer = connect(mapStateToProps)(Stack);

export default StackContainer