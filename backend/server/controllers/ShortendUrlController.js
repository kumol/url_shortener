const ShortendUrlService = require('../services/ShortendUrlService');
const { error, success } = require('../utils/httpresponse');
const ValidationService = require('../services/ValidationService');

class ShortendUrlController {
    async createShortendUrl(req, res) {
        try {
            const data = req.body;
            if(await ValidationService.isAbleToCreateShortUrl(req.user.id) === false){
                return error(res, "You have reached the limit for free users");
            }
            data.created_by = req.user.id;
            const result = await ShortendUrlService.createShortendUrl(data);
            return success(res, result, "Shortened URL created successfully");
        } catch (err) {
            return error(res, err);
        }
    }

    async getShortendUrlStats(req, res) {
        try {
            let user_id = req.user ? req.user.id : null;
            let query = {};
            if(user_id){
                query.created_by = user_id;
            }
            const shortendUrl = await ShortendUrlService.getShortendUrls(query);
            if (!shortendUrl) {
                return error(res, "Shortened URL not found");
            }
            return success(res, shortendUrl, "Shortened URL stats retrieved successfully");
        } catch (err) {
            return error(res, err);
        }
    }

    async deleteShortendUrl(req, res) {
        try {
            const shortUrlId = req.params.id;
            const result = await ShortendUrlService.deleteShortendUrlById({id: shortUrlId});
            if (result.deletedCount === 0) {
                return error(res, "Shortened URL not found or already deleted");
            }
            return success(res, null, "Shortened URL deleted successfully");
        } catch (err) {
            return error(res, err);
        }
    }
}

module.exports = new ShortendUrlController();