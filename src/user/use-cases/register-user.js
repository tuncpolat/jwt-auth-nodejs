import makeUser from '../entities'

export default function makeRegisterUser({ usersDb, handleHashPassport, sendEmailVerification }) {
    return async function registerUser(userInfo) {
        const user = makeUser(userInfo)

        const emailExists = await usersDb.findByEmail({ email: user.getEmail() })
        if (emailExists) { throw new Error("This email is already in use.") }

        const hashedPassword = await handleHashPassport({ password: user.getPassword() })
        
        await sendEmailVerification({ email: user.getEmail() })

        return usersDb.register({
            id: user.getId(),
            email: user.getEmail(),
            password: hashedPassword,
            confirmedEmail: user.getConfirmedEmail(),
            source: {
                ip: user.getSource().getIp(),
                browser: user.getSource().getBrowser(),
                referrer: user.getSource().getReferrer()
            }
        })
    }
}