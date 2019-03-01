import React, { Component } from 'react';
import axios from 'axios'

//redux:
import { connect } from 'react-redux'
import { updateUser } from '../../ducks/reducer'

class Auth extends Component {
    constructor(){
        super()
        this.state = {
            username:``,
            password: ``
        }
        this.handleInput = this.handleInput.bind(this)
    }

    handleRegister = async () =>  {
        try {
            let res = await axios.post('/auth/register', this.state)
            this.clearState()
            this.props.updateUser(res.data)
            this.props.history.push('/dashboard')
        } catch(err) {
            alert('unable to register')
        }
    }

    handleLogin = async () => {
        try {
            let res = await axios.post('/auth/login', this.state)
            this.clearState()
            this.props.updateUser(res.data)
            this.props.history.push('/dashboard')
        } catch (err) {
            console.log(err)
            alert('error during login')
        }
    }

    clearState = () => {
        this.setState({
            username:``,
            password: ``
        })
    }

    handleInput(event){
        const { name, value } = event.target
        this.setState({
            [name]:value
        })
    }

    render() {
        return (
            <div>
                <input 
                    name="username"
                    onChange={this.handleInput} 
                    type="text"/>
                <input 
                    name="password"
                    onChange={this.handleInput} 
                    type="password"/>
                <button onClick={this.handleLogin}>
                    Login
                </button>

                <button 
                    onClick={this.handleRegister}>
                    Register
                </button>
                
            </div>
        );
    }
}

const mapDispatchToProps =  {
    updateUser
}

export default connect(null, mapDispatchToProps)(Auth);