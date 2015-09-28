(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  Asteroids.GameView.prototype.start = function () {
    var that = this;
    setInterval(function () {
      that.game.draw(that.ctx);
      that.game.step();
    }, 20);
  };
})();
