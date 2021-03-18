// const db = require('../../lib/db.js'); db => pool

const { query } = require("express");

//adds new user, expects input = {id: ..., username: ...}
const newUser = function (user) {
  input = user.name;
  return db.query(`
    INSERT INTO users(id,username) 
    VALUES($1)
  `, input)
};

//add player_stats, expects input = {username: name, energy_score: ..., time_elapsed: ... }
const newStats = function (stats) {
  input = [stats.username, stats.energy_score, stats.time_elapsed];
  return db.query(`
    with grabUserId as (
      SELECT id FROM users
      WHERE username = $1
    )
    INSERT INTO player_stats(user_id, energy_score, time_elasped)
    VALUES(grabUserId, $2, $3)
  `, input)
};

const highScore = function () {
  return db.query(`
  SELECT player_stats.energy_score, player_stats.time_elapsed, users.username
  FROM player_stats
  JOIN users ON user_id = users.id
  ORDER BY energy_score DESC
  LIMIT 5
  `)
}

// //update player_stats, updates energy and time if the scores are higher than previous held
// const updateStats = function (stats) {
//   const keys = ['id', 'user_id', 'energy_score', 'time_elapsed'];
//   const vals = keys.map(key => stats[key]); //undefined if not there
//   return db.query(`
//     UPDATE player_stats
//     SET energy_score = coalesce($3, energy_score)
//     time_elapsed = coalesce($4, time_elapsed)
//     WHERE user_id = $2
//     RETURNING *;
//   `, vals)
// }