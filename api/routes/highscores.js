const { request } = require("express");
const express = require("express");
const router = express.Router();
const highScores = {};




const users = {
  1: {
    username: "Ho7Sho7",
    energy_score: 225,
    time_elasped: 120
  },
  2: {
    username: "BIGboy",
    energy_score: 333,
    time_elasped: 150
  },
  3: {
    username: "Uwin",
    energy_score: 500,
    time_elasped: 250
  },
  4: {
    username: "LabRUNER",
    energy_score: 400,
    time_elasped: 90
  },
}


// request.post({
//   url: 'url',
//   data: {},
//   headers: {}
// });

module.exports = (db) => {
  router.post("/", (request, response) => {
    console.log("post request", request.body, response)
    const { score, name, time } = request.body
    newUser(name)
    newStats(score, name, time)
  //   db.query(
  //     `
  //     INSERT INTO users(username) 
  //     VALUES($1)
  //     `,
  //     [name]
  //   )
  //   .then(
  //     db.query(
  //       `
        
  //       `
  //     )
  //   )
  //     .catch(error => console.log(error));
  // });

  //add player_stats, expects input = {username: name, energy_score: ..., time_elapsed: ... }
  const newUser = async function (name) {
    try {
      const addUser = await db.query(
        `
        INSERT INTO users(username) 
        VALUES($1)
        `
        , name)
      
    }
    catch(err){
      console.error(err);
    }
  }
  const newStats = async function (score, name, time) {
    let playerStatsInsert = null;
    
    try {
      const resolvedUserId = await router.query(`
      SELECT id FROM users
      WHERE username = $1
      `, name);
      const [ user_id ] = resolvedUserId.rows; //if no results error
      playerStatsInsert = await router.query(`
      INSERT INTO player_stats(user_id, energy_score, time_elasped)
      VALUES($1, $3, $4)
      `, [user_id, score, time]);
    }
    catch(err){
      console.error(err);
      //show error
    }
    return playerStatsInsert; //return updated result
  };
  })
  
  router.get("/", (req, res, next) => {
    //res.send(users);
    db.query(`
    SELECT player_stats.energy_score, player_stats.time_elapsed, users.username
    FROM player_stats
    JOIN users ON user_id = users.id
    ORDER BY energy_score DESC
    LIMIT 5
    `)
    .then(data => {
      console.log(data.rows)
      res.json(data.rows);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });
  return router

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
}
//module.exports = router