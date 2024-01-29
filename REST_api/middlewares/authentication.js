const { verifyToken } = require("../helpers/jwt")
const { User } = require("../models/index")



module.exports = async function authentication(req, res, next) {

    try {
        const { authorization } = req.headers
        // console.log({ authorization })
        if (!authorization) {
            throw { name: "InvalidToken" }
        }
        const rawToken = authorization.split(' ')
        if (rawToken[0] !== 'Bearer') {
            throw { name: "InvalidToken" }
        }

        const result = verifyToken(rawToken[1])
        // console.log(result)
        const user = await User.findByPk(result.id)
        if (!user) {
            throw { name: "InvalidToken" }
        }
        req.user = user
        console.log(req.user);
        next()
    } catch (error) {
        next(error)
    }
}