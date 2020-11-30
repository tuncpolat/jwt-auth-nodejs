export default function makeChangePassword({ usersDb, jwt, handleHashPassport }) {
    return async function changePassword(passwordToken, newpassword) {

        if (!passwordToken) { throw new Error("Password change failed.") }

        const user = jwt.verify(passwordToken, process.env.PASSWORD_TOKEN);

        if (!user) { throw new Error("Invalid Password Token.") }

        // hash password
        const hashedNewPassword = await handleHashPassport({ password: newpassword })

        const success = await usersDb.findByEmailAndChangePassword({ email: user.email, password: hashedNewPassword })

        return { success }
    }
}