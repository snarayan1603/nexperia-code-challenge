// src/controllers/templateController.js
const Template = require('../models/Template');

exports.createTemplate = async (req, res) => {
  const { name, subject, body } = req.body;
  try {
    const template = new Template({ user: req.user.id, name, subject, body });
    await template.save();
    res.status(201).json({ message: 'Template created', template });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getTemplates = async (req, res) => {
  try {
    const templates = await Template.find({ user: req.user.id });
    res.json({ templates });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


exports.deleteTemplate = async (req, res) => {
  const templateId = req.params.id;
  try {
    const template = await Template.findOneAndDelete({
      _id: templateId,
      user: req.user.id
    });

    if (!template) {
      return res.status(404).json({ error: 'Template not found or unauthorized' });
    }

    res.json({ message: 'Template deleted', template });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};