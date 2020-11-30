export default function makePostChangePassword({ changePassword }) {
    return async function postChangePassword(httpRequest) {
        try {
            const { newpassword } = httpRequest.body
            const { passwordtoken } = httpRequest.params

            console.log(newpassword, passwordtoken)

            const success = await changePassword(passwordtoken, newpassword)

            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 201,
                body: success
            }
        } catch (e) {
            // TODO: Error logging
            console.log(e)

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