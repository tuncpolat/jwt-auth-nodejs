export default function makeGetUserData({ verifyAccessToken, listUserData }) {
    return async function getUserData(httpRequest) {
      try {

        const accessToken = httpRequest.headers['Authorization']

        const userId = verifyAccessToken(accessToken)
          
        const user = await listUserData(userId)
  
        return {
          headers: {
            'Content-Type': 'application/json',
            'Last-Modified': new Date(user.modifiedOn).toUTCString()
          },
          statusCode: 201,
          body: user
        }
      } catch (e) {
        // TODO: Error logging
        console.log(e)
  
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 401,
          body: e.message
        }
      }
    }
  }