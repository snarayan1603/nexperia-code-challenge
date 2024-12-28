// src/controllers/aiController.js
const { generateEmailSuggestions } = require('../utils/aiService');

exports.getSuggestions = async (req, res) => {
  const { description } = req.body;
  if (!description) return res.status(400).json({ error: 'Description is required' });
  try {
    const suggestions = await generateEmailSuggestions(description);
    res.json({ suggestions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
