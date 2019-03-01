import React, { Fragment } from 'react'
import './Nav.css'
import {withRouter, Link} from 'react-router-dom'

//redux
import { connect } from 'react-redux'

 function Nav(props) {
    return (
        <nav>
            {props.location.pathname !== "/" && 
                <Fragment>
                    <h1>Hello {props.username}!</h1>
                    <img src={props.profile_pic} alt={props.username}/>
                    <Link to='/dashboard'>Home</Link>
                    <Link to='/new'>New</Link>
                    <Link to='/'>Logout</Link>
                </Fragment>
            }
        </nav>
    )
}

const mapStateToProps = (reduxState) =>  {
    const { username, profile_pic } = reduxState
    return {
        username,
        profile_pic
    }
}

export default withRouter(connect(mapStateToProps)(Nav))