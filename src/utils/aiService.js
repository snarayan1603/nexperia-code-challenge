// src/utils/aiService.js

const axios = require("axios");
const logger = require("./logger");

// Replace this with your Hugging Face model endpoint
// For example: "gpt2" or "tiiuae/falcon-7b-instruct" or any other text-generation model
// Hugging Face Inference API endpoint typically looks like:
//    https://api-inference.huggingface.co/models/<owner>/<model>
const HF_MODEL_URL =
  "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct";

// Your personal Hugging Face API token (set in .env or environment variables)
const HF_API_TOKEN = process.env.HUGGINGFACE_API_KEY;

const generateEmailSuggestions = async (description) => {
  try {
    // Craft your prompt (similar logic to what you had before)
    const prompt = `Generate a compelling email subject line and body based on the following campaign description:\n\n${description}\n\nSubject Line:\n`;

    // Prepare request payload
    // "inputs" is the main field for text generation
    // "parameters" can include things like max_new_tokens, temperature, etc.
    const payload = {
      inputs: prompt,
      parameters: {
        max_new_tokens: 150,
        temperature: 0.7,
        // stop sequences can be added if your model supports them
      },
    };

    // Make the POST request to Hugging Face Inference API
    const response = await axios.post(HF_MODEL_URL, payload, {
      headers: {
        Authorization: `Bearer ${HF_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const { subject, body } = extractEmailContent(response);
    logger.info(`Subject: ${subject}`);
    logger.info(`Body: ${body}`);
    return { subject, body };
  } catch (error) {
    // Log and rethrow
    logger.error(`AI generation error: ${error}`);
    throw new Error("Failed to generate email suggestions");
  }
};

const extractEmailContent = (response) => {
  // The response may return an array of objects; each object contains generated_text.
  const generatedText = response.data?.[0]?.generated_text || "";

  // Split the generated text into lines and filter out empty ones
  const lines = generatedText.split("\n").filter(Boolean);

  let subject = "Subject Line Missing";
  let body = "Body content missing.";

  // Search for "Subject Line:" and "Body:" markers in the response
  let subjectStartIndex = lines.findIndex((line) =>
    line.toLowerCase().startsWith("subject line:")
  );
  let bodyStartIndex = lines.findIndex((line) =>
    line.toLowerCase().startsWith("body:")
  );

  // Extract the subject
  if (subjectStartIndex !== -1) {
    subject = lines[subjectStartIndex + 1]
      .replace(/subject line:/i, "") // Remove the "Subject Line:" prefix
      .trim(); // Remove any extra spaces
  }

  // Extract the body (everything after the "Body:" marker)
  if (bodyStartIndex !== -1) {
    body = lines
      .slice(bodyStartIndex + 1) // Get all lines after "Body:"
      .join("\n") // Rejoin lines into a single string
      .trim(); // Remove extra spaces
  } else if (subjectStartIndex !== -1) {
    // If no explicit "Body:" marker, use everything after the subject as the body
    body = lines
      .slice(subjectStartIndex + 1) // Get lines after the subject
      .join("\n") // Rejoin lines
      .trim();
  }

  return { subject, body };
};

module.exports = { generateEmailSuggestions };
