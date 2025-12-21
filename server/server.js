import dotenv from 'dotenv';
import http from 'http';
import { initSocket } from './Socket/index.js';
dotenv.config();

import express from 'express';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import connectDB from './dbCon.js';
import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';
import userRoutes from './routes/user.js';

const app = express();

const FRONTEND = process.env.VITE_APP_URL;
const MONGO = process.env.MONGO_URI;


app.use(express.json());


app.use(cors({
  origin: FRONTEND,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));

app.options('*', cors({
  origin: FRONTEND,
  credentials: true
}));

connectDB(MONGO);

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET || 'dev_secret_key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: MONGO
    }),
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false, 
      maxAge: 1000 * 60 * 60 * 24
    },
  })
app.use(sessionMiddleware
);


app.use('/api/auth', authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);


initSocket(server, sessionMiddleware);

server.listen(5000, () => {
  console.log("Server + Socket.IO running on port 5000");
});

