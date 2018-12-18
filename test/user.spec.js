const chai = require('chai');
var chaiHttp = require('chai-http');
const server1 = require('../app');
const services = require('../services/user.service');
const should = chai.should();
// const assert = chai.assert();
chai.use(chaiHttp);

describe("users functionality", function() {
    it("get api should get all results", function (done) {
        chai.request(server1)
            .get('/users/getAll')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.have.property('statusCode');
                res.should.have.property('info');
                res.body.employees.should.be.a('array');
                res.body.employees[0].should.have.property('userId');
                res.body.employees[0].firstName.should.be.a('string');
                res.body.employees[0].userId.should.be.eql(1);
                done();
            });
    });
    it("get api should get all results", function (done) {
        chai.request(server1)
            .get('/users/getA')
            .end(function (err, res) {
                if(err)
                {
                    console.log(err);
                    err.should.have.property('Status');
                
                }
                res.body.status.should.be.eql(404);
                res.body.should.have.property('Info');
                res.body.Info.should.be.a('string');
                res.body.Info.should.be.eql("Route Not Found");
                done();
            });
    });
});
