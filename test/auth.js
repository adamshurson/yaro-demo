const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/main');
const User = require('../server/models/user');
const should = chai.should();

chai.use(chaiHttp);

const cleanUp = function (done) {
    User.deleteMany({}, function (err) {
        should.not.exist(err);
        done();
    });
};

// we'll use registration credentials for multiple tests, so making it globally accessible
const registrationCredentials = {
    first_name: 'Adam',
    last_name: 'Shurson',
    username: 'adam.shurson',
    password: 'password123',
    address: '526a W. Surf St. Chicago, IL 60657',
    insurance: 'Blue Cross Blue Shield PPO',
    birth_date: '04/12/1996'
};

// recycled function for checking against correct logins
const goodLogin = function(err, res) {
    res.should.have.status(200);
    should.not.exist(err);
    res.body.success.should.equal(true);
    Object.keys(registrationCredentials).map(regField => {
        // we don't return the password for obvious reasons
        if (regField !== 'password') {
            res.body.userObject[regField].should.exist;
            res.body.userObject[regField].should.equal(registrationCredentials[regField])
        } else {
            // consider it a failure if the backend returns the password salt and hash
            should.not.exist(res.body.userObject.password);
        }
    });
    // now check for token
    res.body.token.should.exist;
};

describe('Users', function () {
    beforeEach(function (done) {
        cleanUp(done);
    });
    afterEach(function (done) {
        cleanUp(done);
    });

    describe('Register', function () {
        it('should not register if any fields are missing', function (done) {
            const missingFields = Object.assign({}, registrationCredentials);
            missingFields.address = null;
            chai.request(server)
                .post('/auth/register')
                .send(missingFields)
                .end(function (err, res) {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.err.should.exist;
                    done();
                });
        });
        it('should return a matching user if registration is correct', function (done) {
            chai.request(server)
                .post('/auth/register')
                .send(registrationCredentials)
                .end(function (err, res) {
                    goodLogin(err, res);
                    done();
                });
        });
    });
    describe('Login', function () {
        it('should not login when the user does not exist', function (done) {
            const fakeCredentials = {
                username: 'fakeUsername',
                password: 'fakePassword'
            };
            chai.request(server)
                .post('/auth/login')
                .send(fakeCredentials)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.err.should.exist;
                    done();
                });
        });
        it('should not login with the incorrect password', function (done) {
            before(function (done) {
                chai.request(server)
                    .post('/auth/register')
                    .send(registrationCredentials)
                    .end(function (err, res) {
                        res.should.have.status(200);
                        should.not.exist(err);
                        done();
                    });
            });
            const badCredentials = {
                username: 'adam.shurson',
                password: 'fakePassword'
            };
            chai.request(server)
                .post('/auth/login')
                .send(badCredentials)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.err.should.exist;
                    done();
                });
        });
        it('should return the user and jwt with correct credentials', function (done) {
            // this is the function we will run after the setup
            const postLoad = function (done) {
                const goodCredentials = {
                    username: 'adam.shurson',
                    password: 'password123'
                };
                chai.request(server)
                    .post('/auth/login')
                    .send(goodCredentials)
                    .end(function (err, res) {
                        goodLogin(err, res);
                        done();
                    });
                };
                // before we test the correct output, we need a user
                chai.request(server)
                    .post('/auth/register')
                    .send(registrationCredentials)
                    .end(function (err, res) {
                        res.should.have.status(200);
                        should.not.exist(err);
                        postLoad(done);
                    });
            }
        );
    });
});