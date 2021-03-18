const { request } = require("express");
const express = require("express");
const router = express.Router();


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
router.get("/", function(req, res, next) {
  res.send(users);
});

router.put("/:id", (req, res) => {
  console.log(req);
  users[req.params.id] = req;
});

module.exports = router;