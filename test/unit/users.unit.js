//test/unit
const { expect } = require('chai');
const app = require('../../index');
const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const User = require('../../models/user')
chai.use(chaiHttp);

describe('User Routes Unit Tests', () => {
//     describe('GET /users/get', () => {
//     it('1.should not be able to retrieve an entity if not authenticated and return appropriate error code', (done) => {
//         chai.request(app)
//           .get('/users/get')
//           .end((err, res) => {
//             expect(res).to.have.status(401);
//             expect(res.body).to.have.property('error', 'Unauthorized: No token provided');
//             done();
//           });
//       });
// });
    describe('POST /users/login', () => {
      it('2.should return a valid token for a valid user', async () => {
        const user = { username: 'admin', password: '1234' };
        const res = await chai.request(app).post('/users/login').send(user);
        expect(res).to.have.status(200);  //status 200
        expect(res.body).to.have.property('token');
      });
  
      it('3.should return 401 for invalid credentials', async () => {
        const user = { username: 'invalidUser', password: 'invalidPassword' };
        const res = await chai.request(app).post('/users/login').send(user);
        expect(res).to.have.status(401); //status 401
        expect(res.body).to.have.property('error', 'Unauthorized: Invalid credentials');
      });
    });
  
    describe('GET /users/:id', () => {
      it('4.should return my user entity', async () => {
        const res = await chai.request(app).get('/users/1').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwMjk1MjUyNH0.Lhv1YEJsCPZFfcqOlJnqEmZed-y6WEihDs5xGbRXIDg');
        expect(res).to.have.status(200); //status 200
        expect(res.body).to.have.property('id', 1);
      });
  
      it('5.should return 403 for a different user entity', async () => {
        const res = await chai.request(app).get('/users/2').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwMjk1MjUyNH0.Lhv1YEJsCPZFfcqOlJnqEmZed-y6WEihDs5xGbRXIDg');
        expect(res).to.have.status(403); //status 403
        expect(res.body).to.have.property('error', 'Access denied');
      });
      it('6.should return 401 for unauthenticated user', async () => {
        const res = await chai.request(app).get('/users/1');
        expect(res).to.have.status(401); //status 401
        expect(res.body).to.have.property('error', 'Unauthorized: No token provided');
      });
    });
  });
