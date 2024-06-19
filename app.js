import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from "./routes/user-routes.js";
import adminRouter from "./routes/admin-routes.js";
import movieRouter from "./routes/movie-routes.js";
import bookingsRouter from "./routes/booking-routes.js";

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// CORS configuration
const corsOptions = {
    origin: ['http://localhost:3000', 'https://movieticketbooking-4fr9.onrender.com'], // Add your frontend URL here
    optionsSuccessStatus: 200
};

// Use the CORS middleware with options
app.use(cors(corsOptions));

// Route middleware
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingsRouter);

// MongoDB connection
const dbUri = `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.iw5deb5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");

    // Start the server
    const port = process.env.PORT || 5000;
    app.listen(port, '0.0.0.0', () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
