export default function MakeUsersDb({ makeDb }) {

  return Object.freeze({
    register,
    findByEmail
  })

  async function register({ id: _id = Id.makeId(), ...userInfo }) {
    const db = await makeDb()
    const result = await db
      .collection('users')
      .insertOne({ _id, ...userInfo })
    const { _id: id, ...insertedInfo } = result.ops[0]
    return { id, ...insertedInfo }
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
}