import { BOOLEAN, INTEGER, Model } from 'sequelize';
import db from '.';
import Team from './TeamModel';
// import OtherModel from './OtherModel';

class Match extends Model {
  declare readonly id: number;
  declare homeTeamGoals: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
  declare homeTeamId: number;
  declare awayTeamId: number;
}

Match.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeamGoals: {
    allowNull: false,
    type: INTEGER,
    field: 'home_team_goals',
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
    field: 'away_team_goals',
  },
  inProgress: {
    allowNull: false,
    type: BOOLEAN,
    field: 'in_progress',
  },
  homeTeamId: {
    allowNull: false,
    type: INTEGER,
    field: 'home_team_id',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamId: {
    allowNull: false,
    type: INTEGER,
    field: 'away_team_id',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Match.belongsTo(Team, { foreignKey: 'home_team_id', as: 'homeTeam' });
Match.belongsTo(Team, { foreignKey: 'away_team_id', as: 'awayTeam' });

export default Match;
