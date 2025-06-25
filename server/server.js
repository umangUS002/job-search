import './configs/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/db.js';
import * as Sentry from "@sentry/node";
import clerkWebhooks from './controllers/webhooks.js';
import router from './routes/companyRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import jobRouter from './routes/jobRoutes.js';
import userRouter from './routes/userRoutes.js';
import { clerkMiddleware } from '@clerk/express';

// Intialize Express
const app = express();

app.use(cors());
app.use(express.json());

// Connect to db
await connectDB();
await connectCloudinary();

app.post('/webhooks', clerkWebhooks);


// Middlewares
app.use(clerkMiddleware());


// Routes
app.get('/', (req,res) => {
    res.send("API is Working");
});
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});


// Routes
app.use('/api/company', router);
app.use('/api/jobs', jobRouter);
app.use('/api/users', userRouter);

// Port
const PORT = process.env.PORT || 5000;

Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
