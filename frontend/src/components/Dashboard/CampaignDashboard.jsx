// src/components/campaign/CampaignDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Necessary for Chart.js v3+

// MUI imports
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from '@mui/material';

const CampaignDashboard = () => {
  const { campaignId } = useParams();
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchMetrics = async () => {
    try {
      const res = await api.get(`/metrics/${campaignId}/metrics`);
      setMetrics(res.data.metrics);
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching metrics.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetchMetrics();
    // Optionally, set up polling to refresh metrics periodically
    const interval = setInterval(fetchMetrics, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, [campaignId]);

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
        <Typography variant="body1" mt={1}>
          Loading metrics...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!metrics) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography>No metrics available.</Typography>
      </Box>
    );
  }

  const barData = {
    labels: ['Sent', 'Pending', 'Failed'],
    datasets: [
      {
        label: 'Email Metrics',
        data: [metrics.emailsSent, metrics.emailsPending, metrics.emailsFailed],
        backgroundColor: ['#4CAF50', '#FF9800', '#F44336']
      }
    ]
  };

  const pieData = {
    labels: ['Sent', 'Failed'],
    datasets: [
      {
        data: [metrics.emailsSent, metrics.emailsFailed],
        backgroundColor: ['#4CAF50', '#F44336']
      }
    ]
  };

  return (
    <Box
      sx={{
        maxWidth: 1000,
        mx: 'auto',
        mt: 4,
        p: 2,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        boxShadow: 3
      }}
    >
      <Typography variant="h5" mb={2} textAlign="center">
        Campaign Metrics
      </Typography>

      {/* Charts */}
      <Grid container spacing={3}>
        {/* Bar Chart Card */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" mb={2}>
                Email Metrics Overview
              </Typography>
              <Bar data={barData} />
            </CardContent>
          </Card>
        </Grid>

        {/* Pie Chart Card */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" mb={2}>
                Success vs. Failure
              </Typography>
              <Pie data={pieData} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Failed Emails Table */}
      <Typography variant="h6" mt={4}>
        Failed Emails Details
      </Typography>
      {metrics.failedEmails.length === 0 ? (
        <Typography>No failed emails.</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Error</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {metrics.failedEmails.map((fe, index) => (
                <TableRow key={index}>
                  <TableCell>{fe.email}</TableCell>
                  <TableCell>{fe.error}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default CampaignDashboard;
