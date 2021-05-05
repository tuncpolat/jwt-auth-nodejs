import makeRegisterUser from './register-user'
import makeLoginUser from './login-user'
import makeListUserData from './list-user-data'
import makeHandleHashPassport from './handle-hash-passport'
import makeHandleComparePassport from './handle-compare-passport'
import { sendEmailVerification } from '../../auth/use-cases'
import usersDb from '../data-access'
import bycrypt from 'bcrypt'

const handleHashPassport = makeHandleHashPassport({ bycrypt })
const handleComparePassport = makeHandleComparePassport({ bycrypt })

const registerUser = makeRegisterUser({ usersDb, handleHashPassport, sendEmailVerification })
const loginUser = makeLoginUser({ usersDb, handleComparePassport })
const listUserData = makeListUserData({ usersDb })



const userservice = Object.freeze({
    registerUser,
    loginUser,
    listUserData
})

export default userservice
export { registerUser, loginUser, listUserData }