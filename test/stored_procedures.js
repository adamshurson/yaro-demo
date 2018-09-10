const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/main');
const StoredProcedure = require('../server/models/stored_procedure');
const should = chai.should();

chai.use(chaiHttp);

const cleanUp = function(done) {
    StoredProcedure.deleteMany({}, function(err) {
        should.not.exist(err);
        done();
    });
};

describe('Stored Procedures', function() {
    beforeEach(function(done) {
        cleanUp(done);
    });
    afterEach(function(done) {
        cleanUp(done);
    });
    it('should list all stored procedures on /GET', function(done) {
        chai.request(server)
            .get('/stored_procedures/get')
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.success.should.be.a('boolean');
                res.body.success.should.be.equal(true);
                res.body.procedures.should.be.a('array');
                done();
            });
    });
    it('should reject a create request with missing parameters', function(done) {
        const badRequest = {
            name: 'Test Procedure',
            description: 'This is a test procedure'
            // default_cost: 50.00 -- missing this param, so it is a bad request
        };
        chai.request(server)
            .post('/stored_procedures/create')
            .send(badRequest)
            .end(function(err, res) {
                res.should.have.status(400);
                res.body.success.should.be.equal(false);
                done();
            });
    });
    it('should return the procedure if the request is correct', function(done) {
        const goodRequest = {
            name: 'Test Procedure',
            description: 'This is a test procedure',
            default_cost: 50.00
        };
        chai.request(server)
            .post('/stored_procedures/create')
            .send(goodRequest)
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.success.should.be.equal(true);
                res.body.procedure.should.be.a('object');
                res.body.procedure.name.should.equal(goodRequest.name);
                res.body.procedure.description.should.equal(goodRequest.description);
                res.body.procedure.default_cost.should.equal(goodRequest.default_cost);
                done();
            });
    });
});