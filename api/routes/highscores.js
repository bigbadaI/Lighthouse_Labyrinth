const { request } = require("express");
const express = require("express");
const router = express.Router();
const highScores = {};


module.exports = (db) => {
  router.put("/", (request, response) => {
    console.log("======post request=======", request.body.name, request.body);
    const { name, score, time } = request.body;
    console.log(score, name, time);
    // newUser(name);

    console.log("==========");

    db.query(
      `
        INSERT INTO users(username) 
        VALUES($1)
        `,
      [name]
    )
      .then(() => {
        let resolvedUserId = db.query(
          `
      SELECT id FROM users
      WHERE username = ($1)
      ORDER BY id DESC
      LIMIT 1
      `,
          [name]);
        return resolvedUserId;
      }).then((resolvedUserId) => {
        console.log(resolvedUserId.rows);
        let [user_id] = resolvedUserId.rows; //if no results error
        console.log(user_id.id, user_id)
        db.query(
          `
      INSERT INTO player_stats(user_id, energy_score, time_elapsed)
      VALUES($1, $2, $3)
      `,
          [user_id.id, score, time]
        );
      })
      .catch((err) => {
        response.status(500).json({ error: err.message });
        console.log("=======HERE++++++ ERROR");
        console.error(err);
      });
  });

  //add player_stats, expects input = {username: name, energy_score: ..., time_elapsed: ... }
  // const newUser = async function (name) {
  //   console.log("==========");
  //   try {
  //     const addUser = await db.query(
  //       `
  //     INSERT INTO users(username)
  //     VALUES($1)
  //     `,
  //       [name]
  //     );
  //   } catch (err) {
  //     console.log("=======HERE++++++ ERROR");
  //     console.error(err);
  //   }
  // };
  // const newStats = async function (score, name, time) {
  //   let playerStatsInsert = null;

  // try {
  //   const resolvedUserId = await router.query(`
  //   SELECT id FROM users
  //   WHERE username = ${name}
  //   `);
  //   const [ user_id ] = resolvedUserId.rows; //if no results error
  //   playerStatsInsert = await router.query(`
  //   INSERT INTO player_stats(user_id, energy_score, time_elasped)
  //   VALUES($1, $3, $4)
  //   `, [user_id, score, time]);
  // }
  //   catch(err){
  //     console.error(err);
  //     //show error
  //   }
  // return playerStatsInsert; //return updated result

  // });

  router.get("/", (req, res, next) => {
    //res.send(users);
    db.query(
      `
    SELECT player_stats.energy_score, player_stats.time_elapsed, users.username
    FROM player_stats
    JOIN users ON user_id = users.id
    ORDER BY energy_score DESC
    LIMIT 5
    `
    )
      .then((data) => {
        console.log(data.rows);
        res.json(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;

  // router.get("/", (request, response, next) => {
  //   response.send(users)
  // db.query(
  //   `
  //   SELECT player_stats.energy_score, player_stats.time_elapsed, users.username
  // FROM player_stats
  // JOIN users ON user_id = users.id
  // ORDER BY energy_score DESC
  // LIMIT 5
  // `
  // )
  // .then((response) => {
  //   setTimeout(() => highScores = response.status(500).json({}), 1000);
  // })
  // .catch(error => console.log(error));
  // });
};
//module.exports = router
