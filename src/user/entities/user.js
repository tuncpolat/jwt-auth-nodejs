export default function buildMakeUser({ Id, makeSource, isValidEmail }) {
    return function makeUser({
        id = Id.makeId(),
        email,
        password,
        confirmedEmail = false,
        createdOn = Date.now(),
        source
    } = {}) {
        if (id === Id.isValidId()) {
            throw new Error("User must have a valid id.");
        }
        if (!email) {
            throw new Error("You must provide an email adress.")
        }
        if(!isValidEmail(email)) {
            throw new Error("You must provide an valid email.")
        }
        if (!password) {
            throw new Error("You must provide a password.")
        }
        if (password.length < 6) {
            throw new Error("Your password must have at least 6 characters.")
        }
        //todo: at least characters/signs password
        if (!source) {
            throw new Error('Post must have a source.')
        }

        const validSource = makeSource(source)

        return Object.freeze({
            getId: () => id,
            getEmail: () => email,
            getConfirmedEmail: () => confirmedEmail,
            getPassword: () => password,
            getCreatedOn: () => createdOn,
            getSource: () => validSource
        })

    }
}