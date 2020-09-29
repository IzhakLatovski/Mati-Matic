import React, {Fragment, useState} from 'react'
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from 'prop-types';

import {setAlert} from "../../actions/alert";
import {register} from "../../actions/auth";


const Register = (props) => {
    // Hook for form data
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        password2: ""
    });

    // Deconstruct
    const {username, password, password2} = formData;

    // On change
    const onChange = e =>
        setFormData({...formData, [e.target.name]: e.target.value});

    // On form submit
    const onSubmit = e => {
        e.preventDefault();
        if(password !== password2) {
            props.setAlert("Passwords don't match.", "danger");
        } else {
            props.register({username, password});
        }
    };

    // Redirect if authenticated
    if(props.isAuthenticated) {
        return <Redirect to="/game" />
    }    

    // HTML
    return (
        <Fragment>
            <div className="register">
                <h1>Sign Up</h1>

                <form onSubmit={e => onSubmit(e)}>
                    <input type="text" name="username" value={username} onChange={e => onChange(e)} placeholder="Userame"></input>
                    <input type="password" name="password" value={password} onChange={e => onChange(e)} placeholder="Password"></input>
                    <input type="password" name="password2" value={password2} onChange={e => onChange(e)} placeholder="Confirm password"></input>

                    <input id="submit-button" type="submit" value="Sign Up"></input>
                </form>

                <p>Already have an account? <Link to="/login" className="aa">Sign in</Link></p>
            </div>
        </Fragment>
    );
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {setAlert, register})(Register);