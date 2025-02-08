import URLData from '../model/userlink.js';

const createUrl = async (urlLink) => {
const DOMAIN = process.env.VITE_BASE_URL;
    try {
      let originalUrl = urlLink?.originalUrl;

        const genRandomNum = Math.floor(1000 + Math.random() * 9000);
        const shortUrl = `${DOMAIN}/${genRandomNum}`

        if (!/^https?:\/\//i.test(originalUrl)) {
          originalUrl = `http://${originalUrl}`; // Add http:// if not included
        }

      // Create a new product instance with all data
      const newURL = new URLData({
        original_Url:originalUrl, 
        short_Url: genRandomNum,
      });
  
      const savedUrl = await newURL.save();

      const response = {
        _id: savedUrl._id,
        original_Url: savedUrl.original_Url,
        shortcode: genRandomNum, 
      };
      return response;

    } catch (error) {
      console.error('Error saving product to DB:', error);
      throw new Error('Product save failed');
    }
  };

  const getOriginalUrlByShortUrl = async (shortUrl) => {
    try {
      // Look up the URL record by short URL code
      const urlRecord = await URLData.findOne({ short_Url: shortUrl });
  
      if (!urlRecord) {
        return null;  // If the short URL does not exist, return null
      }
  
      return urlRecord.original_Url;  // Return the original URL
    } catch (error) {
      console.error('Error fetching URL from database:', error);
      throw new Error('Database error');
    }
  };
  

  export default {createUrl , getOriginalUrlByShortUrl}