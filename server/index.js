import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import register from './routes/register.js';
import login from './routes/login.js';

dotenv.config();

if (!process.env.JWT_PRIVATE_KEY) {
  console.error('FATAL ERROR: JWT Privatekey not found');
  process.exit(1)
}

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());

app.use('/register', register);
app.use('/login', login);

const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
