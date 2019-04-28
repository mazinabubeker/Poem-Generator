// Data
//window.onbeforeunload = function () {return false;}
var nouns = [];
var adjectives = [];
var verbs = [];
var adverbs = [];
var prepositions = [];
var fullPoem = "";
var stage = 0;
var canGoNext = true;
var database = firebase.database();

var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

function start(){
    $("#poem").text("asdlkasdkjaslkdjlakdsklad");
}

start();

function writeUserData(title, poemText, date) {
  database.ref('poems/' + title).set({
    poem: poemText,
    date: date,
  });
}

var regex = /^[A-Za-z]+$/;

function nextClick(){
    var valid = [];
    valid[0] = regex.test($("#data1").val());
    valid[1] = regex.test($("#data2").val());
    valid[2] = regex.test($("#data3").val());
    if(valid[0] && valid[1] && valid[2] && canGoNext){
//        $("input").css({
//            'border-bottom-color': 'rgba(0, 0, 0, .4)'
//        });
        $("input").removeAttr('style');
        
        $("#errorInstruction").animate({
            opacity: 0
        }, 250);
        
        if(stage == 0){
            nouns.push($("#data1").val());
            nouns.push($("#data2").val());
            nouns.push($("#data3").val());
            triggerNextInput("adjectives");
        }else if(stage == 1){
            adjectives.push($("#data1").val());
            adjectives.push($("#data2").val());
            adjectives.push($("#data3").val());
            triggerNextInput("verbs");
        }else if(stage == 2){
            verbs.push($("#data1").val());
            verbs.push($("#data2").val());
            verbs.push($("#data3").val());
            triggerNextInput("adverbs");
        }else if(stage == 3){
            adverbs.push($("#data1").val());
            adverbs.push($("#data2").val());
            adverbs.push($("#data3").val());
            triggerNextInput("prepositions");
        }else if(stage == 4){
            prepositions.push($("#data1").val());
            prepositions.push($("#data2").val());
            prepositions.push($("#data3").val());
            finishInput();
        }
        stage++;
    }else{
        if($("#errorInstruction").css("opacity") == 1){
            $("#errorInstruction").animate({
                'font-size': '22px'
            }, 50);
            $("#errorInstruction").animate({
                'font-size': '20px'
            }, 50);
            
        }else{
            if(canGoNext){
                $("#errorInstruction").animate({
                    'opacity': '1'
                }, 250);
            }
        }
        
        if(!valid[0]){
            $("#data1").css({
                'border-bottom-color': 'rgba(255, 0, 0, .6)'
            });
        }else{
//            $("#data1").css({
//                'border-bottom-color': 'rgba(0, 0, 0, .4)'
//            });
            $("#data1").removeAttr('style');
        }
        
        if(!valid[1]){
            $("#data2").css({
                'border-bottom-color': 'rgba(255, 0, 0, .6)'
            });
        }else{
//            $("#data2").css({
//                'border-bottom-color': 'rgba(0, 0, 0, .4)'
//            });
            $("#data2").removeAttr('style');
        }
        
        if(!valid[2]){
            $("#data3").css({
                'border-bottom-color': 'rgba(255, 0, 0, .6)'
            });
        }else{
//            $("#data3").css({
//                'border-bottom-color': 'rgba(0, 0, 0, .4)'
//            });
            $("#data3").removeAttr('style');
        } 
    }
}

function triggerNextInput(type){
    canGoNext = false;
    $("input").animate({
        'opacity': '0' 
    }, 500, function(){
        $("#data1").val("")
        $("#data2").val("")
        $("#data3").val("")
    });
    
    $("input").animate({
        'opacity': '1'
    }, 500);
    
    $("#instruction").animate({
        'opacity': '0'
    }, 500, function(){
        $("#instruction").text("Choose 3 " + type);
    });
    
    $("#instruction").animate({
        opacity: 1
    }, 500, function(){
        canGoNext = true;
    });
    
    
}

function finishInput(){
    fullPoem = "";
    for(var i = 0; i < 100; i++){
        fullPoem = fullPoem + nouns[i%3] + " ";
        fullPoem = fullPoem + adjectives[i%3] + " ";
        fullPoem = fullPoem + verbs[i%3] + " ";
        fullPoem = fullPoem + adverbs[i%3] + " ";
        fullPoem = fullPoem + prepositions[i%3] + " ";
        fullPoem = fullPoem + " and then ";
    }
    
    $("#poemCreator").animate({
        'opacity': '0'
    }, 500, function(){
        $("#poemCreator").css({
            'display': 'none'
        });
        
        $("#poem").text(fullPoem);
    
        $("#finalizePoem").css({
            'display': 'inline'
        });

        $("#finalizePoem").animate({
            'opacity': '1'
        }, 500);
        
    });
    
    
}

function submitPoem(){
    var curDate = new Date();
    var month = months[curDate.getMonth()];
    var date = curDate.getDate();
    var year = curDate.getFullYear();
    writeUserData($("#titleInput").val(), fullPoem, month + " " + date.toString(10) + ", " + year.toString(10));
    
    $("#finalizePoem").animate({
        'opacity': '0'
    }, 100, function(){
        window.location.href="index.html";
    });
}