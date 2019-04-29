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
    $(document).on('keypress',function(e) {
        if(e.which == 13) {
            nextClick();
        }
    });
    
    
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
            $("#pl1").addClass("previewAnimOut");
            $("#pl2").addClass("previewAnimIn");
            nouns.push($("#data1").val().toLowerCase());
            nouns.push($("#data2").val().toLowerCase());
            nouns.push($("#data3").val().toLowerCase());
            triggerNextInput("adjectives");
        }else if(stage == 1){
            $("#pl2").addClass("previewAnimOut");
            $("#pl3").addClass("previewAnimIn");
            adjectives.push($("#data1").val().toLowerCase());
            adjectives.push($("#data2").val().toLowerCase());
            adjectives.push($("#data3").val().toLowerCase());
            triggerNextInput("verbs");
        }else if(stage == 2){
            $("#pl3").addClass("previewAnimOut");
            $("#pl4").addClass("previewAnimIn");
            verbs.push($("#data1").val().toLowerCase());
            verbs.push($("#data2").val().toLowerCase());
            verbs.push($("#data3").val().toLowerCase());
            triggerNextInput("adverbs");
        }else if(stage == 3){
            $("#pl4").addClass("previewAnimOut");
            $("#pl5").addClass("previewAnimIn");
            adverbs.push($("#data1").val().toLowerCase());
            adverbs.push($("#data2").val().toLowerCase());
            adverbs.push($("#data3").val().toLowerCase());
            triggerNextInput("prepositions");
        }else if(stage == 4){
            prepositions.push($("#data1").val().toLowerCase());
            prepositions.push($("#data2").val().toLowerCase());
            prepositions.push($("#data3").val().toLowerCase());
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
            $("#data1").removeAttr('style');
        }
        
        if(!valid[1]){
            $("#data2").css({
                'border-bottom-color': 'rgba(255, 0, 0, .6)'
            });
        }else{
            $("#data2").removeAttr('style');
        }
        
        if(!valid[2]){
            $("#data3").css({
                'border-bottom-color': 'rgba(255, 0, 0, .6)'
            });
        }else{
            $("#data3").removeAttr('style');
        } 
    }
}

function triggerNextInput(type){
    canGoNext = false;
    $("input").animate({
        'opacity': '0' 
    }, 300, function(){
        $("#data1").val("")
        $("#data2").val("")
        $("#data3").val("")
    });
    
    $("input").animate({
        'opacity': '1'
    }, 300);
    
    $("#instruction").animate({
        'opacity': '0'
    }, 300, function(){
        $("#instruction").text("Choose 3 " + type);
        $("#data1").focus();
    });
    
    $("#instruction").animate({
        opacity: 1
    }, 300, function(){
        canGoNext = true;
    });
    
    
}

function finishInput(){
    
    var fullPoem = `Where the dove loves to 3, so 4 and so 4, A 2 1 tends to 3, 4 5 a 1; Why the difference, you may ask? The answer lies 5 the 2 book, the one made to 3; A 2 truth that may never fall 5 a 1`;
    
    var order = "012";
    var orders = [];
    var counters = [0, 0, 0, 0, 0];
    var indexes = [];
    var values = [];
    var offset = 0;
    
    for(var i = 0; i < 5; i++){
        orders.push(order.split('').sort(function(){return 0.5-Math.random()}).join(''));
    }
    
    for(var i = 0; i < fullPoem.length; i++){
        if(!isNaN(parseInt(fullPoem.charAt(i), 10))){
            indexes.push(i);
            values.push(parseInt(fullPoem.charAt(i), 10));
        }
    }
    for(var i = 0; i < 15; i++){
        if(values[i] == 1){
            var word = nouns[parseInt(orders[values[i] - 1].charAt(counters[values[i]-1]), 10)];
            fullPoem = replaceAt(fullPoem, indexes[i] + offset, word);
            offset += word.length - 1;
        }else if(values[i] == 2){
            var word = adjectives[parseInt(orders[values[i] - 1].charAt(counters[values[i]-1]), 10)];
            fullPoem = replaceAt(fullPoem, indexes[i] + offset, word);
            offset += word.length - 1;
        }else if(values[i] == 3){
            var word = verbs[parseInt(orders[values[i] - 1].charAt(counters[values[i]-1]), 10)];
            fullPoem = replaceAt(fullPoem, indexes[i] + offset, word);
            offset += word.length - 1;
        }else if(values[i] == 4){
            var word = adverbs[parseInt(orders[values[i] - 1].charAt(counters[values[i]-1]), 10)];
            fullPoem = replaceAt(fullPoem, indexes[i] + offset, word);
            offset += word.length - 1;
        }else{
            var word = prepositions[parseInt(orders[values[i] - 1].charAt(counters[values[i]-1]), 10)];
            fullPoem = replaceAt(fullPoem, indexes[i] + offset, word);
            offset += word.length - 1;
        }
        counters[values[i]-1]++;
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
    
    $("#createView").css({
        'overflow-y': 'scroll'
    });
    
    
}

function submitPoem(){
    var curDate = new Date();
    var month = months[curDate.getMonth()];
    var date = curDate.getDate();
    var year = curDate.getFullYear();
    var thingy = "This part isn't working and I'm not sure why but let's hope it works before tomorrow ehe please"
    writeUserData($("#titleInput").val(), thingy, month + " " + date.toString(10) + ", " + year.toString(10));
    
    $("#finalizePoem").animate({
        'opacity': '0'
    }, 100, function(){
        window.location.href="index.html";
    });
}

function closeCreate(){
    window.location.href="index.html";
}

function replaceAt(string, index, newString) {
  return string.substring(0, index) + newString + string.substring(index + 1);
}