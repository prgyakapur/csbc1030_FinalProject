//end2end
const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');

chai.use(chaiHttp);

describe('End-to-End Tests for /users API', () => {
  let authToken;
  before(async () => {
    const loginResponse = await chai
      .request(app)
      .post('/users/login')
      .send({ username: 'admin', password: '1234' }); //hardcoded 
    authToken = loginResponse.body.token;  //getting auth token using login to check authentication
  });

  it('1. Should be able to retrieve my user entity', async () => {
    const response = await chai
      .request(app)
      .get('/users/1')
      .set('Authorization', `Bearer ${authToken}`);
    expect(response).to.have.status(200); //status 200
    expect(response.body).to.have.property('id', 1);
  });


  it('2. Should not be able to retrieve a different user entity and return 403', async () => {
    const response = await chai
      .request(app)
      .get('/users/2')
      .set('Authorization', `Bearer ${authToken}`);
    expect(response).to.have.status(403); //status set to 403
    expect(response.body).to.have.property('error', 'Access denied');
  });

  it('3. Should not be able to retrieve an entity if not authenticated and return 401', async () => {
    const response = await chai.request(app).get('/users/1');
    expect(response).to.have.status(401); //status set to 401
    expect(response.body).to.have.property('error', 'Unauthorized: No token provided');
  });
});
