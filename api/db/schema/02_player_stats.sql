DROP TABLE IF EXISTS player_stats CASCADE;
CREATE TABLE player_stats (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  energy_score INT,
  time_elapsed DECIMAL
);