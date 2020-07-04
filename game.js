// main simon game variables
let gamePattern = [];
let userClickPattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let started = false;
let level = 0;

// key press to start the game or to restart
$(document).keydown(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    } else if (started) {
        startOver();
    };
});

// user select a color by clicking on any box
$(".btn").click(function() {
    let userChosenColor = $(this).attr("id");
    userClickPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    let buttonsClicked = userClickPattern.length - 1;
    checkAnswer(buttonsClicked);
});

// check to see if user clicks match computer's pattern
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
            console.log("success");
     if (userClickPattern.length === gamePattern.length) {
        setTimeout(function() {
            nextSequence();
        }, 1000);
     }
    } else { //if the user is incorrect
        console.log("wrong");
        $("#level-title").text("Game Over, Press any Key to Restart");
        playSound("wrong");
        $("body").addClass('game-over');
        setTimeout(function() {
          $("body").removeClass('game-over');
        }, 200);
    }
};

// generates the level and game pattern
function nextSequence() {
    level++;
    userClickPattern = [];
    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100); 
    playSound(randomChosenColor);
};

// restarts the game
function startOver() {
    level = 0
    gamePattern = [];
    started = false;
};

// plays game sounds
function playSound(name) {
    let sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
};

// animates button when clicked
function animatePress(currentColor) {
    $('.btn').on('click', function() {
        var $el = $(this).addClass('pressed');
        setTimeout(function() {
          $el.removeClass('pressed');
        }, 100);
      });
  
};



