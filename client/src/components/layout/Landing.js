import React, {Fragment} from 'react'
import {Link} from "react-router-dom";

const Landing = () => {
    return (
        <Fragment>
            <div className="landing">
                <h1>MATE - MATIC</h1>
                <Link to="/login"><button>LOGIN</button></Link>
                <Link to="/register"><button>REGISTER</button></Link>
            </div>
        </Fragment>
    )
}

export default Landing;