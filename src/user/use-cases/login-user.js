export default function makeLoginUser({ usersDb, handleComparePassport }) {
    return async function loginUser(userInfo) {

        const user = await usersDb.findByEmail({ email: userInfo.email })
        if (!user) { throw new Error("Email not found.") }

        const comparedPassword = await handleComparePassport({ inputPassword: userInfo.password, dbPassword: user.password })
        if(!comparedPassword) { throw new Error("Password is incorrect.") }

        return user
    }
}