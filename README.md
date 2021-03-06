# FlappyBirdAI
JavaScript implementation of the Flappy Bird game. Also implements a NEAT (neuroevolution of augmented topologies) artificial intelligence algorithm which can train a set of birds to play the game.

<p align="center"> 
<img src="https://user-images.githubusercontent.com/45275820/53759662-40396d80-3e97-11e9-8f43-4748fbc76f65.png">
</p>

## How to play
There are three different ways to "play" this game:
1. you (the player) take control of the bird and jump by hitting the space bar.
2. you train an initial set of 500 birds to learn how to play the game through neuroevolution, and watch them progressively get better with each generation.
3. you upload a saved bird (JSON file) and watch it play 

## How To Train Birds
By selecting the "start Neuroevolution" button at the bottom of the game window, a set of 500 birds will be spawned who know absolutley nothing about how to play Flappy Bird. At first they will be terrible at the game and flap their wings in completley meaningless ways. They do this because their "brains" (neural networks) have not had enough training to become sufficient at the game. Once the entire generation of bird dies, a new generation will be created, who is slightly better than the last at playing the game.

The speed at which the birds are trained can be increased with the slider to the right of the game window. There is also a buttons to only show the bird that is doing the best, and save the best bird to your local machine.

## How To Upload And Run a Saved Bird 
A bird that is saved on your local machine (JSON file) can be uploaded into the game by clicking the "choose file" button to the right of the game window. If the upload is successful, the file name of that uploaded bird will appear to the right od the "choose file" button. 

To run this uploaded bird, simply hit the "run uploaded bird" buton on the bottom of the game window

## About the Neuroevolution Algorithm
After the initial generation, each new generation is generated by carrying over attributes from the previous generation of birds who did the best, and mutating (randomizing) these attributes a little. This process aims to mimic natural evolution. This type of genetic learning algorithm is called NEAT (neuroevolution of augmented topologies). 

## Acknowledgements
This project is based work done by [Daniel Shiffmann](https://github.com/shiffman), and his series on [Neuroevolution](https://www.youtube.com/watch?v=c6y21FkaUqw) 




`---- Happy Flapping! ----`
