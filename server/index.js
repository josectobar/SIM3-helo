require('dotenv').config()

//backend dependencies:
const express = require('express')
const { json } = require('body-parser')
const massive = require('massive')
const app = express()
const sessions = require('express-session')
const ctrl = require('./controller')
const { SERVER_PORT, DB_CONNECTION, SESSION_SECRET } = process.env

//middleware:
app.use(json())
app.use(sessions({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*60*60
    }
}))
massive(DB_CONNECTION)
    .then(db => {
        app.set('db', db)
        //port connection:
        app.listen(SERVER_PORT, console.log(`live from ${SERVER_PORT}`))
        
})

app.post('/auth/register', ctrl.register)
app.post('/auth/login', ctrl.login)
app.get('/api/posts/', ctrl.getPosts)
app.get('/api/post/:postid', ctrl.getPost)
app.get('/auth/current', ctrl.me)
app.get('/auth/me', ctrl.me)
app.post('/api/post/', ctrl.newPost)
app.post('/auth/logout', ctrl.logout)