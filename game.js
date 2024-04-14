var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
 
var started = false;
var level = 0;
let score = 0;
let highScore = localStorage.getItem("highScore");
var isGameOver = false; 
retry.style.display = "none";

$(document).on('keypress touchstart', function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
        isGameOver = false; 
        
    }

});

$(".btn").on("mousedown touchstart" ,function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {  
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence();
            }, 1000);

        }
    } else {
        playSound("wrong")

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");;
        }, 200);

        console.log("wrong");
        //score 
        if (level > 0){
            score = level - 1;
        }  

        //high score 
        if (highScore === null || score > parseInt(highScore)){
            highScore = localStorage.setItem("highScore", score);
            highScore = score;
        }
        
        let displayHighScore = localStorage.getItem("highScore");
               
        
   
        $("#level-title").html(" <span id='over'>Game Over!</span> <br><span id='restart'>Tap to Restart </span> <br> <span id='score'>Score:" +"</span> <br> "+ score + " <br> <span id='hs'>HS</span>:" +"<span id='HSNumber'>" + displayHighScore + "</span>"  );
        $("#restart").css("font-size", "0.5em");

        retry.style.display = "inline";          
        $("#retry").click(function(){
            setTimeout(function () {
                location.reload();
            }, 50);

        }) 
    } 
}
function nextSequence() {
   
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

    level++;
    $("#level-title").text("Level " + level)
     

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}  

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100)
}

function startOver() {
    gamePattern = [];
    started = false;
    level = 0;
}
