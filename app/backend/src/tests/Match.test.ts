import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { Model } from 'sequelize';
import Match from '../database/models/MatchModel';
import IMatch from '../api/interfaces/IMatch';

chai.use(chaiHttp);

const { expect } = chai;

const mockfindAll = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: "São Paulo"
    },
    awayTeam: {
      teamName: "Grêmio"
    }
  },
  {
    id: 41,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: "São Paulo"
    },
    awayTeam: {
      teamName: "Internacional"
    }
  }
]

const mockFindInProgressFalse = [
    {
      "id": 1,
      "homeTeamGoals": 1,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeamId": 16,
      "awayTeamId": 8,
      "homeTeam": {
        "teamName": "São Paulo"
      },
      "awayTeam": {
        "teamName": "Grêmio"
      }
    },
    {
      "id": 2,
      "homeTeamGoals": 1,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeamId": 9,
      "awayTeamId": 14,
      "homeTeam": {
        "teamName": "Internacional"
      },
      "awayTeam": {
        "teamName": "Santos"
      }
    }
]

const mockFindInProgressTrue = [
	{
		"id": 41,
		"homeTeamGoals": 2,
		"awayTeamGoals": 0,
		"inProgress": true,
		"homeTeamId": 16,
		"awayTeamId": 9,
		"homeTeam": {
			"teamName": "São Paulo"
		},
		"awayTeam": {
			"teamName": "Internacional"
		}
	},
	{
		"id": 42,
		"homeTeamGoals": 1,
		"awayTeamGoals": 0,
		"inProgress": true,
		"homeTeamId": 6,
		"awayTeamId": 1,
		"homeTeam": {
			"teamName": "Ferroviária"
		},
		"awayTeam": {
			"teamName": "Avaí/Kindermann"
		}
	}
]

describe('Testes para a rota Matches', function() {  
  afterEach(function() {
    sinon.restore();
  });

  it('Deve retornar a lista com os Matches', async function() {
    const token =  "eyJhbGciOiJIUzI1NiJ9.YWRtaW5AYWRtaW4uY29t.s1U6I8B6x_9eLeJyb9PdjTz1JbNXo57xor-T1493RW0";
    sinon.stub(Model, 'findAll').resolves(mockfindAll as unknown as Match[]);

    const response = await chai.request(app).get('/matches').set('authorization', token);
    expect(response.body).to.be.deep.equal( mockfindAll );
    expect(response.status).to.be.equal(200);

  });

  it('Deve retornar a lista com os Matches que não foram finalizados', async function() {
    const token =  "eyJhbGciOiJIUzI1NiJ9.YWRtaW5AYWRtaW4uY29t.s1U6I8B6x_9eLeJyb9PdjTz1JbNXo57xor-T1493RW0";
    sinon.stub(Model, 'findAll').resolves(mockFindInProgressFalse as unknown as Match[]);

    const response = await chai.request(app).get('/matches?inProgress=false').set('authorization', token);
    expect(response.body).to.be.deep.equal( mockFindInProgressFalse );
    expect(response.status).to.be.equal(200);

  });

  it('Teste se é possivel finalizar uma partida', async function() {
    const token =  "eyJhbGciOiJIUzI1NiJ9.YWRtaW5AYWRtaW4uY29t.s1U6I8B6x_9eLeJyb9PdjTz1JbNXo57xor-T1493RW0";
    const message = 'Finished';
    sinon.stub(Model, 'update').resolves([0]);
  
    const response = await chai.request(app)
    .patch('/matches/1/finish')
    .set('authorization', token);

    expect(response.status).to.be.eq(200);
    expect(response.body).to.deep.eq({ message });
  });

  it('Testa se é possivel atualizar uma partida em andamento', async () => {
        const token =  "eyJhbGciOiJIUzI1NiJ9.YWRtaW5AYWRtaW4uY29t.s1U6I8B6x_9eLeJyb9PdjTz1JbNXo57xor-T1493RW0";
    const message = 'Match updated id: 1';
    sinon.stub(Model, 'update').resolves([0]);

    const response = await chai.request(app)
    .patch('/matches/1').send({
      homeTeamGoals: 3,
      awayTeamGoals: 7
    }).set('authorization', token);

    expect(response.status).to.be.eq(200);
    expect(response.body).to.deep.eq({ message });
  });

});
