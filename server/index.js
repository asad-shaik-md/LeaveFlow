import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import authMiddleware from "./middleware/authMiddleware.js";
import register from './routes/register.js';
import login from './routes/login.js';
import leave from './routes/leaveRequest.js'

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());

if (!process.env.JWT_PRIVATE_KEY) {
  console.error('FATAL ERROR: JWT Privatekey not found');
  process.exit(1)
}

app.use('/register', register);
app.use('/login', login);
app.use('/leave-request', authMiddleware, leave)

const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
