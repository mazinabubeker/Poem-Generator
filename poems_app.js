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

var cardComponent = `<div class="cardTrigger">
                        <div class="card">
                            <div class="cardTitle">
                            </div>
                            <div class="cardDate">
                            </div>
                            <div class="cardContent">
                                <div class="cardContentBlur">
                                </div>
                            </div>
                        </div>
                     </div>`;

//var cardComponent = `<div class="cardTrigger">
//                        <div class="card">
//                        </div>
//                     </div>`;

$(document).ready(function() {
    pullCards();
});

function pullCards(){
    firebase.database().ref('/poems/').once('value').then(function(snapshot) {
        if(snapshot.numChildren() == 0){
            $("#emptyView").css({
                'display': 'flex'
            });
            $("#emptyView").animate({
                'opacity': '1'
            }, 200);
        }else{
            $("#emptyView").removeAttr('style');
        }
        
        snapshot.forEach(function(childSnapshot){
            var cur = $(cardComponent).appendTo("#cardView");
            cur.children(".card").children(".cardTitle").text(childSnapshot.key);
            cur.children(".card").children(".cardDate").text(childSnapshot.child("date").val());
            cur.children(".card").children(".cardContent").text(childSnapshot.child("poem").val());
        });
    });
}

function newPoem(){
    
    $("#controlView").css({
        'filter': 'blur(10px)',
        'pointer-events': 'none'
    });
    $("#cardView").css({
        'filter': 'blur(10px)',
        'pointer-events': 'none'
    });
    $("#createView").css({
        'display': 'inline'
    });
    $("#cancelCreateTrigger").css({
        'display': 'inline'
    });
    
    $("#createView").animate({
        'opacity': '1'
    }, 200);
    
    $("#cancelCreateTrigger").animate({
        'opacity': '1'
    }, 200);
}

function deletePoems(){
    $(".card").animate({
        'opacity': '0',
        'transform': 'scale(.8)'
    }, 200, function(){
        $(".cardTrigger").remove();
        firebase.database().ref('poems/').set({});
        pullCards();
    });
    
}

function testPoem(){
    $("#emptyView").removeAttr('style');
    var curDate = new Date();
    var month = months[curDate.getMonth()];
    var date = curDate.getDate();
    var year = curDate.getFullYear();
    
    var testTitle = "Test poem " + (999 + Math.floor(Math.random()*9000)).toString(10);
    var testDate = month + " " + date.toString(10) + ", " + year.toString(10);
    var testPoem = `
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                `;
    database.ref('poems/' + testTitle).set({
        poem: testPoem,
        date: testDate,
    });
    var cur = $(cardComponent).appendTo("#cardView");
    cur.children(".card").children(".cardTitle").text(testTitle);
    cur.children(".card").children(".cardDate").text(testDate);
    cur.children(".card").children(".cardContent").text(testPoem);
}