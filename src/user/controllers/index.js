// INTERFACE ADAPTER LAYER (Nr. 3)
import {
    registerUser,
    loginUser
} from '../use-cases'
import {
    signupAccessToken,
    loginAccessToken
} from '../../auth/use-cases'
import makePostRegisterUser from './post-register-user'
import makePostLoginUser from './post-login-user'

const postRegisterUser = makePostRegisterUser({ registerUser, signupAccessToken })
const postLoginUser = makePostLoginUser({ loginUser, loginAccessToken })

const userController = Object.freeze({
    postRegisterUser,
    postLoginUser
})

export default userController
export { postRegisterUser, postLoginUser }