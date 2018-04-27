
let numPlayers = prompt("How many players for today's tee time?");
let numPlayersUsed = 0;
let golfHoles = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];


createCard();
loadPlayers();

function createCard(){
    for (let i = 0; i < 9; i++){
        $(".right").append("<div id='col" + (i + 1) +"' class='column'>" +
            "<div class='colHeader'>" +
            "<div class='holeNum'>" + (i + 1) + "</div>" +
            "<div class='parInfo' id='parInfo" + (i + 1) + "'>" +
            "<div class='par' id='par-" + i + "'>PAR</div>" +
            "<div class='yardage'>YDG:</div>" +
            "</div>" +
            "</div>" +
            "</div>");
    }
    $(".right").append("<div class='scoreCol' id='scoreColIn'>" +
        "<div class='scoreColHead'>" +
        "<div class='scoreColLabel'>In</div>" +
        "<div class='scoreColParTotal'>TOTAL PAR:</div>" +
        "</div>" +
        "</div>");

    for (let i = 9; i < 18; i++){
        $(".right").append("<div id='col" + (i + 1) +"' class='column'>" +
            "<div class='colHeader'>" +
            "<div class='holeNum'>" + (i + 1) + "</div>" +
            "<div class='parInfo' id='parInfo" + (i + 1) + "'>" +
            "<div class='par' id='par-" + i + "'>PAR</div>" +
            "<div class='yardage'>YDG:</div>" +
            "</div>" +
            "</div>" +
            "</div>");
    }
    $(".right").append("<div class='scoreCol' id='scoreColOut'>" +
        "<div class='scoreColHead'>" +
        "<div class='scoreColLabel'>Out</div>" +
        "<div class='scoreColParTotal'>TOTAL PAR:</div>" +
        "</div>" +
        "</div>");
    $(".right").append("<div class='scoreCol' id='scoreColTotals'>" +
        "<div class='scoreColHead'>" +
        "<div class='scoreColLabel'>Totals</div>" +
        "<div class='scoreColParTotal'>COURSE TOTAL PAR:</div>" +
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


    for (let i = 0; i < 9; i++){
        let scoreInq = Number($("#score" + player + "-" + i + "").html());
        if(isNaN(scoreInq) === false) {
            inScore =  scoreInq + inScore;
        }
    }
    for (let i = 9; i < 18; i++){
        let scoreInq = Number($("#score" + player + "-" + i + "").html());
        if(isNaN(scoreInq) === false) {
            outScore =  scoreInq + outScore;
        }
    }

    $("#inTotal"+ player +"").html(inScore);
    $("#outTotal" + player + "").html(outScore);
    $("#gameTotal" + player + "").html(inScore + outScore);

}

function getCourseInfo(){

}

function getHoleInfo(course){

}

