// src/controllers/metricsController.js
const Campaign = require('../models/Campaign');

exports.getMetrics = async (req, res) => {
  const { id } = req.params;
  try {
    const campaign = await Campaign.findOne({ _id: id, user: req.user.id });
    if (!campaign) return res.status(404).json({ error: 'Campaign not found' });
    res.json({ metrics: campaign.metrics });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
