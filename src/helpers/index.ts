import crypto from 'crypto'

// get auth secret from env
const secret = process.env.AUTH_SECRET

export const random = () => crypto.randomBytes(128).toString('base64')
export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(secret).digest('hex');
}


