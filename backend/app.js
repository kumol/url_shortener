const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

require('./server/models/db');

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const apiRoutes = require('./server/api/index');
const ShortendUrlService = require('./server/services/ShortendUrlService');
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use('/api', apiRoutes);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns a simple message indicating that the URL Shortener Backend is running.
 *     tags:
 *       - Health Check
 *     responses:
 *       200:
 *         description: URL Shortener Backend is running
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: URL Shortener Backend is running  
 */

app.get('/', (req, res) => {
  res.send('URL Shortener Backend is running');
});
app.get('/:id', async (req, res) => {
    let urls = await ShortendUrlService.getShortendUrlByCode(req.params.id);
    if(urls){
        await ShortendUrlService.incrementClickCount(req.params.id);
        res.redirect(urls.original_url);
    }
  //res.send(`Redirecting for short URL id: ${req.params.id}`);
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});