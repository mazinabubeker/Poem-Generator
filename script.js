var instruments = [];
var ready;

function preload(){
    ready = false;
    instruments.push(loadSound('sounds/high_tom.wav'));
    instruments.push(loadSound('sounds/low_tom.wav'));
    instruments.push(loadSound('sounds/mid_tom.wav'));
    
    instruments.push(loadSound('sounds/crash.wav'));
    instruments.push(loadSound('sounds/kick.wav'));
    instruments.push(loadSound('sounds/snare.wav'));
    instruments.push(loadSound('sounds/hat.wav'));
    instruments.push(loadSound('sounds/open_hat.wav'));
}

function setup(){
    ready = true;
    document.addEventListener('touchend', e=>{
        e.preventDefault();
        $(this).click();
    });
    
    document.addEventListener('touchmove', e=>{
        e.preventDefault();
    });
    
//    let padwidth = $('pad')[0].style.height;
//    $('pad').style.width = padwidth;
    document.getElementsByClassName('pad').forEach((v,i)=>{
        document.getElementsByClassName('pad')[i].style.width = Math.floor(innerHeight/2.1).toString() + "px";
       document.getElementsByClassName('pad')[i].style.height = Math.floor(innerHeight/2.1).toString() + "px";
    });
    
//    window.addEventListener('scroll', e=>{
//        window.scrollTo(0, 0);
//    });
    
//    window.removeEventListener('scroll', e=>{
//        window.scrollTo(0, 0);
//    });
    
//    $('pad').addEventListener('touchstart', e=>{
//        this.style.backgroundColor = "#89c79b";
//    });
//    
//    $('pad').addEventListener('touchend', e=>{
//        this.style.backgroundColor = "#98d9ab";
//    });
}

function pressed(i){
    if(ready){
        instruments[i].play();
        document.getElementsByClassName('pad')[i].classList.add('selected');
    }
}

function released(i){
    if(ready){
        document.getElementsByClassName('pad')[i].classList.remove('selected');
    }
}



