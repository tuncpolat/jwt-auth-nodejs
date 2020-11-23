export default function makeVerifyAccessToken({ jwt }) {
    return function verifyAccessToken(accessToken) {

        if (!accessToken) { throw new Error("Access Denied.") }

        const user = jwt.verify(accessToken, process.env.ACCESS_TOKEN);
        
        if (!user) { throw new Error("Invalid Token.") }

        return user.id
    }
}