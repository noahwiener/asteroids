(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  Asteroids.Game = function () {
    this.asteroids = [];
    this.addAsteroids();
    this.bullets = [];
    this.ship = new Asteroids.Ship({
      game: this,
      pos: this.randomPosition()
     });
  };

  var Game = Asteroids.Game;

  Game.DIM_X = 800;
  Game.DIM_Y = 600;
  Game.NUM_ASTEROIDS = 6;

  Game.prototype.allObjects = function () {
    var objects = this.asteroids.slice();
    objects.push(this.ship);
    return objects.concat(this.bullets);
  };

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
    this.allObjects().forEach (function (el) {
      el.draw(ctx);
    });
  };

  Game.prototype.moveObject = function () {
    var game = this;
    game.allObjects().forEach ( function (obj) {
      obj.move();
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
    var allObjects = this.allObjects();
    for (var i = 0; i < allObjects.length; i++) {
      for (var j = 0; j < allObjects.length; j++) {
        if (i !== j) {
          allObjects[i].collideWith(allObjects[j]); //isCollidedWith ?
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
