# Email Outreach Platform

## Overview

The **Email Outreach Platform** is a full-stack application designed for managing and automating email outreach campaigns. It provides a user-friendly interface for creating campaigns, sending bulk emails, and monitoring email delivery. The application integrates with APIs like SendGrid and Hugging Face to enhance functionality.

---

## Features

- **Frontend**:

  - Built with React and Vite for a fast development experience.
  - Material-UI (MUI) for modern, responsive design.
  - Axios for API communication.

- **Backend**:

  - Node.js with Express.js for server-side logic.
  - MongoDB for database management.
  - Redis and Bull for queue management.
  - SendGrid integration for email delivery.
  - JWT for user authentication.
  - Hugging Face for subject line and body creation

---

## Technologies Used

### Frontend

- **React**
- **Material-UI (MUI)**
- **Vite**
- **Axios**

### Backend

- **Node.js**
- **Express.js**
- **MongoDB**
- **Redis**
- **Bull**
- **SendGrid API**
- **JWT**
- **Hugging Face**

---

## Folder Structure

### Project Root

```
email-outreach-platform
├── backend
├── frontend
└── README.md
```

### Backend Structure

```
backend
├── logs        # Logs
├── src         
    ├── controllers        # Route handlers
    ├── middleware         # Middleware (e.g., authentication)
    ├── models             # Mongoose models
    ├── routes             # Express routes
    ├── services           # Business logic (e.g., email handling)
    ├── workers            # Queue workers
    └── index.js             # Entry point for backend
├── uploads                # Uploaded SCV
├── .env                   # Backend environment variables
└── package.json           # Installation Requirements
```

### Frontend Structure

```
frontend
├── public             # Static assets
├── src
│   ├── assets         # Images, icons, etc.
│   ├── components     # Reusable UI components
│   ├── pages          # Application pages
│   ├── services       # Axios API setup
│   ├── App.jsx        # Root React component
│   ├── index.css      # Global styles
│   └── main.jsx       # React entry point
├── .env               # Frontend environment variables
└── vite.config.js     # Vite configuration
```

---

## Setup and Installation

### Prerequisites

- **Node.js** (v14 or later)
- **MongoDB**
- **Redis**

### Clone the Repository

```bash
git clone https://github.com/your-repo/email-outreach-platform.git
cd email-outreach-platform
```

### Backend Setup

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` folder:

   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/demo
   JWT_SECRET=your_jwt_secret
   SENDGRID_API_KEY=your_sendgrid_api_key
   REDIS_URL=redis://localhost:6379
   ```

4. Start the backend server:

   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `frontend` folder:

   ```env
   VITE_BASE_URL=http://localhost:5000/api
   ```

4. Start the frontend development server:

   ```bash
   npm run dev
   ```

### Start Redis

Ensure Redis is running on your system:

```bash
redis-server
```

---

## Usage

1. **Access the Frontend**:

   - Navigate to [http://localhost:5173](http://localhost:5173) in your browser.

2. **Login or Register**:

   - Authenticate to access the dashboard.

3. **Create Campaigns**:

   - Use the dashboard to create and manage email campaigns.

4. **Monitor Email Status**:

   - Track email delivery and statuses via the dashboard.

---

## Environment Variables

### Backend `.env`

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SENDGRID_API_KEY=your_sendgrid_api_key
REDIS_URL=redis://localhost:6379
```

### Frontend `.env`

```env
VITE_BASE_URL=http://localhost:5000/api
```

---

## Deployment

### Backend Deployment

1. Depled the backend to a cloud provider like AWS, Render, or Heroku.
2. Ensure MongoDB and Redis instances are accessible.

### Frontend Deployment

1. Build the frontend for production:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder to a static hosting service like Netlify, Vercel, or AWS S3.

---

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Authenticate a user.

### Campaigns

- `GET /api/campaign/all`: Fetch all campaigns.
- `POST /api/campaign/upload-csv`: Create a new campaign.
- `Delete /api/campaign/:id`: Delete campaign.

### Emails

- `POST /api/emails/send`: Send an email.

### AI Suggestion

- `POST /api/ai/suggestions`: Get AI Suggestions.

### Metrics

- `POST /api/metrics/:id/metrics`: Check email delivery status.

### Template

- `POST /api/templates/create`: Create Email Template.

---

## Troubleshooting

1. **Frontend Not Connecting to Backend**:

   - Ensure `VITE_BASE_URL` in `.env` is correct.
   - Verify the backend server is running.

2. **Emails Not Sending**:

   - Check the SendGrid API key.
   - Ensure Redis is running for queue processing.

3. **Database Connection Issues**:

   - Verify the MongoDB URI in the backend `.env` file.

---

## Acknowledgments

- **SendGrid** for email delivery.
- **OpenAI** for content generation.
- **Material-UI** for design components.

