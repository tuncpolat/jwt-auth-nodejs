// INTERFACE ADAPTER LAYER (Nr. 3)
import {
    registerUser,
    loginUser,
    listUserData
} from '../use-cases'
import {
    signupAccessToken,
    loginAccessToken,
    verifyAccessToken
} from '../../auth/use-cases'
import makePostRegisterUser from './post-register-user'
import makePostLoginUser from './post-login-user'
import makeGetUserData from './get-user-data'


const postRegisterUser = makePostRegisterUser({ registerUser, signupAccessToken })
const postLoginUser = makePostLoginUser({ loginUser, loginAccessToken })
const getUserData = makeGetUserData({verifyAccessToken, listUserData})

const userController = Object.freeze({
    postRegisterUser,
    postLoginUser,
    getUserData
})

export default userController
export { postRegisterUser, postLoginUser, getUserData }