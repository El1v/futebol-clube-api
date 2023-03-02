import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { Model } from 'sequelize';
import Match from '../database/models/MatchModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para a rota Matches', function() {  
  afterEach(function() {
    sinon.restore();
  });

  // it('Deve retornar a lista com os Matches', async function() {
  //   // Arrange
  //   // const outputMock = 
  //   //   [
  //   //     {
  //   //       "id": 1,
  //   //       "homeTeamGoals": 1,
  //   //       "awayTeamGoals": 1,
  //   //       "inProgress": false,
  //   //       "homeTeamId": 16,
  //   //       "awayTeamId": 8,
  //   //       "homeTeam": {
  //   //         "teamName": "São Paulo"
  //   //       },
  //   //       "awayTeam": {
  //   //         "teamName": "Grêmio"
  //   //       }
  //   //     },
  //   //     {
  //   //       "id": 2,
  //   //       "homeTeamGoals": 1,
  //   //       "awayTeamGoals": 1,
  //   //       "inProgress": false,
  //   //       "homeTeamId": 9,
  //   //       "awayTeamId": 14,
  //   //       "homeTeam": {
  //   //         "teamName": "Internacional"
  //   //       },
  //   //       "awayTeam": {
  //   //         "teamName": "Santos"
  //   //       }
  //   //     }] as Match[];

  //   const token:string = "eyJhbGciOiJIUzI1NiJ9.YWRtaW5AYWRtaW4uY29t.s1U6I8B6x_9eLeJyb9PdjTz1JbNXo57xor-T1493RW0";
  //   //Action
  //   sinon.stub(Model, 'findAll').resolves(outputMock)
  //   const response = await chai.request(app).get('/matches').send(token);

  //   //Assertion
  //   expect(response.body).to.be.deep.equal({ outputMock });
  // });
});
