

//code for genetic algorithm

const mutationRate = 0.05;

function nextGeneration(){
  //first calculate all fitness values for the keepSurvivingBirds
  calculateFitnesses();

  for(let i = 0; i < TOTAL; i++){
    birds[i] = pickABird();
  }
  prevBirds = [];
}
//----------------------------------------------------------
//picks a bird based on the probability distrobution of the previous generation's fitnesses
function pickABird(){
  let index = 0;
  let r = random(1);
  while (r > 0) {
    r -= prevBirds[index].fitness;
    index += 1;
  }
  index -= 1;
  var selected = prevBirds[index];
  var child = new bird(selected.brain);
  child.brain.mutate(mutationRate);
  return child;
}
//-----------------------------------------------------
function calculateFitnesses(){
  let sum = 0;
  //exponentially weight heigher scores
  for(let bird of prevBirds){
    bird.score = Math.pow(bird.score, 2);
  }
  for(let bird of prevBirds){
    sum += bird.score;
  }
  var currMaxFitness = 0;
  for(let bird of prevBirds){
    bird.fitness = bird.score / sum;
    if(bird.fitness > currMaxFitness){
      currMaxFitness = bird.fitness;
    }
  }
  maxFitness = str(currMaxFitness).substring(0, 5);
}
