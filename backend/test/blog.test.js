//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Blog', () => {
  beforeEach((done) => {
    //Before each test we empty the database in your case
    done();
  });

  /*
   * Test the /GET route
   */
  describe('/GET blog', () => {
    it('it should GET blog', (done) => {
      chai
        .request(server)
        .get('/apis/blog/blog-list')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('blogList');
          done();
        });
    });

    it('it should GET blog html if id not exist', (done) => {
      chai
        .request(server)
        .get('/apis/blog/blog-html')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('id không hợp lệ');
          done();
        });
    });
  });
});
