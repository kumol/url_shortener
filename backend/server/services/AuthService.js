const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { forbidden } = require('../utils/httpresponse');
class AuthService {
    constructor(){

    }

    checkAuth(req, res, next){
        try {
            let bearer = req.headers.authorization;
            let token = bearer?.split(" ")[1];
            if (!token) {
                return forbidden(res, {}, "Please login again");
            }
            var decoded = jwt.verify(token, process.env.SECRET);
            req.user = decoded.data;
            next();
        } catch (err) {
            if (err.message == "jwt expired") {
                return forbidden(res, err.stack, "Your jwt is expired");
            }
            return forbidden(res, err.stack, "Please login again");
        }
    }
    
    hashPassword(password) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    }

    passwordCompare (password, hash){
        return bcrypt.compareSync(password, hash);;
    }

    generateToken(payload){
        return jwt.sign({ data: payload }, process.env.SECRET);
    }
}

module.exports = new AuthService();