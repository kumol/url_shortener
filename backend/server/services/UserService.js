const User = require('../models/User');
class UserService {
    async registerUser(userData) {
        const user = new User(userData);
        return await user.save();
    }

    async findUser(query) {
        return await User.findOne(query);
    }

    async deleteUserById(userId) {
        return await User.deleteOne({id: userId})
    }
}

module.exports = new UserService();