export default function makePostLogout() {
    return async function postLogout() {
      try {
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          clearCookies: { name: "refresh_token" },
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