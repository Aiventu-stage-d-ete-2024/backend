import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const { Schema, model } = mongoose;

const usersSchema = new Schema({
    Username: { type: String, required: true, unique: true },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
});

usersSchema.methods.generateAuthToken = function () {
    try {
        const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Generated auth token:', token);
        return token;
    } catch (error) {
        console.error('Error generating auth token:', error);
        throw new Error('Unable to generate auth token');
    }
};

usersSchema.pre('save', async function (next) {
    if (!this.isModified('Password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password, salt);
    next();
});

usersSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.Password);
};

export default model('Users', usersSchema);
