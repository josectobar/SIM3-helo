import React, { Fragment, Component } from 'react'
import './Nav.css'
import {withRouter, Link} from 'react-router-dom'

//redux
import { connect } from 'react-redux'
import { updateUser } from '../../ducks/reducer'

import Axios from 'axios';



 class Nav extends Component {

    componentDidMount(){
        this.checkUser()
    }
    
    checkUser = async () => {
        const  { username } = this.props
        if (!username) {
            try {
                let user = await Axios.get('/auth/me')
                this.props.updateUser(user.data[0])
                this.props.history.push('/dashboard')
            } catch(err) {
            }    
            } else {
                this.props.history.push('/dashboard')
            }
    }

    logout = async () => {
        await Axios.post('/auth/logout')
    }
    render() {
        const { username, profile_pic } = this.props
        return (
            <nav>
                {this.props.location.pathname !== "/" && 
                    <Fragment>
                        <h1>Hello {username}!</h1>
                        <img src={profile_pic} alt={username}/>
                        <Link to='/dashboard'>Home</Link>
                        <Link to='/new'>New</Link>
                        <Link onClick ={this.logout} to='/'>Logout</Link>
                    </Fragment>
                }
            </nav>
        )
    }
}

const mapStateToProps = (reduxState) =>  {
    const { username, profile_pic } = reduxState
    return {
        username,
        profile_pic
    }
}

export default withRouter(connect(mapStateToProps, { updateUser })(Nav))