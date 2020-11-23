export default function makeGetRefreshAccessToken({ refreshAccessToken }) {
  return async function getRefreshAccessToken(httpRequest) {
    try {
      // get refresh token and create new access token      
      const refreshToken = httpRequest.cookies.refresh_token
      const accessToken = await refreshAccessToken(refreshToken)
      
      return {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': accessToken
        },
        statusCode: 201,
        body: {}
      }
    } catch (e) {
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 400,
        body: {
          error: e
        }
      }
    }
  }
}