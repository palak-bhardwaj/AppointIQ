import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongoDB.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

const app = express();
const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await connectDB();
    connectCloudinary();

    app.use(express.json());
    app.use(cors());

    app.use('/api/admin', adminRouter);
    app.use('/api/doctor', doctorRouter);
    app.use('/api/user', userRouter);

    // ✅ 404 handler
    app.use((req, res, next) => {
      res.status(404).json({
        success: false,
        message: "Route not found",
      });
    });

    app.get('/', (req, res) => {
      res.send("API working fine");
    });

    app.listen(PORT, () => {
      console.log(`✅ Server started on port: ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Error starting server:", error);
    process.exit(1);
  }
};

startServer();
