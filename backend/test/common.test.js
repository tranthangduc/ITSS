//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Common', () => {
  beforeEach((done) => {
    //Before each test we empty the database in your case
    done();
  });

  /*
   * Test the /GET route
   */
  describe('/GET common', () => {
    it('it should GET common', (done) => {
      let packInfo = 1;
      chai
        .request(server)
        .get('/apis/common/word-pack/total' + '?packInfo=' + packInfo)
        .end((err, res) => {
          res.should.have.status(503);
          res.body.should.be.a('object');
          res.body.should.be
            .property('message')
            .eql('Lỗi dịch vụ, thử lại sau');
          done();
        });
    });
  });
});
