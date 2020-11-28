export default function makeRefreshAccessToken({ jwt }) {
    return function refreshAccessToken(refreshToken) {

        if (!refreshToken) { throw new Error("Access Denied.") }

        // TODO: SEARH FOR THAT REFRESH TOKEN IN DB

        const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);

        if(!user) { throw new Error("Refresh token is invalid.")}

        const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN, { expiresIn: '15m' })

        return accessToken
    }
}