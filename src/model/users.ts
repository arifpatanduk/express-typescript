import mongoose from "mongoose";

// create user schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    authentication: {
        // select = false means this object will not be included in the while fetch aunthentication data
        password: {type: String, required: true, select: false}, 
        salt: {type: String, select: false},
        sessionToken: {type: String, select: false},
    }
})

// create user model
export const UserModel = mongoose.model('User', UserSchema)

// create user methods
export const getUsers = () => UserModel.find()
export const getUserByEmail = (email: string) => UserModel.findOne({email}) 
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    'aunthentication.sessionToken': sessionToken
})
export const getUserById = (id: string) => UserModel.findById(id)
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject())
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({_id: id})
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values)  

