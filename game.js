alert("Instruction/How to Play\n\n1. Start the game by pressing the any key on your Keyboard.\n2. Observe as the game lights up and plays a sequence of colored lights and tones.\n3. Memorize the sequence that was just played.\n4. Repeat the sequence by pressing the corresponding colored buttons in the exact same order.\n5. If you're correct, the game adds another step to the sequence. A mistake results in a wrong sound.\n6. Continue by repeating and memorizing the sequence, which grows progressively longer.")

var buttonColours=["red","blue","green","yellow"];

var gamePattern=[];

var userClickedPattern=[];

var level=0;

var started= false;
// var randomChosenColour = buttonColours[nextSequence()]

$(".btn").click(function(){
    userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})

$(document).on("keydown",function(){
    if(!started){   //or started==false
        $("#level-title").text("Level  "+ level);
        nextSequence();
        started=true;
    }
})

function nextSequence(){

    userClickedPattern=[];

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber= Math.floor(Math.random()*4);
    // return randomNumber;

    var randomChosenColour = buttonColours[randomNumber];
    // console.log(randomChosenColour);

    gamePattern.push(randomChosenColour);
    // console.log(gamePattern);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

function checkAnswer(currentLevel){
    // console.log(gamePattern);
    // console.log(userClickedPattern);
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
        // console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence(); 
            }, 1000);
        }
    }
    else{
        $("#level-title").text("Game Over, Press Any Key to Restart");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200)
        
        startOver();
    }
}

function startOver(){
    started=false;
    gamePattern=[];
    level=0;
}
  
function playSound(name){
    var audio= new Audio("sounds/"+ name +".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },100);
}


// 2nd way
// randomChosenColour = nextSequence(buttonColours)
// function nextSequence(array){
//     var randomNumber= Math.floor(Math.random()*4);
//     randomNumber=array[randomNumber];
//     return randomNumber;
// }