
//class for the bird

function bird(brain) {

  this.jumpVel = -6;
  this.birdWidth = 20;
  this.gravity = 0.25;
  this.xpos = 100;
  this.imgScaleFactor = 1.5;

  this.ypos = 200;
  this.yspeed = 0;
  this.hasDied = false;
  this.pipesPassed = 0;

  if(brain){
    this.brain = brain.copy();
  }else{
    this.brain = new NeuralNetwork(6, 8, 1);
  }

  this.score = 0;
  this.fitness = 0;

  //---------------------------------------------
  this.draw = function(){
    push();
    imageMode(CENTER);
    translate(this.xpos, this.ypos);
    if(this.yspeed >= 1){  //if going down
      rotate(PI/8);
    }else if(this.yspeed < 0){ //if going up
      rotate(-PI/8);
    }
    image(img_bird, 0, 0, this.birdWidth * this.imgScaleFactor, this.birdWidth * this.imgScaleFactor);
    imageMode(CORNER);
    pop();

  }
  //---------------------------------------------
  this.fall = function(){
    this.yspeed += this.gravity;
    this.ypos += this.yspeed;
  }
  //---------------------------------------------
  this.jump = function(){
    this.yspeed = this.jumpVel;
  }
  //---------------------------------------------
  this.update = function(){
    this.score++;             //if a bird is still alive, its score is increased
    if(playingNeuro || playingUploaded){
      this.think();
    }
    this.fall();
    this.checkHit();
    this.updatePipesPassed();
  }
  //---------------------------------------------
  //check if the bird has died
  this.checkHit = function(){
    if(this.ypos <= 0){
      this.hasDied = true;
      this.ypos = 0;
    }
    if(this.ypos >= height - 50){
      this.hasDied = true;
      this.ypos = height - 50;
    }
    //if bird is near the pipe
    if(this.xpos + this.birdWidth/2 >= pipes[0].xpos && this.xpos - this.birdWidth/2 <= pipes[0].xpos + pipe_width){
      if(this.ypos -  this.birdWidth/2 < pipes[0].topY || this.ypos + this.birdWidth/2 > pipes[0].bottomY){
        this.hasDied = true;
      }
    }
  }
  //---------------------------------------------
  this.updatePipesPassed = function(){
    	if(this.xpos - this.birdWidth/2 > pipes[0].xpos + pipe_width && !pipes[0].hasPassedBird && !this.hasDied){
    		pipes[0].hasPassedBird = true;
        if(playingNeuro){
          for(let b of birds){
            b.pipesPassed++;
          }
        }else{
          this.pipesPassed++;
        }
    	}
  }
  //---------------------------------------------
  this.think = function(){
    let inputs = [];
    let closestPipe = this.getClosestPipe();

    inputs[0] = this.ypos / height;                              //y pos of bird
    inputs[1] = closestPipe.topY / height;                       //y pos of top pipe
    inputs[2] = closestPipe.bottomY / height;                    //y pos of bottom pipe
    inputs[3] = closestPipe.xpos / width;                        //x pos of the front of the pipes
    inputs[4] = (closestPipe.xpos + pipe_width) / width;         //x pos of the back of the pipes
    inputs[5] = this.yspeed / 10;                                //y velocity of the bird

    let output = this.brain.query(inputs);

    if(output[0] > 0.5){
      this.jump();
    }
  }

  //--------------------------------------------
  this.getClosestPipe = function(){
    if((pipes[0].xpos + pipe_width) - this.xpos < 0){
      return pipes[1];
    }else{
      return pipes[0];
    }
  }

}
