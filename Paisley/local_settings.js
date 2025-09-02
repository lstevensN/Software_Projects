/* 
Thank you SO MUCH to https://stackoverflow.com/questions/51933601/what-is-the-definitive-way-to-use-gmail-with-oauth-and-nodemailer
& https://medium.com/@nickroach_50526/sending-emails-with-node-js-using-smtp-gmail-and-oauth2-316fe9c790a1, these posts were extremely helpful!!
*/

const oauth_host = "smtp.gmail.com"
const oauth_port = 465
const oauth_client_id = "268728210955-uqqmdd91gq3v4c32tjaaa37l0oujpb6s.apps.googleusercontent.com"
const oauth_client_secret = "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"
const oauth_refresh_token = "1//04xOVQumjCwmZCgYIARAAGAQSNwF-L9Ir5MtsrJJb4a311tmjwG7KXPC_mTgZc6KjHiJK11uUtU4_lf4sCpJ1v7efq4P1-ugFlMY"

const oauth_username = "nihilism156@gmail.com" // Hard coding this for now, might need to change later

export { oauth_host }
export { oauth_port }
export { oauth_client_id }
export { oauth_client_secret }
export { oauth_refresh_token }
export { oauth_username }
