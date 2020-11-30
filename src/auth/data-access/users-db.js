export default function MakeUsersDb({ makeDb }) {

  return Object.freeze({
    verifyEmail,
    checkIfEmailIsConfirmed,
    findByEmail,
    findByEmailAndChangePassword
  })

  async function verifyEmail({ email }) {
    const db = await makeDb()
    const { result } = await db.collection('users')
      .findOneAndUpdate({ email }, { $set: { confirmedEmail: true } });
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


  async function findByEmail({ email }) {
    const db = await makeDb()
    const result = await db.collection('users').find({ email })
    const found = await result.toArray()
    if (found.length === 0) {
      return null
    }
    const { _id: id, ...info } = found[0]
    return { id, ...info }
  }

  async function findByEmailAndChangePassword({ email, password }) {
    const db = await makeDb()
    const result = await db.collection('users').findOneAndUpdate(
      { email },
      { $set: { password } }
    )

    if (result.ok !== 1) return false
    return true
  }

}