-- potentially energy_score can be in hundred if each health bar is 100 and then
-- add the remaining points after each level
-- also might leave energy_score and time_elapsed empty and get data from actual game
-- for now the data can be used for making queries
INSERT INTO player_stats (id, user_id, energy_score, time_elapsed) VALUES (100, 10, 113, 5600);
INSERT INTO player_stats (id, user_id, energy_score, time_elapsed) VALUES (200, 20, 200, 3600);
INSERT INTO player_stats (id, user_id, energy_score, time_elapsed) VALUES (300, 30, 50, 7200);