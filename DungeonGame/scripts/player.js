var moveScl = 0.1;

function Player(){
  this.x = 7;
  this.y = 7;

  this.dirX = 0;
  this.dirY = 0;

  this.lightStrength = 2;

  this.imgRight = new Image();
  this.imgRight.src = "./res/player_right.png"
  this.imgLeft = new Image();
  this.imgLeft.src = "./res/player_left.png"
  this.imgFront = new Image();
  this.imgFront.src = "./res/player_front.png"
  this.imgBack = new Image();
  this.imgBack.src = "./res/player_back.png"
  this.imgIdle = new Image();
  this.imgIdle.src = "./res/player_idle.png"

  this.paint = function(){

    if(this.dirX == moveScl) {
      ctx.drawImage(this.imgRight, this.x * scl, this.y * scl, scl, scl);
    } else if(this.dirX == -moveScl) {
      ctx.drawImage(this.imgLeft, this.x * scl, this.y * scl, scl, scl);
    } else if(this.dirY == moveScl) {
      ctx.drawImage(this.imgFront, this.x * scl, this.y * scl, scl, scl);
    } else if(this.dirY == -moveScl) {
      ctx.drawImage(this.imgBack, this.x * scl, this.y * scl, scl, scl);
    }  else {
      ctx.drawImage(this.imgIdle, this.x * scl, this.y * scl, scl, scl);
    }
  }

  this.checkCollisions = function(lx, ly) {
    for(var i = 0; i < board.length; i++){
      for(var j = 0; j < board[i].length; j++){
          var tile = board[i][j];

          if(tile.type == CLOSED){

            if (this.x <= tile.x + 0.9 && this.x + 0.8 >= tile.x){
              if (this.y <= tile.y + 0.9 && this.y + 0.8 >= tile.y){
                this.x -= lx;
                this.y -= ly;
              }
            }
            /*
            if((this.x < tile.x + 1 && this.x > tile.x) | (this.x < tile.x + 1 && this.x + 1 > tile.x)) {
              if((this.y < tile.y + 1 && this.y > tile.y) | (this.y < tile.y + 1 && this.y + 1 > tile.y)) {
                  this.x += -lx;
                  this.y += -ly;
              }
            }
            */
          }



      }
    }
  }
}
