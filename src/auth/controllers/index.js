// INTERFACE ADAPTER LAYER (Nr. 3)
import makeRefreshAccessToken from './get-refresh-access-token'
import makeGetConfirmationEmailToken from './get-confirmation-email-token'
import makePostLogout from './post-logout'

import {
    refreshAccessToken,
    verifyEmailToken
} from '../use-cases'

const getRefreshAccessToken = makeRefreshAccessToken({ refreshAccessToken })
const getConfirmationEmailToken = makeGetConfirmationEmailToken({ verifyEmailToken })
const postLogout = makePostLogout()

const authController = Object.freeze({
    getRefreshAccessToken,
    getConfirmationEmailToken,
    postLogout
})

export default authController
export { getRefreshAccessToken, getConfirmationEmailToken, postLogout }