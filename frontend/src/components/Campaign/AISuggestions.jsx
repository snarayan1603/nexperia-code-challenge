// src/components/Campaign/AISuggestions.jsx
import React, { useState } from 'react';
import api from '../../services/api';

// MUI imports
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  CircularProgress
} from '@mui/material';

const AISuggestions = () => {
  const [description, setDescription] = useState('');
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuggestions(null);
    if (!description.trim()) {
      setError('Please enter a campaign description.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/ai/suggestions', { description });
      setSuggestions(res.data.suggestions);
    } catch (err) {
      setError(err.response?.data?.error || 'Error generating suggestions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: 'auto',
        mt: 5,
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: 'background.paper',
      }}
    >
      <Typography variant="h5" mb={2} textAlign="center">
        AI-Powered Email Suggestions
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Campaign Description"
            value={description}
            onChange={handleDescriptionChange}
            required
            multiline
            rows={5}
            placeholder="Enter a brief description of your campaign"
          />

          <Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ mr: 2 }}
            >
              {loading ? 'Generating...' : 'Get Suggestions'}
            </Button>
            {loading && <CircularProgress size={24} />}
          </Box>
        </Stack>
      </Box>

      {suggestions && (
        <Box mt={3} className="suggestions-results">
          <Typography variant="h6">Suggested Subject Line:</Typography>
          <Typography variant="body1" paragraph>
            {suggestions.subject}
          </Typography>

          <Typography variant="h6">Suggested Email Body:</Typography>
          <Typography variant="body1">
            {suggestions.body}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default AISuggestions;
