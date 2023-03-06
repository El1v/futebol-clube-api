import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { Model } from 'sequelize';
import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';
import { leaderboardMockHome } from './Mocks/LeaderboardHome';
import { teamListMock } from './Mocks/TeamListMock';
import { matchListMock } from './Mocks/MatchListMock';
import { leaderboardMockAway } from './Mocks/LeaderboardAway';
import { leaderboardMock } from './Mocks/Leaderboard';

chai.use(chaiHttp);

const { expect } = chai;




describe('Testes para a rota Leaderboard/home', function() {  
  afterEach(function() {
    sinon.restore();
  })

  it('Deve retornar a classificação das equipes ordenadas', async function() {
    sinon.stub(Team, 'findAll').resolves(teamListMock as Team[]);
    sinon.stub(Match, 'findAll').resolves(matchListMock as unknown as Match[]);

    const response = await chai.request(app).get('/leaderboard/home')

    expect(response.status).to.be.eq(200); 
    expect(response.body).to.be.deep.eq(leaderboardMockHome);
  });
});

describe('Testes para a rota Leaderboard/away', function() {  
  afterEach(function() {
    sinon.restore();
  })

  it('Deve retornar a classificação das equipes ordenadas', async function() {
    sinon.stub(Team, 'findAll').resolves(teamListMock as Team[]);
    sinon.stub(Match, 'findAll').resolves(matchListMock as unknown as Match[]);

    const response = await chai.request(app).get('/leaderboard/away')

    expect(response.status).to.be.eq(200); 
    expect(response.body).to.be.deep.eq(leaderboardMockAway);
  });
});

describe('Testes para a rota Leaderboard', function() {  
  afterEach(function() {
    sinon.restore();
  })

  it('Deve retornar a classificação das equipes ordenadas', async function() {
    sinon.stub(Team, 'findAll').resolves(teamListMock as Team[]);
    sinon.stub(Match, 'findAll').resolves(matchListMock as unknown as Match[]);

    const response = await chai.request(app).get('/leaderboard')

    expect(response.status).to.be.eq(200); 
    expect(response.body).to.be.deep.eq(leaderboardMock);
  });
});