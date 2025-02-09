import URLData from '../model/userlink.js';
import { nanoid } from 'nanoid';

const createUrl = async (urlLink) => {
  try {
    let originalUrl = urlLink?.originalUrl;

    if (!/^https?:\/\//i.test(originalUrl)) {
      originalUrl = `http://${originalUrl}`; // Add http:// if not included
    }

    // Check if the original URL already exists in the database
    const existingUrl = await URLData.findOne({ original_Url: originalUrl });

    if (existingUrl) {
      // Return existing record if found
      return {
        _id: existingUrl._id,
        original_Url: existingUrl.original_Url,
        shortcode: existingUrl.short_Url,
      };
    }

    // Generate new shortcode
    const genRandomNum = nanoid(7);

    // Create a new URL instance and save
    const newURL = new URLData({
      original_Url: originalUrl,
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