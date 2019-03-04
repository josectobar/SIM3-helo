import React, { Component } from 'react';
import Axios from 'axios';

class Form extends Component {
    constructor(){
        super()
        this.state = {
            title: ``,
            img: `https://www.grouphealth.ca/wp-content/uploads/2018/05/placeholder-image-300x225.png`,
            content: ``
        }
    }

    handleInput = (e) => {
        const { name, value } = e.target
        this.setState({
            [name] : value
        })
    }

    sendNewPost = async () => {
        await Axios.post(`/api/post/`, this.state)
        this.props.history.push('/dashboard')
    }

    render() {
        return (
            <div>
                <input 
                    name="title" 
                    type="text" 
                    placeholder="title"
                    onChange={this.handleInput}/>
                <input 
                    name="img" 
                    type="text"
                    placeholder="image URL"
                    onChange={this.handleInput}/>
                <img src={this.state.img} alt={this.state.title}/>
                <textarea 
                    name="content" 
                    onChange={this.handleInput}/>
                <button onClick={this.sendNewPost}>
                    Post
                </button>
            </div>
        );
    }
}


export default Form;