let colors = ["red", "blue", "pink", "green", "yellow"];
function touched(){
    if(document.getElementById('pad').style.backgroundColor == "blue"){
        document.getElementById('pad').style.backgroundColor = "green";
    }else{
        document.getElementById('pad').style.backgroundColor = "blue";
    }
}