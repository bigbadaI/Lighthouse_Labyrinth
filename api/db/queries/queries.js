const router = require('api/routes');

const { query } = require("express");

//adds new user, expects input = {id: ..., username: ...}
const newUser = function (user) {
  const input = user.name;
  return router.query(`
    INSERT INTO users(username) 
    VALUES($1)
  `, input)
};

//add player_stats, expects input = {username: name, energy_score: ..., time_elapsed: ... }
const newStats = async function (stats) {
  let playerStatsInsert = null;
  const input = [stats.username, stats.energy_score, stats.time_elapsed];
  try {
    const resolvedUserId = await router.query(`
    SELECT id FROM users
    WHERE username = $1
    `, input);
    const [ user_id ] = resolvedUserId.rows; //if no results error
    playerStatsInsert = await router.query(`
    INSERT INTO player_stats(user_id, energy_score, time_elasped)
    VALUES($1, $3, $4)
    `, [user_id, ...input]);
  }
  catch(err){
    console.error(err);
    //show error
  }
  return playerStatsInsert; //return updated result
};

const highScore = function () {
  return router.query(`
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