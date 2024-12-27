import React, { useState, useEffect } from "react";
import api from "../../services/api";

// MUI imports
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Stack,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const TemplateEditor = () => {
  const [templates, setTemplates] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    body: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const { name, subject, body } = formData;

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const res = await api.get("/templates");
      setTemplates(res.data.templates);
    } catch (err) {
      console.error("Error fetching templates:", err);
    }
  };

  const handleDialogOpen = () => {
    setFormData({ name: "", subject: "", body: "" });
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setError("");
    setMessage("");
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const res = await api.post("/templates/create", formData);
      setMessage(res.data.message);
      setTemplates((prev) => [...prev, res.data.template]);
      handleDialogClose(); // Close the dialog after saving
    } catch (err) {
      setError(err.response?.data?.error || "Error creating template.");
    }
  };

  const handleDelete = async (templateId) => {
    try {
      await api.delete(`/templates/${templateId}`);
      setTemplates((prev) =>
        prev.filter((template) => template._id !== templateId)
      );
      setMessage("Template deleted successfully.");
    } catch (err) {
      setError(err.response?.data?.error || "Error deleting template.");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: "auto",
        mt: 5,
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "background.paper",
      }}
    >
      <Typography variant="h5" mb={2} textAlign="center">
        Template Editor
      </Typography>

      {/* Display success/error messages */}
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

      {/* Template List */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography variant="h6">Available Templates</Typography>
        {/* Create Template Button */}
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleDialogOpen}
        >
          Create Template
        </Button>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {templates.length === 0 ? (
        <Typography>No templates found.</Typography>
      ) : (
        <List>
          {templates.map((template) => (
            <ListItem
              key={template._id}
              disablePadding
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ListItemText
                primary={template.name}
                secondary={template.subject}
              />
              <Tooltip title="Delete Template">
                <IconButton
                  edge="end"
                  color="error"
                  onClick={() => handleDelete(template._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      )}

      {/* Dialog for Creating Templates */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create Template</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              label="Template Name"
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              required
              fullWidth
            />
            <TextField
              label="Subject"
              type="text"
              name="subject"
              value={subject}
              onChange={onChange}
              required
              fullWidth
            />
            <TextField
              label="Body"
              name="body"
              value={body}
              onChange={onChange}
              required
              fullWidth
              multiline
              rows={6}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TemplateEditor;
