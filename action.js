
let numPlayers = prompt("How many players for today's tee time?");
let numPlayersUsed = 0;
let golfHoles = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];
let selectedCourse;
let selectedTee;



loadDoc();

function createCard(){
    //need to clear any data currently in the divs being printed to before any more printing.
    //loadPlayers should only happen once.
    $(".right").html("");
    $(".left").html("");

    for (let i = 0; i < 9; i++){
        $(".right").append("<div id='col" + (i + 1) +"' class='column'>" +
            "<div class='colHeader'>" +
            "<div class='holeNum'>" + (i + 1) + "</div>" +
            "<div class='parInfo' id='parInfo" + (i + 1) + "'>" +
            "<div class='par' id='par-" + i + "'>PAR "+ selectedCourse.data.holes[i].teeBoxes[selectedTee].par +"</div>" +
            "<div class='yardage'>YDG: "+ selectedCourse.data.holes[i].teeBoxes[selectedTee].yards +"</div>" +
            "</div>" +
            "</div>" +
            "</div>");
    }
    $(".right").append("<div class='scoreCol' id='scoreColIn'>" +
        "<div class='scoreColHead'>" +
        "<div class='scoreColLabel'>In</div>" +
        "<div class='scoreColParTotal'></div>" +
        "</div>" +
        "</div>");

    for (let i = 9; i < 18; i++){
        $(".right").append("<div id='col" + (i + 1) +"' class='column'>" +
            "<div class='colHeader'>" +
            "<div class='holeNum'>" + (i + 1) + "</div>" +
            "<div class='parInfo' id='parInfo" + (i + 1) + "'>" +
            "<div class='par' id='par-" + i + "'>PAR "+ selectedCourse.data.holes[i].teeBoxes[selectedTee].par +"</div>" +
            "<div class='yardage'>YDG: "+ selectedCourse.data.holes[i].teeBoxes[selectedTee].yards +"</div>" +
            "</div>" +
            "</div>" +
            "</div>");
    }
    $(".right").append("<div class='scoreCol' id='scoreColOut'>" +
        "<div class='scoreColHead'>" +
        "<div class='scoreColLabel'>Out</div>" +
        "<div class='scoreColParTotal'></div>" +
        "</div>" +
        "</div>");
    $(".right").append("<div class='scoreCol' id='scoreColTotals'>" +
        "<div class='scoreColHead'>" +
        "<div class='scoreColLabel'>Totals</div>" +
        "<div class='scoreColParTotal'></div>" +
        "</div>" +
        "</div>");
    console.log("Scorecard created")
}

function loadPlayers(){
    for(let i = 0; i < numPlayers; i++){
        numPlayersUsed++;
        $(".left").append('<div class="playerLabel" id="player'+ (i + 1) +'">\n' +
            '    <div class="playerName" contenteditable="true">\n' +
            '    Player '+ (i + 1) +'</div>\n' +
            '    <div class="trashPlayer fa fa-trash" onclick="deletePlayer(\'#player'+numPlayersUsed+'\', \''+numPlayersUsed+'\')">\n' +
            '    </div> \n' +
            '</div>');
        addScoreBoxes(numPlayersUsed);
    }

    console.log("Players loaded");
}

function addScoreBoxes(player){
    for (let i = 0; i <= golfHoles.length; i++){
        $("#col" + i).append('<div class="colScores" id="score'+ player +'-'+ i +'" contenteditable="true" onkeyup="scoreTotals('+ player +')">' + 0 + '</div>');
    }
    $("#scoreColIn").append("<div class='total' id='inTotal"+player+"'>" + 0 + "</div>");
    $("#scoreColOut").append("<div class='total' id='outTotal"+player+"'>" + 0 + "</div>");
    $("#scoreColTotals").append("<div class='total' id='gameTotal"+player+"'>" + 0 + "</div>");
}


function addPlayer(){
    numPlayersUsed++;
    numPlayers++;

    $(".left").append('<div class="playerLabel" id="player'+ numPlayersUsed +'">\n' +
        '    <div class="playerName" contenteditable="true">\n' +
        '    Player '+ numPlayersUsed +'</div>\n' +
        '    <div class="trashPlayer fa fa-trash" onclick="deletePlayer(\'#player'+numPlayersUsed+'\', \''+numPlayersUsed+'\')">\n' +
        '    </div> \n' +
        '</div>');
    addScoreBoxes(numPlayersUsed);
    console.log("Player added");
    console.log("For reference: Total number of player slots created today is "+numPlayersUsed+"");
}

function deletePlayer(playerToTrash, playerNum){
    $(playerToTrash).remove();
    for (let i = 1; i <= golfHoles.length; i++){
        $("#score" + playerNum + "-" + i +"").remove();
        $("#inTotal" + playerNum + "").remove();
        $("#outTotal" + playerNum + "").remove();
        $("#gameTotal" + playerNum + "").remove();
    }
    numPlayers--;
    console.log("Player removed. Current number of players:"+numPlayers+"");
    console.log("For reference: Total number of player slots created today is "+numPlayersUsed+"");
}

function scoreTotals(player){
    let inScore = 0;
    let outScore = 0;


    for (let i = 1; i < 10; i++){
        let scoreInq = Number($("#score" + player + "-" + i + "").html());
        if(isNaN(scoreInq) === false) {
            inScore =  scoreInq + inScore;
        }
    }
    for (let i = 10; i < 19; i++){
        let scoreInq = Number($("#score" + player + "-" + i + "").html());
        if(isNaN(scoreInq) === false) {
            outScore =  scoreInq + outScore;
        }
    }

    $("#inTotal"+ player +"").html(inScore);
    $("#outTotal" + player + "").html(outScore);
    $("#gameTotal" + player + "").html(inScore + outScore);

}


function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let myCourses = JSON.parse(this.responseText);
            console.log(myCourses);
            for(let i = 0; i < myCourses.courses.length; i++){
                $("#selID").append("<option value='"+ myCourses.courses[i].id +"'>"+ myCourses.courses[i].name +"</option>")
            }
        }
    };
    xhttp.open("GET", "https://uxcobra.com/golfapi/courses.txt", true);
    xhttp.send();
}

function getCourse(courseId) {
    $("#teeBoxSel").html("");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            selectedCourse = JSON.parse(this.responseText);
            console.log(selectedCourse);
            let tees = selectedCourse.data.holes[0].teeBoxes;
            for(let i = 0; i < tees.length; i++){
                $("#teeBoxSel").append("<option value='"+ i +"'>"+ tees[i].teeType +"</option>")
            }
        }
    };
    xhttp.open("GET", "https://uxcobra.com/golfapi/course"+ courseId +".txt", true);
    xhttp.send();

}

function setTee(teeIndex){
    selectedTee = teeIndex;
    createCard();
    loadPlayers();
}

