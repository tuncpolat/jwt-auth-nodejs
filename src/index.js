// FRAMEWORK LAYER (Nr. 4)
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';
import cors from 'cors'
const port = process.env.PORT || 5000;
dotenv.config()
// controllers
import { postLoginUser, postRegisterUser } from './user/controllers'
import { getRefreshAccessToken, getConfirmationEmailToken, postLogout, postForgotPassword, postChangePassword} from './auth/controllers'

// helpers
import makeCallback from './helpers/express-callback'


const app = express()

// CORS
const corsOptions = { 
    exposedHeaders: 'Authorization', 
    credentials: true, 
    origin: process.env.NODE_ENV === 'production' ? 'https://yourcompany.com' : 'http://localhost:3000' 
};
app.use(cors(corsOptions));

// BODY PARSER
app.use(bodyParser.json())
app.use(cookieParser())


app.get("/ping", (req, res) => {
    res.send("pong")
})

// auth
app.post('/api/refresh_token', makeCallback(getRefreshAccessToken))
app.get('/api/confirmation/:emailtoken', makeCallback(getConfirmationEmailToken))
app.post('/api/logout', makeCallback(postLogout))
app.post('/api/forgot-password', makeCallback(postForgotPassword))
app.post('/api/change-password/:passwordtoken', makeCallback(postChangePassword))

// user
app.post('/api/register', makeCallback(postRegisterUser))
app.post('/api/login', makeCallback(postLoginUser))


app.listen(port, () => console.log(`Listening on port ${port}`))


