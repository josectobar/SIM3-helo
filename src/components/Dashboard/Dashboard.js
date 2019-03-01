import React, { Component } from 'react';

class Dashboard extends Component {
    constructor(){
        super()
        this.state = {
            search: '',
            posts: [],
            userPosts: true
        }
    }
    render() {
        return (
            <div>
                <input type="text"/>
                <button>Search</button>
                <button>Reset</button>
                <input type="checkbox"/>
            </div>
        );
    }
}

export default Dashboard;