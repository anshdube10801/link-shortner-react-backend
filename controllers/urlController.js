import linkDbService from '../linkDbService/linkDbService.js';

const shortUrl = async (req, res) => {
  const { originalUrl } = req?.body;
  try {
    if (!originalUrl) {
      return res.status(401).json({ message: 'Please enter a URL' });
    }

    const shortLink = await linkDbService.createUrl({ originalUrl });
    res.status(201).json({ message: 'Short URL created successfully', link: shortLink });
  } catch (error) {
    console.error('Error creating URL:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const handleRedirect = async (req, res) => {
  const { shortUrl } = req.params;  // Extract the short URL code from the URL

  try {
    // Call service to get the original URL by the short URL code
    const originalUrl = await linkDbService.getOriginalUrlByShortUrl(shortUrl);

    if (!originalUrl) {
      return res.status(404).json({ message: 'Short URL not found' });
    }

    // Redirect to the original URL
    return res.redirect(originalUrl);
  } catch (error) {
    console.error('Error during redirection:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { shortUrl, handleRedirect };
