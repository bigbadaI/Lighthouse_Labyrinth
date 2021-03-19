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


  router.put("/", (request, response) => {
    const {  } = request.body.interview;

    db.query(
      `
      //query to db to save the user
      //query to save the user's score/time to db
    `,
      []
    )
      .catch(error => console.log(error));
  });

  router.get("/", function(req, res, next) {
    res.send(users);
});
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

module.exports = router