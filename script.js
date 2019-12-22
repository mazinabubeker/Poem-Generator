let colors = ["red", "blue", "pink", "green", "yellow"];
var instrument;
function pressed(){
    instrument.play();
    document.getElementById('pad').style.background = "#89c79b";
}

function released(){
    document.getElementById('pad').style.background = "#98d9ab";
}

function setup(){
    instrument = loadSound('snare.wav');
//    setVolume(1);
}

