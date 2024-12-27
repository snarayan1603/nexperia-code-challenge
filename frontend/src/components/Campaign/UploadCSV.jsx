// src/components/Campaign/UploadCSV.jsx

import React, { useState, useEffect } from 'react';
import api from '../../services/api';

// MUI imports
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

const UploadCSV = () => {
  const [file, setFile] = useState(null);
  const [campaignName, setCampaignName] = useState('');
  const [templates, setTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [selectedTemplateName, setSelectedTemplateName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch templates on mount
  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      // GET /templates (protected route)
      const res = await api.get('/templates');
      setTemplates(res.data.templates); // array of { _id, name, subject, etc. }
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching templates.');
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setCampaignName(e.target.value);
  };

  // User picks a template from the dropdown
  const handleTemplateChange = (e) => {
    // The value we store is an object: { id, name }
    const { value } = e.target; // value is like "abc123|Winter Charity"
    const [templateId, templateName] = value.split('|');
    setSelectedTemplateId(templateId);
    setSelectedTemplateName(templateName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!file) {
      setError('Please select a CSV file.');
      return;
    }
    if (!selectedTemplateId) {
      setError('Please select a template.');
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', campaignName);
    formData.append('templateId', selectedTemplateId);
    formData.append('templateName', selectedTemplateName);

    try {
      const res = await api.post('/campaign/upload-csv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(res.data.message);
      // Optionally, navigate to dashboard or refresh campaign list
    } catch (err) {
      setError(err.response?.data?.error || 'Error uploading CSV.');
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: 'auto',
        mt: 5,
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: 'background.paper'
      }}
    >
      <Typography variant="h5" mb={2} textAlign="center">
        Upload CSV for Email Campaign
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {message && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Campaign Name"
            value={campaignName}
            onChange={handleNameChange}
            required
            fullWidth
            placeholder="Enter campaign name"
          />

          {/* Template Dropdown */}
          <FormControl fullWidth required>
            <InputLabel id="template-select-label">Select Template</InputLabel>
            <Select
              labelId="template-select-label"
              label="Select Template"
              onChange={handleTemplateChange}
              value={
                selectedTemplateId
                  ? `${selectedTemplateId}|${selectedTemplateName}`
                  : ''
              }
            >
              {templates.map((template) => (
                <MenuItem
                  key={template._id}
                  value={`${template._id}|${template.name}`} // store both ID and name
                >
                  {template.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Upload CSV:
            </Typography>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              required
            />
          </Box>

          <Button variant="contained" color="primary" type="submit">
            Upload CSV
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default UploadCSV;
