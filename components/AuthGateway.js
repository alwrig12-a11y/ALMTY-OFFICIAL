const express = require('express');
const admin = require('firebase-admin');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5000',
    'https://almty.io',
    'https://almty-official-git-main-alwrig12-9495s-projects.vercel.app'
  ],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// 1. Initialize Firebase Admin SDK
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID || process.env.FB_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL || process.env.FB_CLIENT_EMAIL,
        privateKey: (process.env.FIREBASE_PRIVATE_KEY || process.env.FB_PRIVATE_KEY) 
          ? (process.env.FIREBASE_PROJECT_ID ? process.env.FIREBASE_PRIVATE_KEY : process.env.FB_PRIVATE_KEY).replace(/\\n/gm, '\n') 
          : undefined,
      }),
    });
    console.log("✅ Firebase Admin successfully connected.");
  } catch (error) {
    console.error("❌ Firebase initialization failed:", error.message);
  }
}

// 2. Connect to MongoDB (for ALMTY Dossier & User Profile system)
if (mongoose.connection.readyState === 0) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB Database'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err.message));
}

// 3. Root API path
app.get('/api', (req, res) => {
  res.status(200).send("ALMTY API is awake and responding!");
});

// Import and use your user routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Import and use product routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// CRITICAL: Export for Vercel Serverless Function deployment
module.exports = app;