
//class for a pipe object

var speed = 2;
var pipe_gap = 100;
var pipe_width = 40;
var min_dist_from_sides = 75;

function pipe() {

  this.xpos = width;
  this.topY = int(random(min_dist_from_sides, height-min_dist_from_sides-pipe_gap+1));
  this.bottomY = this.topY + pipe_gap;
  this.hasSpawnedPipe = false;
  this.hasPassedBird = false;

  this.draw = function(){
    //top rect
    push();
    scale(1, -1);
    image(img_pipe, this.xpos, -this.topY, pipe_width + 5, 0);
    pop();
    //bottom rect
    image(img_pipe, this.xpos, this.bottomY, pipe_width + 5, height );
  }

  this.update = function(){
    //spawn new pipe if pipe is past the halfway mark
    if(this.xpos <= width/2 && !this.hasSpawnedPipe) {
      pipes.push(new pipe());
      this.hasSpawnedPipe = true;
    }
    this.xpos -= speed;
  }

}
