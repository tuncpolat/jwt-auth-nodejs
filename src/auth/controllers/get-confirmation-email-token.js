export default function makeGetConfirmationEmailToken({ verifyEmailToken }) {
  return async function getConfirmationEmailToken(httpRequest) {
    try {
      const emailToken = httpRequest.params.emailtoken

      const verifiedEmail = await verifyEmailToken(emailToken)

      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 201,
        body: {
          email: verifiedEmail.email,
          success: true
        }
      }
    } catch (e) {
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