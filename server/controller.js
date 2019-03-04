const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        try {
            const db = req.app.get('db')
            const { username, password } = req.body
            const { session } = req
            const profile_pic = () => {
                const randomNum = Math.floor(Math.random()*1000)+1
                return `https://robohash.org/${randomNum}`
            }

            let checkDuplicates = await db.check_user({username})
            
            checkDuplicates = checkDuplicates[0]
            
            if (checkDuplicates) {
                return res.status(409).send('username already exist')
            }
            
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)
            
            let user = await db.register({username, password:hash, profile_pic})
            user = user[0]
    
            session.user = user
            res.status(200).send(session.user)
        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    },
    login: async (req, res) => {
        try {
            const db = req.app.get('db')
            const { username, password } = req.body
            const { session } = req
            
            let verifyUser = await db.login({username})
            verifyUser = verifyUser[0]
            
            if (!verifyUser) {
                return res.sendStatus(401)
            }
            
            const authenticate = bcrypt.compareSync(password, verifyUser.password)
            
            if (authenticate) {
                 delete verifyUser.password
                session.user = verifyUser
                res.status(200).send(session.user)
            } else {
                res.status(401).send('problem with password')
            }
            
        } catch (err) {
            console.log(err)
            res.status(500).send(`there was an error login you in: ${err}`)
        }
    },
    getPosts: async ( req, res ) => {
        try{
            const db = req.app.get('db')
            let { search, userPosts } = req.query
            const { id } = req.session.user
            userPosts = JSON.parse(userPosts)
            if (search && userPosts ) {
                const postQuery = await db.queries.get_posts_search_true(search, id)
                res.status(200).send(postQuery)
            } else if (search && !userPosts ) {
                const postQuery = await db.queries.get_posts_search_false(search, id)
                res.status(200).send(postQuery)
            } else if (!search && userPosts) {
                const postQuery = await db.queries.get_posts()
                res.status(200).send(postQuery)
            } else {
                const postQuery = await db.queries.get_posts_false(id)
                res.status(200).send(postQuery)
            }
        } catch (err) {
            console.log(err)
            res.sendStatus(401)
        }
    },
    getPost: async (req, res) => {
        const db = req.app.get('db')
        const { postid } = req.params
        const post = await db.queries.get_post(postid)
        res.status(200).send(post)
    },
    newPost: async (req, res) => {
        try {
            const db = req.app.get('db')
            const { title, img, content } = req.body
            const { id } = req.session.user
            let newPost = await db.new_post({title, img, content, author_id: id})
            res.status(200).send(newPost)
        } catch (err) {
            res.sendStatus(500)
        }
    },

    me: async (req, res) => {
        const db = req.app.get('db')
        if (req.session.user) {
            const { id } = req.session.user
            let user = await db.user_info({id})
            return res.status(200).send(user)
        } else {
            res.sendStatus(401)
        }
    },
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    }
}