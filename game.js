//pop-ups
var alertShown = localStorage.getItem("alertShown");
if (!alertShown) {
    alert("v.0.2.5 is the final update ,there will no longer be any updates or maintenance due to random caching errors, the game is reverted back to v.0.2.3 (stable version), if you wish to play v.0.2.4 which includes ~ 1.HighScore count 2. Start failure prevention  3. Fixed Spam glitch 4. Desktop and Mobile compatibity 5.Fancy animations , contact for gamefile. This Update includes ~ 1. One time POP-UPS + v.0.2.3 | Thank You For Playing! ");
    localStorage.setItem("alertShown", true);
}
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
retry.style.display = "none";

$(document).on('keypress touchstart', function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;

    }

});

$(".btn").click(function () {
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
        let score = 0;
        if (level > 0){
            score = level - 1;
        }
   
        $("#level-title").html(" <span id='over'>Game Over!</span> <br><span id='restart'>Tap to Restart </span> <br> <span id='score'>Score:" +"</span> <br>"+ score  );
        $("#score").css("color", "black");
        $("#restart").css("font-size", "0.5em");
        //retry button
        retry.style.display = "inline";
        $("#retry").click(function(){
            location.reload();
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
