var board = [];
var collisionData = [];

function createCollisionObject(x, y, width, height){
  return { x, y, width, height };
}

const width = 20;
const height = 20;
const FPS = 30;

var finished = false;

var player;

var canvas = document.getElementById("canvas1");
canvas.width = width * scl;
canvas.height = height * scl;
var ctx = canvas.getContext("2d");

var w = false;
var a = false;
var s = false;
var d = false;
var space = false;

window.onkeydown = function(e){
  switch(e.keyCode) {
    case 87:
    case 38:
      w = true;
    break;

    case 65:
    case 37:
      a = true;
    break;

    case 83:
    case 40:
      s = true;
    break;

    case 68:
    case 39:
      d = true;
    break;

    case 32:
      space = true;
    break;
  }
}

window.onkeyup = function(e){
  switch(e.keyCode) {
    case 87:
    case 38:
      w = false;
    break;

    case 65:
    case 37:
      a = false;
    break;

    case 83:
    case 40:
      s = false;
    break;

    case 68:
    case 39:
      d = false;
    break;

    case 32:
      space = false;
    break;
  }
}

var setup = function(){

  player = new Player();

  for(var i = 0; i < height; i++){
    board.push([]);
    for(var j = 0; j < width; j++){
      board[i].push(new Tile(j, i, OPEN));
    }
  }

  for(var i = 0; i < height; i++) {
    board[i][0].type = CLOSED;
    collisionData.push(createCollisionObject(j, i, 1, 1));
  }

  for(var i = 0; i < height; i++) {
    board[0][i].type = CLOSED;
    collisionData.push(createCollisionObject(i, 0, 1, 1));
  }

  for(var i = 0; i < height; i++) {
    board[i][width - 1].type = CLOSED;
    collisionData.push(createCollisionObject(width - 1, i, 1, 1));
  }

  for(var i = 0; i < height; i++) {
    board[height - 1][i].type = CLOSED;
    collisionData.push(createCollisionObject(i, height - 1, 1, 1));
  }

  board[5][5].type = CLOSED;
  collisionData.push(createCollisionObject(5, 5, 1, 1));

}

function roundTo(x, base=1){
  return base * Math.ceil(x * base);
}

function repaint() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for(var i = 0; i < height; i++){
    for(var j = 0; j < width; j++){
      let tile = board[i][j];

      let dist_x = player.x - (tile.x + 0);
      let dist_y = player.y - (tile.y + 0);


      let cast = RayCast(player.x + 0.5, player.y + 0.5, tile.x + 0.5, tile.y + 0.5, collisionData, 5);

      if(!cast){
        let dist_sqr = dist_x ** 2 + dist_y ** 2;
        let brightness = 1 - (player.lightStrength / 1) / Math.floor(dist_sqr);
        board[i][j].paint(brightness);
      } else {

        board[i][j].paint(1);
      }

      

      
    }
  }

  player.paint();

}

function update() {
  repaint();

  moveX = 0;
  moveY = 0;

  if(w){
    moveY = -moveScl;
  } if (a) {
    moveX = -moveScl;
  } if (s) {
    moveY = moveScl;
  } if (d) {
    moveX = moveScl;
  }


  player.dirX = moveX;
  player.dirY = moveY;

  player.x += moveX;
  player.checkCollisions(moveX, 0);

  player.y += moveY;
  player.checkCollisions(0, moveY);
}

var render = function(){
  setInterval(update, 1000/FPS);
}

setup();
render();
