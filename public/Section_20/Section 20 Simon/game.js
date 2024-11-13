var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$("body").on("keydown", function () {
  if (gamePattern.length == 0) {
    nextSequence();
  }
});

$(".play").on("click", function () {
  if (gamePattern.length == 0) {
    nextSequence();
    $(".play").hide();
  }
});

$(".btn").on("click", function (e) {
  var userChosenColor = e.currentTarget.id;
  playSound(userChosenColor);
  animatePress(userChosenColor);
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
  console.log(userChosenColor);
  console.log("Current Pattern is = " + userClickedPattern);
  console.log("Current game Pattern is = " + gamePattern);
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body")
      .addClass("game-over")
      .delay(200)
      .queue(function () {
        $("body").removeClass("game-over").dequeue();
      });
    $("h1").text("Game Over, Press Any Key to Restart!");
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  gamePattern.push(buttonColors[randomNumber]);
  playSound(gamePattern[gamePattern.length - 1]);
  $("." + gamePattern[gamePattern.length - 1])
    .fadeOut(100)
    .fadeIn(100);
}

function playSound(e) {
  new Audio("./sounds/" + e + ".mp3").play();
}

function animatePress(e) {
  $("#" + e)
    .addClass("pressed")
    .delay(100)
    .queue(function () {
      $("#" + e)
        .removeClass("pressed")
        .dequeue();
    });
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  $(".play").toggle();
}
