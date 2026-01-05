const crypto = require("node:crypto");

const utils = {
    createShortUrl() {
        try {
            const alphabet =
                'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
            let code = '';
            for (let i = 0; i < 8; i++) {
                const idx = crypto.randomInt(0, alphabet.length);
                code += alphabet[idx];
            }
            return code;
        } catch (err) {
            return null;
        }
    }
}
module.exports = utils;