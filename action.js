
let numPlayers = prompt("How many players for today's tee time?");
let numPlayersUsed = 0;
let golfHoles = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];


createCard();
loadPlayers();

function createCard(){
    for (let i = 0; i < golfHoles.length; i++){
        $(".right").append("<div id='col" + (i + 1) +"' class='column'><div class='colHeader'>" + (i + 1) + "</div></div>");
    }
    $(".right").append("<div class='scoreCol'><div class='scoreColHead'>Total</div></div>");
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
        $("#col" + i).append('<div class="colScores" id="score'+ player +'-'+ i +'" contenteditable="true" onkeyup="scoreTotals('+ player +')">\n' +
            '\n' +
            '    0</div>');
    }
    $(".scoreCol").append("<div class='total' id='total"+player+"'>0</div>");
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
        $("#total" + playerNum + "").remove();
    }
    numPlayers--;
    console.log("Player removed. Current number of players:"+numPlayers+"");
    console.log("For reference: Total number of player slots created today is "+numPlayersUsed+"");
}

function scoreTotals(player){
    let initScore = 0;
    let scCheck = [];

    for (let i = 0; i < golfHoles.length; i++){
        scCheck[i] = $("#score" + player + "-" + i + "")[0].innerHTML;

        if(!isNaN(Number(scCheck[i])) === true){
            initScore = scCheck[i] + initScore;
        }
    }

    for (let i = 1; i <= golfHoles.length; i++){
        let scoreCheck = $("#score" + player + "-" + i + "")[0].innerHTML;
        if(!isNaN(Number(scoreCheck)) === true){
            initScore = Number(scoreCheck) + initScore;
        }
    }
    $("#total" + player + "")[0].innerHTML = initScore;

}

function getCourseInfo(){

}

function getHoleInfo(course){

}

