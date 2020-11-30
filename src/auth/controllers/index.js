// INTERFACE ADAPTER LAYER (Nr. 3)
import makeRefreshAccessToken from './get-refresh-access-token'
import makeGetConfirmationEmailToken from './get-confirmation-email-token'
import makePostLogout from './post-logout'
import makePostForgotPassword from './post-forgot-password'
import makePostChangePassword from './post-change-password'

import {
    refreshAccessToken,
    verifyEmailToken,
    sendEmailToChangePassword,
    changePassword 
} from '../use-cases'

const getRefreshAccessToken = makeRefreshAccessToken({ refreshAccessToken })
const getConfirmationEmailToken = makeGetConfirmationEmailToken({ verifyEmailToken })
const postLogout = makePostLogout()
const postForgotPassword = makePostForgotPassword({ sendEmailToChangePassword })
const postChangePassword = makePostChangePassword({ changePassword })


const authController = Object.freeze({
    getRefreshAccessToken,
    getConfirmationEmailToken,
    postLogout,
    postForgotPassword,
    postChangePassword
})

export default authController
export { getRefreshAccessToken, getConfirmationEmailToken, postLogout, postForgotPassword, postChangePassword}