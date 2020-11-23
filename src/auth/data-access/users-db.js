export default function MakeUsersDb({ makeDb }) {

  return Object.freeze({
    verifyEmail,
    checkIfEmailIsConfirmed
  })

  async function verifyEmail({ email }) {
    const db = await makeDb()
    const { result } = await db.collection('users')
      .updateOne({ email }, { $set: { confirmedEmail: true } });
    if (result.ok !== 1) return { success: false }
    return { success: true }
  }

  async function checkIfEmailIsConfirmed({ _id }) {
    const db = await makeDb()
    const result = await db.collection('users').find({ _id })
    const found = await result.toArray()
    if (found.length === 0) {
      return null
    }
    const { _id: id, ...info } = found[0]
    return { id, ...info }
  }
}