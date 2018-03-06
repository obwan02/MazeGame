const scl = 40;

const CLOSED = 1;
const OPEN = 0;

function Tile(x, y, type){

  this.image = new Image();
  this.x = x;
  this.y = y;

  this.type = type;

  this.paint = function(brightness){


    if(this.type == OPEN) {
      ctx.fillStyle = "green";
      ctx.fillRect(this.x * scl, this.y * scl, scl, scl);

      ctx.fillStyle = `rgba( 0, 0, 0, ${ brightness })`;
      ctx.fillRect(this.x * scl, this.y * scl, scl, scl);
    }

    else {
      this.image.src = "./res/wall.png";
      ctx.drawImage(this.image, this.x * scl, this.y * scl, scl, scl);

      ctx.fillStyle = `rgba( 0, 0, 0, ${ brightness })`;
      ctx.fillRect(this.x * scl, this.y * scl, scl, scl);
    }
  }
}
