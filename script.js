let colors = ["red", "blue", "pink", "green", "yellow"];
function touched(){
    document.getElementById('pad').style.backgroundColor = colors[Math.floor(random()*colors.length)];
}