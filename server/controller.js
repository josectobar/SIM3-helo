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
        const db = req.app.get('db')
        const { search, userPosts } = req.query
        const { id } = req.params
        console.log(res.query)
        const postQuery = await db.run("select * from posts")
        res.status(200).send(postQuery)
        // if (search !== '' && userPosts ) {

        // }
    }
}