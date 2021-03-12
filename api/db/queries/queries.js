// const db = require('../../lib/db.js'); db => pool

//adds new user, expects input = {id: ..., username: ...}
const newUser = function (user) {
  input = [user.id, user.name];
  return db.query(`
    INSERT INTO users(id,username) 
    VALUES($1,$2)
  `, input)
};

//add player_stats, expects input = {id: ..., user_id: ..., energy_score: ..., time_elapsed: ... }
const newStats = function (stats) {
  input = [stats.id, stats.user_id, stats.energy_score, stats.time_elapsed];
  return db.query(`
    INSERT INTO player_stats(id, user_id, energy_score, time_elasped)
    VALUES($1, $2, $3, $4)
  `, input)
};

//update player_stats, updates energy and time if the scores are higher than previous held
const updateStats = function (stats) {
  const keys = ['id', 'user_id', 'energy_score', 'time_elapsed'];
  const vals = keys.map(key => stats[key]); //undefined if not there
  return db.query(`
    UPDATE player_stats
    SET energy_score = coalesce($3, energy_score)
    time_elapsed = coalesce($4, time_elapsed)
    WHERE user_id = $2
    RETURNING *;
  `, vals)
}