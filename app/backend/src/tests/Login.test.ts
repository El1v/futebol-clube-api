import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { Model } from 'sequelize';
import User from '../database/models/UserModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para a rota Login', function() {  
  afterEach(function() {
    sinon.restore();
  })

  it('Deve retornar um token com sucesso baseado no seu email', async function() {
    // Arrange
    const outputMock: User = {
      id: 1,
      username: "Admin",
      role: "admin",
      email: "admin@admin.com",
      password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
    } as User;

    const inputMock = {
      email: 'admin@admin.com',
      password: 'secret_admin'
    }

    const token:string = "eyJhbGciOiJIUzI1NiJ9.YWRtaW5AYWRtaW4uY29t.s1U6I8B6x_9eLeJyb9PdjTz1JbNXo57xor-T1493RW0";
    //Action
    sinon.stub(Model, 'findOne').resolves(outputMock)
    const response = await chai.request(app).post('/login').send(inputMock);

    //Assertion
    expect(response.body).to.be.deep.equal({ token });
  });
  it('Deve retornar erro quando não existir email', async function() {
        // Arrange    
        const inputMock = {
          email: 'admin@admin.com'
        }
    
        const message:string = "All fields must be filled";
        //Action
        sinon.stub(Model, 'findOne').resolves(null)
        const response = await chai.request(app).post('/login').send(inputMock);
    
        //Assertion
        expect(response.body).to.be.deep.equal({ message });
  })
  it('Deve retornar erro quando não existir password', async function() {
    // Arrange    
    const inputMock = {
      password: 'secret_admin'
    }

    const message:string = "All fields must be filled";
    //Action
    sinon.stub(Model, 'findOne').resolves(null)
    const response = await chai.request(app).post('/login').send(inputMock);

    //Assertion
    expect(response.body).to.be.deep.equal({ message });
})
  it('Deve retornar erro quando existir email mas ele for invalido', async function() {
  // Arrange    
  const inputMock = {
    email: 'admin@admin.com',
    password: 'secret_admin'
  }

  const message:string = "Invalid email or password";
  //Action
  sinon.stub(Model, 'findOne').resolves(null)
  const response = await chai.request(app).post('/login').send(inputMock);

  //Assertion
  expect(response.body).to.be.deep.equal({ message });
  expect(response.status).to.be.equal(401);

  })
  it('Deve retornar erro quando existir password mas ela for invalida', async function() {
    // Arrange    
    const inputMock = {
      email: 'admin@admin.com',
      password: 'secre'
    }
  
    const message:string = "Invalid email or password";
    //Action
    sinon.stub(Model, 'findOne').resolves(null)
    const response = await chai.request(app).post('/login').send(inputMock);
  
    //Assertion
    expect(response.body).to.be.deep.equal({ message });
    expect(response.status).to.be.equal(401);
  })
});

describe('Testes para a rota de Login/role', function() {
  afterEach(function() {
    sinon.restore();
  })

  it('Deve retornar a Role quando for passado um token valido', async function() {
    const token =  "eyJhbGciOiJIUzI1NiJ9.YWRtaW5AYWRtaW4uY29t.s1U6I8B6x_9eLeJyb9PdjTz1JbNXo57xor-T1493RW0";
  
    const role = "admin";
      const response = await chai.request(app).get('/login/role').send({
        email: "admin@admin.com",
        password: "secret_admin"
      }).set('authorization', token)

    expect(response.body).to.be.deep.equal({ role });

  })

  it('Deve retornar Token not found quando não for passado um token', async function() {
      const message = "Token not found";
      const response = await chai.request(app).get('/login/role').send({
        email: "admin@admin.com",
        password: "secret_admin"
      });

    expect(response.body).to.be.deep.equal({ message });
  })

  it('Deve retornar Token must be a valid token quando for passado um token invalido', async function() {
    const token =  "eyJhbGciOiJIUzI1NiJ9.YWRtaW5AYWRtaW4uY29t.s1U6I8B6x_9eLeJyb9PdjTz1JbNXo57xor-T1493RW";

    const message = "Token must be a valid token";
    const response = await chai.request(app).get('/login/role').send({
      email: "admin@admin.com",
      password: "secret_admin"
    }).set('authorization', token)

  expect(response.body).to.be.deep.equal({ message });
})
})

