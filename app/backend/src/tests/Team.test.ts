import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { Model } from 'sequelize';
import Team from '../database/models/TeamModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para a rota Teams', function() {  
  afterEach(function() {
    sinon.restore();
  })

  it('Deve retornar um Team com sucesso pelo seu id', async function() {
    // Arrange
    const outputMock: Team = {
      id: 1,
      teamName: 'Avai'
    } as Team;

    //Action
    sinon.stub(Model, 'findByPk').resolves(outputMock)
    const response = await chai.request(app).get('/teams/1')

    //Assertion
    expect(response.body).to.be.deep.equal(outputMock);
  });

  it('Deve retornar todos os Teams com sucesso', async function() {
    // Arrange
    const outputMock: Team[] = [
      {
        "id": 1,
        "teamName": "Avaí/Kindermann"
      },
      {
        "id": 2,
        "teamName": "Bahia"
      },
      {
        "id": 3,
        "teamName": "Botafogo"
      },
      {
        "id": 4,
        "teamName": "Corinthians"
      }] as Team[];

    //Action
    sinon.stub(Model, 'findAll').resolves(outputMock)
    const response = await chai.request(app).get('/teams/')

    //Assertion
    expect(response.body).to.be.deep.equal(outputMock);
  });
});


