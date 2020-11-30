export default function makeHandleHashPaspport({ bycrypt }) {
    return async function handleHashPassport({ password }) {
        const salt = await bycrypt.genSalt()
        const hashedPassword = await bycrypt.hash(password, salt)
        return hashedPassword
    }
} 