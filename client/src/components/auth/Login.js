import React, {Fragment, useState} from 'react'
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from 'prop-types';

import {login} from "../../actions/auth";


const Login = (props) => {
    // Hook for form data
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    // Destruct
    const {username, password} = formData;

    // On change
    const onChange = e =>
        setFormData({...formData, [e.target.name]: e.target.value});

    // On form submit
    const onSubmit = e => {
        e.preventDefault();

        props.login(username, password);
    };

    // Redirect if logged in
    if(props.isAuthenticated) {
        return <Redirect to="/game" />
    }

    // HTML
    return (
        <Fragment>
            <div className="register">
                <h1>Sign In</h1>

                <form onSubmit={e => onSubmit(e)}>
                    <input type="text" name="username" value={username} onChange={e => onChange(e)} placeholder="Userame"></input>
                    <input type="password" name="password" value={password} onChange={e => onChange(e)} placeholder="Password"></input>

                    <input id="submit-button" type="submit" value="Sign In"></input>
                </form>

                <p>Don't have an account? <Link to="/register" className="aa">Sign up</Link></p>
            </div>
        </Fragment>
    );
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login);