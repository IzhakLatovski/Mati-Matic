import React, {Fragment} from 'react'
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {logout} from "../../actions/auth";


const Game = ({auth: {isAuthenticated, loading}, logout}) => {
    return (
        <Fragment>
            <div className="game">
                <h1>this is the game page</h1>
                <button onClick={logout}>Logout</button>
            </div>
        </Fragment>
    )
}

Game.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logout})(Game);