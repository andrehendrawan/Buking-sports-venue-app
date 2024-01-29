const request = require('supertest')
const app = require('../app')
const { Product, User, Category } = require('../models/index');
const { signToken } = require('../helpers/jwt')

let access_token;

beforeAll(async () => {
    let user1 = await User.create({
        fullName: "kaka",
        email: "kaka@gmail.com",
        password: "12345",
        phoneNumber: "08120484",
    })
    access_token = signToken(user1)
})


test('GET / should return message THIS IS HOME', async () => {
    const response = await request(app).get('/')

    expect(response.status).toBe(200)
})

describe('POST /login', () => {
    test('should able to login successfully', async () => {
        let dataBody = {
            email: "kaka@gmail.com",
            password: "12345"
        }
        const response = await request(app)
            .post('/login')
            .send(dataBody)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('access_token', expect.any(String))
        expect(response.body).toHaveProperty('email', dataBody.email)
    })
    test('should not be able to log in without email', async () => {
        let dataBody = {
            password: "12345"
        }
        const response = await request(app)
            .post('/login')
            .send(dataBody)
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message', "Email is required")
    })
    test('should not be able to log in without password', async () => {
        let dataBody = {
            email: "kaka@gmail.com"
        }
        const response = await request(app)
            .post('/login')
            .send(dataBody)
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message', "Password is required")
    })
})

describe('POST /register', () => {
    test('should able to regiter', async () => {
        const newUser = {
            fullName: "kaka",
            email: "kaka@gmail.com",
            password: "12345",
            phoneNumber: "08120484"
        }
        const response = await request(app)
            .post('/register')
            .send(newUser, access_token)
            .set('Authorization', `Bearer ${access_token}`)

        expect(response.status).toBe(201)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('id', expect.any(Number))
        expect(response.body).toHaveProperty('email', newUser.email)
        expect(response.body).toHaveProperty('fullName', newUser.fullName)
        expect(response.body).toHaveProperty('phoneNumber', newUser.phoneNumber)
    })
    test('should not be able to register without email', async () => {
        const newUser = {
            username: "user",
            password: "12345",
            role: "Admin",
            phoneNumber: "55558888",
            address: "Kampung Melayu Scofield Hill"
        }
        const response = await request(app)
            .post('/users')
            .send(newUser, access_token)
            .set('Authorization', `Bearer ${access_token}`)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Email is required')
    })
    test('should not be able to register without password', async () => {
        const newUser = {
            username: "user",
            email: "user@mail.com",
            role: "Admin",
            phoneNumber: "55558888",
            address: "Kampung Melayu Scofield Hill"
        }
        const response = await request(app)
            .post('/users')
            .send(newUser, access_token)
            .set('Authorization', `Bearer ${access_token}`)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Password is required')
    })
    test('should not be able to register with existing email', async () => {
        const newUser = {
            username: "user",
            email: "kaka@gmail.com",
            password: "12345",
            role: "Admin",
            phoneNumber: "55558888",
            address: "Kampung Melayu Scofield Hill"
        }
        const response = await request(app)
            .post('/users')
            .send(newUser, access_token)
            .set('Authorization', `Bearer ${access_token}`)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'This Email is already exist')
    })
    test('should not be able to register without email format', async () => {
        const newUser = {
            username: "user",
            email: "kaka",
            password: "12345",
            role: "Admin",
            phoneNumber: "55558888",
            address: "Kampung Melayu Scofield Hill"
        }
        const response = await request(app)
            .post('/users')
            .send(newUser, access_token)
            .set('Authorization', `Bearer ${access_token}`)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Email form should be an E-mail')
    })
    test('should not be able to register without token', async () => {
        const newUser = {
            username: "user",
            email: "kaka",
            role: "Admin",
            phoneNumber: "55558888",
            address: "Kampung Melayu Scofield Hill"
        }
        const response = await request(app)
            .post('/users')
            .send(newUser)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Invalid Token')
    })
    test('should not be able to register with random string token', async () => {
        const newUser = {
            username: "user",
            email: "kaka",
            role: "Admin",
            phoneNumber: "55558888",
            address: "Kampung Melayu Scofield Hill"
        }
        const response = await request(app)
            .post('/users')
            .send(newUser, `acbcsda`)
            .set('Authorization', `Bearer acbcsda`)


        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Invalid Token')
    })
})


afterAll(async () => {
    await User.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true
    })
})