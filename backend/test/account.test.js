//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Account', () => {
  beforeEach((done) => {
    //Before each test we empty the database in your case
    done();
  });

  /*
   * Test the /POST route
   */
  describe('/POST login', () => {
    it('it should POST a login success', (done) => {
      let user = {
        email: 'skyahq13@gmail.com',
        password: 'hoanganh',
      };
      chai
        .request(server)
        .post('/apis/account/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('token');
          res.body.should.have.property('message').eql('success');
          done();
        });
    });
    it('it should not POST when email is incorrect', (done) => {
      let userEmailIncorrect = {
        email: 'skyahq131@gmail.com',
        password: 'hoanganh',
      };
      chai
        .request(server)
        .post('/apis/account/login')
        .send(userEmailIncorrect)
        .end((err, res) => {
          res.should.have.status(406);
          res.body.should.be.a('object');
          res.body.should.have
            .property('message')
            .eql('Tài khoản không tồn tại');
          done();
        });
    });
    it('it should not POST when password is incorrect', (done) => {
      let userPasswordIncorrect = {
        email: 'skyahq13@gmail.com',
        password: 'hoanganh1',
      };
      chai
        .request(server)
        .post('/apis/account/login')
        .send(userPasswordIncorrect)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Mật khẩu không đúng');
          done();
        });
    });
  });

  // /*
  //  * Test the /GET/:id route
  //  */
  // describe('/GET/:id pets', () => {
  //   it('it should GET a pet by the given id', (done) => {
  //     // TODO add a model to db then get that id to take this test
  //     let id = 1;
  //     chai
  //       .request(server)
  //       .get('/pets/' + id)
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.be.a('object');
  //         res.body.should.have.property('pet');
  //         res.body.pet.should.have.property('id').eql(id);
  //         res.body.pet.should.have.property('name');
  //         res.body.pet.should.have.property('status');
  //         done();
  //       });
  //   });
  // });

  // /*
  //  * Test the /PUT/:id route
  //  */
  // describe('/PUT/:id pets', () => {
  //   it('it should UPDATE a pet given the id', (done) => {
  //     // TODO add a model to db then get that id to take this test
  //     let id = 1;
  //     chai
  //       .request(server)
  //       .put('/pets/' + id)
  //       .send({
  //         name: 'Bug',
  //         status: 'fixed',
  //       })
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.be.a('object');
  //         res.body.should.have.property('pet');
  //         res.body.pet.should.have.property('name').eql('Bug');
  //         res.body.pet.should.have.property('status').eql('fixed');
  //         done();
  //       });
  //   });
  // });

  // /*
  //  * Test the /DELETE/:id route
  //  */
  // describe('/DELETE/:id pets', () => {
  //   it('it should DELETE a pet given the id', (done) => {
  //     // TODO add a model to db then get that id to take this test
  //     let id = 1;
  //     chai
  //       .request(server)
  //       .delete('/pets/' + id)
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.be.a('object');
  //         res.body.should.have
  //           .property('message')
  //           .eql('Pet successfully deleted!');
  //         res.body.should.have.property('result');
  //         res.body.result.should.have.property('roweffected').eql(1);
  //         done();
  //       });
  //   });
  // });
});
