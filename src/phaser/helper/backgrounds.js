const parallaxBackground = function(level, BG) {
  const width = level.scale.width;
  const height = level.scale.height;
  level.add
    .image(0, height + 75, BG)
    .setOrigin(0, 1)
    .setScrollFactor(0.25);
  level.add
    .image(width, height + 75, BG)
    .setOrigin(0, 1)
    .setScrollFactor(0.25);
  level.add
    .image(0, height + height, BG)
    .setOrigin(0, 1)
    .setScrollFactor(0.25);
  level.add
    .image(width, height + height, BG)
    .setOrigin(0, 1)
    .setScrollFactor(0.25);
};
exports.module = {
  parallaxBackground,
};
