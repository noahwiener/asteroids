(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  Asteroids.Game = function () {
    this.asteroids = [];
    this.addAsteroids();
  };

  var Game = Asteroids.Game;

  Game.DIM_X = 800;
  Game.DIM_Y = 600;
  Game.NUM_ASTEROIDS = 6;

  Game.prototype.addAsteroids = function () {
    var game = this;
    for(var i = 0; i < Game.NUM_ASTEROIDS; i++){
      var newAsteroid = new Asteroids.Asteroid(
        { pos: game.randomPosition(),
          game: game});
      game.asteroids.push(newAsteroid);
    };
  };

  Game.prototype.randomPosition = function () {
    return [Math.random() * Game.DIM_X, Math.random() * Game.DIM_Y];
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.asteroids.forEach (function (el) {
      el.draw(ctx);
    });
  };

  Game.prototype.moveObject = function () {
    var game = this;
    game.asteroids.forEach ( function (asteroid) {
      asteroid.move();
    });
  };

  Game.prototype.wrap = function (pos) {
    var x = pos[0];
    var y = pos[1];
    if (x < 0){
      x += Game.DIM_X;
    } else if (x > Game.DIM_X){
      x -= Game.DIM_X;
    }
    if (y < 0){
      y += Game.DIM_Y;
    } else if (y > Game.DIM_Y){
      y -= Game.DIM_Y;
    }
    return [x, y];
  };

  Game.prototype.checkCollisions = function () {
    var asteroids = this.asteroids;
    for (var i = 0; i < asteroids.length; i++) {
      for (var j = 0; j < asteroids.length; j++) {
        if (i !== j) {
          asteroids[i].collideWith(asteroids[j]);
        }
      }
    }
  };

  Game.prototype.step = function () {
    this.moveObject();
    this.checkCollisions();
  };

  Game.prototype.remove = function (asteroid) {
    var idx = this.asteroids.indexOf(asteroid);
    if (idx > -1) {
      this.asteroids.splice(idx, 1);
    }
  };
})();
