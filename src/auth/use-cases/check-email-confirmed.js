export default function makeCheckEmailConfirmed({ usersDb }) {
    return async function checkEmailConfirmed(id) {
        if (!id) { throw new Error("No ID FOUND.") }
        const user = await usersDb.checkIfEmailIsConfirmed({ _id: id })
        if (!user) { throw new Error("User not found.") }
        if (!user.confirmedEmail) { throw new Error("Email-Adresse ist nicht verifziert.") }
    }
}