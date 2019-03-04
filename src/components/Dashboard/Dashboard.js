import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';

class Dashboard extends Component {
    constructor(){
        super()
        this.state = {
            search: '',
            posts: [],
            userPosts: true
        }
        this.getPosts = this.getPosts.bind(this)
    }

    componentDidMount(){
        this.getPosts()
    }

    handleReset = async () => {
       await this.setState({
            search: ``
        })
        this.getPosts()
    }

    async getPosts(){
        try {
            const { search, userPosts } = this.state
            if (search !== '') {
                const searchQuery = await axios.get(`/api/posts/?search=%${search}%&userPosts=${userPosts}`)
                this.setState({
                    posts:searchQuery.data
                })
            } else {
                this.checkUserPosts()
            }
        } catch (err) {
            console.log(err)
            alert('error searching posts')
        }
    }   
    
    checkUserPosts= async ()=>{
        try {
            const searchQuery = await axios.get(`/api/posts/?userPosts=${this.state.userPosts}`)
            this.setState({
                posts:searchQuery.data
            })
        } catch (err) {
            console.log(err)
            alert('error getting user posts')
        }
    }

    handleInput = (e) => {
        const {name, value } = e.target
        this.setState({
            [name]:value
        })
    }

    toggleCheckbox = (e) => {
        this.setState({
            userPosts: e.target.checked
        })
    }

    openPost=(post_id)=>{
        this.props.history.push(`/post/${post_id}`)
    }

    render() {
        const displayPosts = this.state.posts.map(post => {
            return (
                <div key={post.post_id} onClick={()=>this.openPost(post.post_id)}>
                    <h3>{post.title}</h3>
                    <h4>by {post.username}</h4>
                    <img src={post.profile_pic} alt={post.username}/>
                </div>
        )
        })
        return (
            <div>
                <input 
                name="search"
                onChange={this.handleInput}
                value={this.state.search}
                type="text"/>
                <button onClick={this.getPosts}>
                    Search
                </button>
                <button onClick={this.handleReset}>
                    Reset
                </button>
                <input 
                name="userPosts"
                onChange={this.toggleCheckbox}
                checked={this.state.userPosts}
                type="checkbox"/>
                <div className="posts-container">{displayPosts}</div>
            </div>
        );
    }
}

const mapStateToProps = (reduxState) => {
    return {
        id: reduxState.id
    }
}

export default connect(mapStateToProps)(Dashboard);