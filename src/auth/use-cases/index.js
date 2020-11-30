import makeSignupAccessToken from './signup-access-token'
import makeLoginAccessToken from './login-access-token'
import makeVerifyAccessToken from './verify-access-token'
import makeRefreshAccessToken from './refresh-access-token'
import makeSendEmailVerification from './send-email-verification'
import makeVerifyEmailToken from './verify-email-token'
import makeCheckEmailConfirmed from './check-email-confirmed'
import makeSendEmailToChangePassword from '../../auth/use-cases/send-email-to-change-password'
import makeHandleHashPassport from './handle-hash-passport'

import * as jwt from 'jsonwebtoken'
import nodemailer from "nodemailer"
import bycrypt from 'bcrypt'

import usersDb from '../data-access'
import makeChangePassword from './change-password'

const handleHashPassport = makeHandleHashPassport({ bycrypt })

const sendEmailVerification = makeSendEmailVerification({ nodemailer, jwt })
const checkEmailConfirmed = makeCheckEmailConfirmed({ usersDb })
const verifyEmailToken = makeVerifyEmailToken({ usersDb, jwt })
const loginAccessToken = makeLoginAccessToken({ jwt })
const signupAccessToken = makeSignupAccessToken({ jwt })
const verifyAccessToken = makeVerifyAccessToken({ jwt })
const refreshAccessToken = makeRefreshAccessToken({ jwt })
const sendEmailToChangePassword = makeSendEmailToChangePassword({ usersDb, jwt, nodemailer })
const changePassword = makeChangePassword({ usersDb, jwt, handleHashPassport })

const authService = Object.freeze({
    loginAccessToken,
    signupAccessToken,
    verifyAccessToken,
    refreshAccessToken,
    sendEmailVerification,
    verifyEmailToken,
    checkEmailConfirmed,
    sendEmailToChangePassword,
    changePassword
})

export default authService
export { loginAccessToken, signupAccessToken, verifyAccessToken, refreshAccessToken, sendEmailVerification, verifyEmailToken, checkEmailConfirmed, sendEmailToChangePassword, changePassword }