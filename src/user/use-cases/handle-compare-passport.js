export default function makeHandleComparePaspport({ bycrypt }) {
    return async function handleComparePassport({ inputPassword, dbPassword }) {
        const comparedPassword = await bycrypt.compare(inputPassword, dbPassword)
        return comparedPassword
    }
} 