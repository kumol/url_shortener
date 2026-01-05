const { success, error, unauthorized } = require("../utils/httpresponse");
const AuthService = require("../services/AuthService");
const UserService = require("../services/UserService");
class UserController {
    async createUser(req, res) {
        try {
            const userData = req.body;
            userData.password = AuthService.hashPassword(userData.password);
            const newUser = await UserService.registerUser(userData);
            return success(res, newUser, "User created successfully");
        } catch (err) {
            return error(res, err);
        }
    }

    async logInUser(req, res) {
        try {
            const { email, password } = req.body;
            const user = await UserService.findUser({email});
            if (!user || !AuthService.passwordCompare(password, user.password)) {
                return unauthorized(res, null, "Invalid email or password");
            }
            let token = AuthService.generateToken({name: user.name, email: user.email, id: user.id, subscription: user.subscription});
            return success(res, { token }, "Login successful");
        } catch (err) {
            return error(res, err);
        }
    }
    // User controller methods would go here
}
module.exports = new UserController();