export default function makePostRegisterUser({ registerUser, signupAccessToken }) {
  return async function postRegisterUser(httpRequest) {
    try {
      const { source = {}, ...userInfo } = httpRequest.body // email and password
      source.ip = httpRequest.ip
      source.browser = httpRequest.headers['User-Agent']
      if (httpRequest.headers['Referer']) {
        source.referrer = httpRequest.headers['Referer']
      }

      // register user comes from use-cases (inner layer)
      const user = await registerUser({
        ...userInfo,
        source
      })

      // auth use-cases
      const tokens = await signupAccessToken({
        id: user.id,
        type: 'user'
      })

      return {
        headers: {
          'Content-Type': 'application/json',
          'Last-Modified': new Date(user.modifiedOn).toUTCString(),
          'Authorization': tokens.accessToken
        },
        cookies: { name: "refresh_token", value: tokens.refreshToken },
        statusCode: 201,
        body: { user }
      }
    } catch (e) {

      // TODO: Error logging
      console.log(e)

      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 400,
        body: e.message
      }
    }
  }
}