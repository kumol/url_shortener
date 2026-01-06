const ShortendUrl = require('../models/ShortendUrl');
const utils = require('../utils/utils');

class ShortendUrlService {
    async createShortendUrl(data) {
        let short_code = utils.createShortUrl();
        let isAvailable = await this.getShortendUrlByCode(short_code);
        while (isAvailable != null) {
            short_code = utils.createShortUrl();
            isAvailable = await this.getShortendUrlByCode(short_code);
        }
        data.short_code = short_code;
        data.shortend_url = `${process.env.BASE_URL || 'http://localhost:8080'}/${short_code}`;
        const shortendUrl = new ShortendUrl(data);
        return await shortendUrl.save();
    }

    async getShortendUrlByCode(shortCode) {
        return await ShortendUrl.findOne({ short_code: shortCode }).lean();
    }

    async incrementClickCount(shortCode) {
        return await ShortendUrl.findOneAndUpdate(
            { short_code: shortCode },
            { $inc: { clicks: 1 } },
            { new: true }
        );
    }

    async getShortendUrls(query, options){
        return await ShortendUrl.find(query).sort({_id: -1}).lean();
    }

    async countShortUrlsByUser(query){
        return await ShortendUrl.countDocuments(query);
    }

    async deleteShortendUrl(query) {
        return await ShortendUrl.deleteOne(query);
    }
};

module.exports = new ShortendUrlService();