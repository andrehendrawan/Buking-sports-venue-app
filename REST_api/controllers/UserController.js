const express = require('express')
const { User } = require('../models/index');
const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { OAuth2Client } = require('google-auth-library');


class UserController {
    static async register(req, res, next) {
        try {
            const user = await User.create(req.body)
            console.log(user);

            res.status(201).json({
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                phoneNumber: user.phoneNumber
            })
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email) {
                throw { name: 'EmailIsRequired' }
            }
            if (!password) {
                throw { name: 'PasswordIsRequired' }
            }

            const user = await User.findOne({
                where: { email: email }
            })
            if (!user) {
                throw { name: 'UserNotExist' }
            }

            const verifyPassword = comparePassword(password, user.password)
            if (!verifyPassword) {
                throw { name: 'PasswordInvalid' }
            }
            const access_token = signToken(user)
            res.status(200).json({
                access_token, email: user.email, id: user.id
            })
        } catch (error) {
            next(error)
        }
    }

    static async googleLogin(req, res, next) {
        const token = req.headers['google-token']
        const client = new OAuth2Client();
        try {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const payload = ticket.getPayload();
            const email = payload.email;
            console.log(payload);


            let user = await User.findOne({
                where: { email }
            })
            if (!user) {
                user = await User.create({
                    fullName: payload.name,
                    email,
                    password: 'dummy-password-' + Date.now(),
                    phoneNumber: '08888888'
                }, {
                    hooks: false
                })
            }

            const access_token = signToken({ id: user.id })
            res.status(200).json({ access_token, id: user.id, email: user.email })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController