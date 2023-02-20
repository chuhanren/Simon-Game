var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = []
var userClickedPattern = []
var gameOn = false;
var level = 0;

$("h1").html("Press A Key to Start");

$(document).keypress(function() {
    if (!gameOn){
        $("h1").html("Level " + level);
        nextSequence();
        gameOn = true;
    }
});

 //1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {
    //Store button's id
    var userChosenColour = $(this).attr("id"); //get attribute 
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    
})

function nextSequence() {
    //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];
    level ++;
    $("h1").html("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

/*play sound function*/
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

/*animate press*/
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100); //remove pressed class
}

function checkAnswer(currentLevel) {
    //check if the most recent user answer is the same as the game pattern
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        //If the user got the most recent, check if finished the sequence
        if (userClickedPattern.length === gamePattern.length){
        setTimeout(function() {
            nextSequence(); 
        }, 1000);
    }
    } else {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 1000);
        $("h1").html("Game Over, Press Any Key to Restart");
        startOver();

    }
  }

function startOver() {
    gameOn = false;
    level = 0;
    gamePattern = [];
}