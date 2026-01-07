const ShortendUrlService = require('../services/ShortendUrlService');
const { error, success, notFound, badRequest } = require('../utils/httpresponse');
const ValidationService = require('../services/ValidationService');

class ShortendUrlController {

    /**
    * @swagger
    * /api/url/create:
    *   post:
    *     summary: Create a shortened URL
    *     description: Creates a new shortened URL for the authenticated user. Free users are limited by quota.
    *     tags:
    *       - Shortened URLs
    *     security:
    *       - bearerAuth: []
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             required:
    *               - original_url
    *             properties:
    *               original_url:
    *                 type: string
    *                 format: uri
    *                 example: https://example.com
    *     responses:
    *       201:
    *         description: Shortened URL created successfully
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 success:
    *                   type: boolean
    *                   example: true
    *                 status: 
    *                   type: string
    *                   example: success
    *                 message:
    *                   type: string
    *                   example: Shortened URL created successfully
    *                 data:
    *                   type: object
    *                   properties:
    *                     id:
    *                       type: string
    *                       example: 65ab1234cd890ef123456789
    *                     original_url:
    *                       type: string
    *                       example: https://example.com
    *                     short_url:
    *                       type: string
    *                       example: https://sho.rt/my-link
    *                     created_by:
    *                       type: string
    *                       example: 65ab1234cd890ef123456789
    *                     created_at:
    *                       type: string
    *                       format: date-time
    *                       example: 2025-01-10T10:00:00.000Z
    *       422:
    *         description: Free user limit reached
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 success:
    *                   type: boolean
    *                   example: false
    *                 status: 
    *                   type: string
    *                   example: error
    *                 message:
    *                   type: string
    *                   example: You have reached the limit for free users
    *       400:
    *         description: Validation error
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 success:
    *                   type: boolean
    *                   example: false
    *                 status:  
    *                   type: string
    *                   example: error
    *                 message:
    *                   type: string
    *                   example: Original URL is required
    *                 data: 
    *                  type: object
    *                  example: {}
    *       403:
    *         description: Unauthorized
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 success:
    *                   type: boolean
    *                   example: false
    *                 status:
    *                   type: string
    *                   example: error
    *                 message:
    *                   type: string
    *                   example: "Please login again"
    *                 data:
    *                   type: object
    *                   example: {}
    *       500:
    *         description: Internal server error
    */


    async createShortendUrl(req, res) {
        try {
            const data = req.body;
            if(!req.body){
                return badRequest(res, {}, "Original URL is required");
            }
            if(!req.body.original_url){
                return badRequest(res, {}, "Original URL is required");
            }
            if(await ValidationService.isAbleToCreateShortUrl(req.user.id) === false){
                return badRequest(res, {}, "You have reached the limit for free users", 422);
            }
            data.created_by = req.user.id;
            const result = await ShortendUrlService.createShortendUrl(data);
            console.log(result);
            return success(res, result, "Shortened URL created successfully");
        } catch (err) {
            return error(res, err);
        }
    }

    /**
    * @swagger
    * /api/url/stats:
    *   get:
    *     summary: Get shortened URL statistics
    *     description: Retrieve statistics of shortened URLs. If the user is authenticated, only URLs created by that user are returned.
    *     tags:
    *       - Shortened URLs
    *     security:
    *       - bearerAuth: []
    *     responses:
    *       200:
    *         description: Shortened URL stats retrieved successfully
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 success:
    *                   type: boolean
    *                   example: true
    *                 message:
    *                   type: string
    *                   example: Shortened URL stats retrieved successfully
    *                 data:
    *                   type: array
    *                   items:
    *                     type: object
    *                     properties:
    *                       id:
    *                         type: string
    *                         example: 64f1c2a9e4b0a1b2c3d4e5f6
    *                       original_url:
    *                         type: string
    *                         example: https://example.com
    *                       short_code:
    *                         type: string
    *                         example: ucXaBcie
    *                       short_url:
    *                         type: string
    *                         example: http://localhost:8080/ucXaBcie
    *                       clicks:
    *                         type: number
    *                         example: 42
    *                       created_by:
    *                         type: string
    *                         example: 64f1c2a9e4b0a1b2c3d4e5f6
    *                       created_at:
    *                         type: string
    *                         format: date-time
    *                         example: 2025-01-01T10:00:00.000Z
    *       404:
    *         description: No shortened URLs found
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 success:
    *                   type: boolean
    *                   example: false
    *                 message:
    *                   type: string
    *                   example: No shortened URLs found for this user
    *                 data:
    *                   type: array
    *                   example: []
    *       403:
    *         description: Unauthorized
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 success:
    *                   type: boolean
    *                   example: false
    *                 status:
    *                   type: string
    *                   example: error
    *                 message:
    *                   type: string
    *                   example: "Please login again"
    *                 data:
    *                   type: object
    *                   example: {}
    *       500:
    *         description: Internal server error
    */

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
            if(shortendUrl.length === 0){
                return notFound(res, [], "No shortened URLs found for this user");
            };
            return success(res, shortendUrl, "Shortened URL stats retrieved successfully");
        } catch (err) {
            return error(res, err);
        }
    }

    /**
    * @swagger
    * /api/url/delete/{id}:
    *   delete:
    *     summary: Delete a shortened URL
    *     description: Deletes a shortened URL by its ID. Returns an error if the URL does not exist or is already deleted.
    *     tags:
    *       - Shortened URLs
    *     security:
    *       - bearerAuth: []
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         description: id of the shortened URL to delete
    *         schema:
    *           type: string
    *           example: 695e935512ddf4e750f5dcce
    *     responses:
    *       200:
    *         description: Shortened URL deleted successfully
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 success:
    *                   type: boolean
    *                   example: true
    *                 status:
    *                  type: string
    *                  example: success   
    *                 message:
    *                   type: string
    *                   example: Shortened URL deleted successfully
    *                 data:
    *                   type: null
    *                   example: null
    *       404:
    *         description: Shortened URL not found or already deleted
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 success:
    *                   type: boolean
    *                   example: false
    *                 status:
    *                   type: string
    *                   example: error
    *                 message:
    *                   type: string
    *                   example: Shortened URL not found or already deleted
    *                 data:
    *                   type: object
    *                   example: {}
    *       403:
    *         description: Unauthorized
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 success:
    *                   type: boolean
    *                   example: false
    *                 status:
    *                   type: string
    *                   example: error
    *                 message:
    *                   type: string
    *                   example: "Please login again"
    *                 data:
    *                   type: object
    *                   example: {}
    *       500:
    *         description: Internal server error
    */

    async deleteShortendUrl(req, res) {
        try {
            const shortUrlId = req.params.id;
            const result = await ShortendUrlService.deleteShortendUrl({id: shortUrlId});
            if (result.deletedCount === 0) {
                return notFound(res, {}, "Shortened URL not found or already deleted");
            }
            return success(res, null, "Shortened URL deleted successfully");
        } catch (err) {
            return error(res, err);
        }
    }
}

module.exports = new ShortendUrlController();