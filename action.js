
let golfHoles = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];
let numPlayers = 4;

loadPlayers();

function createCard(){
    for (let i = 0; i < golfHoles.length; i++){
        $(".right").append("<div id='col" + i +"'class='column'><div class='colHeader'>" + (i + 1) + "</div></div>");
    }
}

function loadPlayers(){
    for(let i = 0; i < numPlayers; i++){
        $(".left").append("<div class='playerLabel' contenteditable='true'>Player " + (i + 1) + "</div>");
    }
}

function addPlayer(){
    numPlayers++;
    $(".left").append("<div class='playerLabel' contenteditable='true'>Player " + numPlayers + "</div>");
}
