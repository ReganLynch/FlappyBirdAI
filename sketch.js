

var window_height = 700
var window_width = 450

const TOTAL = 500;

var generation

var birds = []
var prevBirds = []
var pipes

var showingBestBird

var startNeuroButton
var startSavedButton
var startRealButton

var maxScore
var maxFitness

var img_pipe
var img_bird
var img_backdrop

var h1
var h2
var h3
var h4
var h5
var slider

var showButton
var saveButton
var upload
var playSavedBird

var uploadedBrain
var uploadedBird
var humanBird

var playingNeuro
var playingUploaded
var playingHuman

//-------------------------------------------------
function keepSurvivingBirds(){
	var currMaxScore = 0;
	for(let i = 0; i < birds.length; i++){
		if(birds[i].hasDied){
			prevBirds.push(birds.splice(i, 1)[0]);
		}else if(birds[i].score > currMaxScore){
			currMaxScore = birds[i].score;
		}
	}
	maxScore = currMaxScore;
}
//-------------------------------------------------
function preload(){
	img_pipe = loadImage('images/pipe.png');
	img_bird = loadImage('images/bird2.png');
	img_backdrop = loadImage('images/backdrop.png');
}
//-----------------------------------------------
function getBestBird(){
	if(birds[0]){
		var bestScore = birds[0].score;
		var bestBird = birds[0];
		for(let currBird of birds){
			if(currBird.score > bestScore){
				bestScore = currBird.score;
				bestBird = currBird;
			}
		}
		return bestBird;
	}
}
//-----------------------------------------------
function showBestBird(){
	showingBestBird = !showingBestBird;
	if(showingBestBird){
		showButton.html('show all birds');
	}else{
		showButton.html('show best bird');
	}
}
//-----------------------------------------------
function saveBestBird(){
	let b = getBestBird();
	if(b){
		saveJSON(b.brain, 'best_bird.json');
	}
}
//----------------------------------------------
function fileLoaded(data){
	uploadedBrain = NeuralNetwork.deserialize(data);
}
//-----------------------------------------------
function fileSelected(evt){
	var file = evt.target.files[0];
	loadJSON('saved birds/' + file.name, fileLoaded);		//loadJSON not working
}
//-----------------------------------------------
function StartNeuroevolution(){
	playingHuman = false;
	playingUploaded = false;
	playingNeuro = true;
	generation = 1;
	birds = [];
	pipes = [];
	for(let i = 0; i < TOTAL; i++){
		birds[i] = new bird();
	}
	pipes.push(new pipe());
}
//-----------------------------------------------
function StartSavedBird(){
	playingHuman = false;
	playingUploaded = true;
	playingNeuro = false;
	maxScore = 0;
	maxFitness = 0;
	generation = 0;
	birds = [];
	pipes = [];
	if(uploadedBrain){
		uploadedBird = new bird(uploadedBrain);
		pipes.push(new pipe());
	}
}
//-----------------------------------------------
function StartRealGame(){
	playingHuman = true;
	playingUploaded = false;
	playingNeuro = false;
	maxScore = 0;
	maxFitness = 0;
	generation = 0;
	birds = [];
	pipes = [];
	humanBird = new bird();
	pipes.push(new pipe());
}
//-----------------------------------------------
function setup() {
	var canvas = createCanvas(window_width, window_height);
	canvas.position(50, 50);										//offset the canvas from the side walls
	playingNeuro = false;
	playingUploaded = false;
	playingHuman = false;
	showingBestBird = false;
	//start game buttons
	startNeuroButton = createButton('start Neuroevolution');
  startNeuroButton.position(50, window_height + 100);
  startNeuroButton.mousePressed(StartNeuroevolution);
	startSavedButton = createButton('run uploaded bird');
  startSavedButton.position(240, window_height + 100);
  startSavedButton.mousePressed(StartSavedBird);
	startRealButton = createButton('play game');
  startRealButton.position(420, window_height + 100);
  startRealButton.mousePressed(StartRealGame);
	//elements for displaying neuroevolution information
	h1 = createElement("h1", "max score = 0");
	h1.position(100 + width, 80);
	h1.style("font-size", "14pt");
	h2 = createElement("h2", "max fitness = 0");
	h2.position(100 + width, 100);
	h2.style("font-size", "14pt");
	slider = createSlider(1, 200, 1);
	slider.position(100 + width, 190);
	h3 = createElement("h3", "evolution speed");
	h3.position(125 + width, 200);
	h3.style("font-size", "10pt");
	h5 = createElement("h5", "  generation: 0");
	h5.position(100 + width, 120);
	h5.style("font-size", "14pt");
	showButton = createButton('show best bird');
  showButton.position(125 + width, 250);
  showButton.mousePressed(showBestBird);
	//buttons for saving / uploading bird
	saveButton = createButton('save best bird');
  saveButton.position(125 + width, 285);
  saveButton.mousePressed(saveBestBird);
	upload = createInput();
	upload.position(100 + width, 600);
	upload.attribute('type','file');
	upload.elt.addEventListener('change', fileSelected, false);
	h4 = createElement("h4", "upload saved bird");
	h4.position(120 + width, 550);
	h4.style("font-size", "12pt");
}
//------------------------------------------------
function draw() {
	image(img_backdrop, 0, 0, width*1.4, height);
	//all game logic
	if(playingNeuro){
		//do game logic in cycles -> speeds up evolution
		for(let i = 0; i < slider.value(); i++){
			//update birds
			for(let bird of birds){
				bird.update();
			}
			//update pipes
			for(let i = 0; i < pipes.length;  i++){
				pipes[i].update();
			}
			//remove offscreen pipes
			if(pipes[0].xpos <= -50){
				pipes.shift();
			}
			//keep only the surviving birds
			keepSurvivingBirds();
			//create next generation if all birds die, and respawn pipes
			if(birds.length === 0){
				nextGeneration();
				generation++;
				pipes = [];
				pipes.push(new pipe());
			}
		}
		//all the drawing logic
		if(!showingBestBird){
			for(let bird of birds){
				bird.draw();
			}
		}else{
			let bestBird = getBestBird();
			bestBird.draw();
		}
		for(let pipe of pipes){
			pipe.draw();
		}
		displayPipesPassed(birds[0].pipesPassed);
	}//if playing neuroevolution

//---------------------------------
	if(playingHuman){
		if(!humanBird.hasDied){
			//update bird
			humanBird.update();
			humanBird.draw();
			//update pipes
			for(let p of pipes){
				p.update();
				p.draw();
			}
			//remove offscreen pipes
			if(pipes[0].xpos <= -50){
				pipes.shift();
			}
		}else{
			humanBird.draw();
			for(let p of pipes){
				p.draw();
			}
		}
		displayPipesPassed(humanBird.pipesPassed);
	}//end human playing
	//------------------------------
	if(playingUploaded && uploadedBird){
		if(!uploadedBird.hasDied){
			//update bird
			uploadedBird.update();
			uploadedBird.draw();
			//update pipes
			for(let p of pipes){
				p.update();
				p.draw();
			}
			//remove offscreen pipes
			if(pipes[0].xpos <= -50){
				pipes.shift();
			}
		}else{
			uploadedBird.draw();
			for(let p of pipes){
				p.draw();
			}
		}
		displayPipesPassed(uploadedBird.pipesPassed);
	}//end uploaeded playing

	//keep track of things
	displayScore = maxScore || "0";
	displayFitness = maxFitness || "0";
	displayGeneration = generation || "0";
	h1.html("max score = " + displayScore);
	h2.html("max fitness = " + displayFitness);
	h5.html("generation: " + displayGeneration);
}
//------------------------------------------------
function keyPressed(){
	if(playingHuman){
		if(key == ' '){
			humanBird.jump();
		}
	}
}
//------------------------------------------------
function displayPipesPassed(value){
	stroke(0);
	textSize(40);
	text(str(value), width/2, 100);
}
