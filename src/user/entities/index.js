import Id from '../Id'
import ipRegex from 'ip-regex'
import validator from 'email-validator';
import buildMakeSource from './source'
import buildMakeUser from './user'

const makeSource = buildMakeSource({ isValidIp })
const makeUser = buildMakeUser({ Id, makeSource, isValidEmail })

export default makeUser

function isValidIp (ip) {
  return ipRegex({ exact: true }).test(ip)
}

function isValidEmail (email) {
  return validator.validate(email)
}


