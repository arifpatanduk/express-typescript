import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
// initialize dotenv
dotenv.config()

import { dbConnect } from './config/dbConnect'
import router from './router';

const app = express();
app.use(cors({
    credentials: true,
}))

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

// db connection
dbConnect()

// server configuration
const server = http.createServer(app)
const PORT = process.env.PORT || 8080
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

// router
app.use('/', router())
