const { success, error, unauthorized, conflict, badRequest} = require("../utils/httpresponse");
const AuthService = require("../services/AuthService");
const UserService = require("../services/UserService");
class UserController {
    /**
    * @swagger
    * /api/user/register:
    *   post:
    *     summary: Create a new user
    *     description: Register a new user with subscription information.
    *     tags:
    *       - Users
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             required:
    *               - name
    *               - email
    *               - password
    *               - subscribtion
    *             properties:
    *               name:
    *                 type: string
    *                 example: kumol
    *               email:
    *                 type: string
    *                 format: email
    *                 example: kumol@yotech.ltd
    *               password:
    *                 type: string
    *                 format: password
    *                 example: password
    *               subscribtion:
    *                 type: object
    *                 required:
    *                   - subscribtion_type
    *                 properties:
    *                   subscribtion_type:
    *                     type: string
    *                     enum: [free, pro, premium]
    *                     example: free
    *                   until:
    *                     type: string
    *                     format: date-time
    *                     nullable: true
    *                     example: null
    *     responses:
    *       200:
    *         description: User created successfully
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
    *                   example: User created successfully
    *                 data:
    *                   type: object
    *                   properties:
    *                     id:
    *                       type: string
    *                       example: 65abc1234ef567890abcd123
    *                     name:
    *                       type: string
    *                       example: kumol
    *                     email:
    *                       type: string
    *                       example: kumol@yotech.ltd
    *                     subscribtion:
    *                       type: object
    *                       properties:
    *                         subscribtion_type:
    *                           type: string
    *                           example: free
    *                         until:
    *                           type: string
    *                           nullable: true
    *                           example: null
    *                     created_at:
    *                       type: string
    *                       format: date-time
    *                       example: 2026-01-10T12:00:00.000Z
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
    *                 message:
    *                   type: string
    *                   example: Name, email, password and subscription are required
    *                 data:
    *                   type: object
    *                   example: {}
    *       409:
    *         description: User already exists
    *       500:
    *         description: Internal server error
    */


    async createUser(req, res) {
        try {
            const userData = req.body;
            if(!userData.name || !userData.email || !userData.password){
                return badRequest(res, null, "Name, email, password and subscription are required");
            }
            let alreadyUser = await UserService.findUser({email: userData.email});
            if(alreadyUser){
                return conflict(res, null, "User already exists with this email");
            }
            userData.password = AuthService.hashPassword(userData.password);
            const newUser = await UserService.registerUser(userData);
            return success(res, newUser, "User created successfully");
        } catch (err) {
            return error(res, err);
        }
    }

    /**
    * @swagger
    * /api/user/login:
    *   post:
    *     summary: User login
    *     description: Authenticate user using email and password and return a JWT access token.
    *     tags:
    *       - Authentication
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             required:
    *               - email
    *               - password
    *             properties:
    *               email:
    *                 type: string
    *                 format: email
    *                 example: kumol@yotech.ltd
    *               password:
    *                 type: string
    *                 format: password
    *                 example: password
    *     responses:
    *       200:
    *         description: Login successful
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
    *                   example: Login successful
    *                 data:
    *                   type: object
    *                   properties:
    *                     token:
    *                       type: string
    *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    *       401:
    *         description: Invalid email or password
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
    *                   example: Invalid email or password
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
    *                 message:
    *                   type: string
    *                   example: Email and password are required
    *                 data:
    *                   type: object
    *                   example: {}
    *       500:
    *         description: Internal server error
    */


    async logInUser(req, res) {
        try {
            const { email, password } = req.body;
            if(!email || !password){
                return badRequest(res, null, "Email and password are required");
            }
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
}
module.exports = new UserController();