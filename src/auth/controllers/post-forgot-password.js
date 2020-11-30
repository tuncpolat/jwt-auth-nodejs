export default function makePostForgotPassword({ sendEmailToChangePassword }) {
    return async function postForgotPassword(httpRequest) {
        try {
            const { email } = httpRequest.body

            await sendEmailToChangePassword({
                email
            })

            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 201,
                body: email
            }
        } catch (e) {
            // TODO: Error logging
            console.log("ERROR L", e)

            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 400,
                body: {
                    error: e.message
                }
            }
        }
    }
}