
var buttonColours = ["red", "blue", "green", "yellow", "brown", "orange", "pink", "purple"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function () {
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
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart. (Remember, the patterns add up!)");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  if (level === 10) {
    $("body").addClass("newPoint10");
    playWinning();
  }
  if (level === 20) {
    $("body").addClass("newPoint20");
    playWinning();
  }
  if (level === 10 || level === 20) {
    $("#level-title").text("Welcome to checkpoint Level " + level + "!");
  }
  else {
    $("#level-title").text("Level " + level);
  }

  var randomNumber = Math.floor(Math.random() * 8);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  if (level === 10 || level === 20) {
    setTimeout(function () {
      playSound(randomChosenColour);
    }, 5000);
  }
  else {
    playSound(randomChosenColour);
  }

}


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function playWinning() {
  var audio2 = new Audio("sounds/arcadeWin.mp3");
  audio2.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
