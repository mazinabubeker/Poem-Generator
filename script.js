var instruments = [];
var ready;

function preload(){
    ready = false;
    instruments.push(loadSound('sounds/kick.wav'));
    instruments.push(loadSound('sounds/snare.wav'));
    instruments.push(loadSound('sounds/hat.wav'));
}

function setup(){
    ready = true;
}

function pressed(i){
    if(ready){
        instruments[i].play();
    }
}

function released(i){
    
}



