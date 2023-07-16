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