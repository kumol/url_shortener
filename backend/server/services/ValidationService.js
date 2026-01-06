const UserService = require('./UserService');
const ShortendUrlService = require('./ShortendUrlService');
class ValidationService {
    async isAbleToCreateShortUrl(userId) {
        let user = await UserService.findUser({id: userId});
        if (user.subscription.subscription_type === 'free') {
            const freeUsersCount = await ShortendUrlService.countShortUrlsByUser({created_by: userId});
            if (freeUsersCount >= process.env.FREE_USER_URL_LIMIT) {
                return false;
            } else {
                return true;
            }
        }
        return true;
    }
}

module.exports = new ValidationService();