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
    document.body.bind('touchend', function(e) {
        e.preventDefault();
        $(this).click();
    });
}

function pressed(i){
    if(ready){
        instruments[i].play();
        document.getElementsByClassName('pad')[i].style.backgroundColor = "#89c79b";
    }
}

function released(i){
    if(ready){
        document.getElementsByClassName('pad')[i].style.backgroundColor = "#98d9ab";
    }
}



