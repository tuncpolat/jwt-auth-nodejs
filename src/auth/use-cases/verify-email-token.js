export default function makeVerifyEmailToken({ usersDb, jwt }) {
    return async function verifyEmailToken(emailToken) {

        if (!emailToken) { throw new Error("Confirmation failed.") }

        const user = jwt.verify(emailToken, process.env.EMAIL_TOKEN);
        let emailVerified

        if (!user) { throw new Error("Invalid Email Token.") }

        if (user) {
            emailVerified = await usersDb.verifyEmail({ email: user.email })
        }

        return { success: emailVerified.success, email: user.email }
    }
}