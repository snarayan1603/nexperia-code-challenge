import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../services/api";
import SnackbarComponent from "../components/Toast/SnackbarComponent";

const Campaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "",
    msg: "",
  });

  // Fetch campaigns on mount
  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await api.get("/campaign/all");
      setCampaigns(res.data.campaigns);
    } catch (err) {
      setError(err.response?.data?.error || "Error fetching campaigns.");
    } finally {
      setLoading(false);
    }
  };

  // Send Emails
  const handleSendEmails = async (campaignId, templateId) => {
    try {
      await api.post("/email/send", { campaignId, templateId });
      setSnackbar({
        open: true,
        severity: "success",
        msg: "Emails are being sent!",
      });
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        severity: "error",
        msg: "Failed to send emails",
      });
    }
  };

  // Show Statistics
  const handleStatistics = (campaignId) => {
    navigate(`/campaign/${campaignId}`);
  };

  // Delete Campaign
  const handleDeleteCampaign = async (campaignId) => {
    try {
      await api.delete(`/campaign/${campaignId}`);
      setCampaigns((prev) => prev.filter((c) => c._id !== campaignId));
      setSnackbar({
        open: true,
        severity: "success",
        msg: "Campaign deleted successfully!",
      });
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        severity: "error",
        msg: "Failed to delete campaign",
      });
    }
  };

  if (loading) {
    return <Typography>Loading campaigns...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!campaigns.length) {
    return <Typography>No campaigns found.</Typography>;
  }

  return (
    <Box sx={{ px: "30px", mt: 4 }}>
      <Typography variant="h5" mb={2} textAlign="center">
        All Campaigns
      </Typography>

      {snackbar?.open && (
        <SnackbarComponent snackbar={snackbar} setSnackbar={setSnackbar} />
      )}

      {/* Display each campaign as a card */}
      <Stack spacing={2}>
        {campaigns.map((c) => (
          <Card
            key={c._id}
            variant="outlined"
            sx={{
              position: "relative",
              transition: "box-shadow 0.2s",
              "&:hover": {
                boxShadow: 4,
              },
            }}
          >
            {/* Delete Button */}
            <IconButton
              onClick={() => handleDeleteCampaign(c._id)}
              color="error"
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
              }}
            >
              <DeleteIcon />
            </IconButton>

            <CardContent>
              <Typography variant="h6">{c.name}</Typography>
              {c?.template?.name && (
                <Typography variant="body2" color="text.secondary">
                  Template: {c.template.name}
                </Typography>
              )}
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSendEmails(c._id, c?.template?.id)}
              >
                Send Emails
              </Button>
              <Button variant="outlined" onClick={() => handleStatistics(c._id)}>
                Statistics
              </Button>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default Campaign;
