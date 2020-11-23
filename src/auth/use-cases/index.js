import makeSignupAccessToken from './signup-access-token'
import makeLoginAccessToken from './login-access-token'
import makeVerifyAccessToken from './verify-access-token'
import makeRefreshAccessToken from './refresh-access-token'
import makeSendEmailVerification from './send-email-verification'
import makeVerifyEmailToken from './verify-email-token'
import makeCheckEmailConfirmed from './check-email-confirmed'

import * as jwt from 'jsonwebtoken'
import nodemailer from "nodemailer"

import usersDb from '../data-access'

const sendEmailVerification = makeSendEmailVerification({ nodemailer, jwt })
const checkEmailConfirmed = makeCheckEmailConfirmed({ usersDb })
const verifyEmailToken = makeVerifyEmailToken({ usersDb, jwt })
const loginAccessToken = makeLoginAccessToken({ jwt })
const signupAccessToken = makeSignupAccessToken({ jwt })
const verifyAccessToken = makeVerifyAccessToken({ jwt })
const refreshAccessToken = makeRefreshAccessToken({ jwt })

const authService = Object.freeze({
    loginAccessToken,
    signupAccessToken,
    verifyAccessToken,
    refreshAccessToken,
    sendEmailVerification,
    verifyEmailToken,
    checkEmailConfirmed
})

export default authService
export { loginAccessToken, signupAccessToken, verifyAccessToken, refreshAccessToken, sendEmailVerification, verifyEmailToken, checkEmailConfirmed }