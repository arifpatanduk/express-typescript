import express from 'express';
import { authentication, random } from '../helpers';
import { createUser, getUserByEmail } from '../model/users';

export const register = async (req: express.Request, res: express.Response) => {
    try {
        
        const {email, password, username} = req.body

        // check if no email or password or username
        if (!email || !password || !username) {
            return res.sendStatus(400)
        }

        // get user by email
        const existingUser = await getUserByEmail(email)
        
        // if email already exists
        if (existingUser) {
            return res.sendStatus(400)
        }

        // create new user
        const salt = random();
        const user = await createUser({
          email,
          username,
          authentication: {
            salt,
            password: authentication(salt, password),
          },
        });

        return res.status(200).json(user).end()

    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
        
    }
}

export const login = async (req: express.Request, res: express.Response) => {
    try {

        const { email, password } = req.body

        // validation
        if (!email || !password) return res.sendStatus(400)

        // get user by email
        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password')

        // if user no found
        if (!user) return res.sendStatus(400)

        // get user hashed password
        const expectedHash = authentication(user.authentication.salt, password)

        // check if password is correct
        if (user.authentication.password != expectedHash) {
            return res.sendStatus(403)
        }

        const salt = random()

        // create session token with user _id
        user.authentication.sessionToken = authentication(salt, user._id.toString())

        await user.save()

        // pass the session token into cookie
        res.cookie('AUTH-SESSION', user.authentication.sessionToken, {
            domain: 'localhost',
            path: '/'
        })

        return res.status(200).json(user).end()
        
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
        
    }
}