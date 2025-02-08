import mongoose from 'mongoose';

// Create a schema for the product
const linkSchema = new mongoose.Schema({
  
  original_Url: {
    type: String,
    required: true,
  },
  short_Url: {
    type: String,
    required: true,
  },
 
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Create the model
const Link = mongoose.model('linkSchema', linkSchema);

export default Link;
