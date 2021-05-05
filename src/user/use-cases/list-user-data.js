
export default function makeListUserData({ usersDb }) {
    return async function listUserData(_id) {

        const user = await usersDb.findById(_id)
        if (!user) { throw new Error("User not found.") }

        return user
    }
}