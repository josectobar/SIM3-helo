import React, { Component } from 'react';
import Axios from 'axios';

class Post extends Component {
    constructor(){
        super()
        this.state = {
            title: ``,
            img: ``,
            content: ``,
            username: ``,
            profile_pic: ``
        }
    }

    componentDidMount(){
        this.getPost()
    }

    getPost = async () => {
        try {
            const post = await Axios.get(`/api/post/${this.props.match.params.postid}`)
            console.log(post)
            const { title, img, content, username, profile_pic } = post.data[0]
            this.setState({
                title,
                img,
                content,
                username,
                profile_pic
            })
        } catch(err) {

        }
    }

    render() {
        const { title, img, content, username, profile_pic } = this.state
        return (
            <div>
                <h2>{title}</h2>
                <img src={img} alt={title}/>
                <span>{content}</span>
                <h3>by {username}</h3>
                <img src={profile_pic} alt={username} />
            </div>
        );
    }
}

export default Post;