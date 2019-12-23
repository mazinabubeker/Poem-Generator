var instruments = [];
var ready;

function preload(){
    ready = false;
    instruments.push(loadSound('kick.wav'));
    instruments.push(loadSound('snare.wav'));
    instruments.push(loadSound('hat.wav'));
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



