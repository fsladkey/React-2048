var TwentyFortyPlayer = window.TwentyFortyPlayer = window.TwentyFortyPlayer || {};

TwentyFortyPlayer = function(board) {
  this.board = board;
};

TwentyFortyPlayer.prototype.play = function() {
  var timer = setInterval(function(){
    this.move();
    if (this.board.over()) {
      clearInterval(timer);
      console.log("clear timer");
    }
  }.bind(this), 500);
};

TwentyFortyPlayer.prototype.findMoveScore = function(direction) {
  var testBoard = this.board.dup();
  testBoard.moveInDirection(direction);
  return testBoard.numActiveTiles();
};

TwentyFortyPlayer.prototype.collectMoveRatings = function() {
  var directions = ["left", "up", "right", "down"];
  var moveScores = [];
  directions.forEach(function(direction) {
    moveScores.push({
      direction: direction,
      score: this.findMoveScore(direction)
    });
  }, this);
  return moveScores;
};

TwentyFortyPlayer.prototype.selectBestMove = function() {
  var ratings = this.collectMoveRatings();
  console.log(ratings);
  var bestMove = {direction: "left", score: 17};
  for (var idx = 0; idx < ratings.length; idx++) {
    if (ratings[idx].score < bestMove.score) {
      console.log(bestMove, ratings[idx]);
      bestMove = ratings[idx];
    }
  }
  console.log(bestMove.direction);
  return bestMove.direction;
};

TwentyFortyPlayer.prototype.move = function() {
  var moveDirection = this.selectBestMove();
  this.board.makeMoveInDirection(moveDirection);
};
