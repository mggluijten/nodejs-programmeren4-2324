// test/userController.test.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Assuming your Express app is exported from app.js
const expect = chai.expect;

chai.use(chaiHttp);

describe('User Controller', () => {
    describe('POST /api/user', () => {
        it('should create a new user', (done) => {
            chai.request(app)
                .post('/api/user')
                .send({
                    emailAddress: 'test@example.com',
                    password: 'password123',
                    phoneNumber: '1234567890',
                    firstName: 'John',
                    lastName: 'Doe'
                })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message').that.includes('User registered successfully');
                    done();
                });
        });
    });

    // Add more test cases for other endpoints
});
