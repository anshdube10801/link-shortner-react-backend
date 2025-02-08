import { shortUrl , handleRedirect } from '../controllers/urlController.js';
import express from 'express';
const router = express.Router();

// Route to shorten URL
router.post('/shorten', shortUrl);
router.get('/:shortUrl', handleRedirect);

export default router;
