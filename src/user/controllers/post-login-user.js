export default function makePostLoginUser({ loginUser, loginAccessToken }) {
  return async function postLoginUser(httpRequest) {
    try {
      const { source = {}, ...userInfo } = httpRequest.body
      source.ip = httpRequest.ip
      source.browser = httpRequest.headers['User-Agent']
      if (httpRequest.headers['Referer']) {
        source.referrer = httpRequest.headers['Referer']
      }

      // registeruser comes from use-cases (inner layer)
      const user = await loginUser({
        ...userInfo,
        source
      })

      // AWS COGNITO
      const tokens = await loginAccessToken({
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