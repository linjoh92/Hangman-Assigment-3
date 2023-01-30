
$(function () {

    const wordsArray = [
    "baking",
    "bells",
    "candy", 
    "carols",
    "christmas", 
    "cookies",
    "eggnog",
    "elf",
    "gift", 
    "gingerbread",
    "mistletoe",
    "porrige", 
    "reindeer",
    "santa", 
    "stocking",
    ];

    let chosenWord;
    let feedback;
    let correctLetters;
    let inCorrectLetters;
    let gussesLeft;
    let numberPattern;
    let endAlert;
    let playedTimes = 0;
    let wonTimes = 0;
    let lostTimes = 0;

    function play() { 
        defautltvalue();
        $(".btn-container").hide();
        $(".give-up").addClass("active");
        $(".counter-container").addClass("active");
        $(".input-container").addClass("active");
        $(".img").addClass("active");
        $(".word").removeClass("winn").removeClass("lost").removeClass("hide").addClass("active");
        displayWord();
        displayFeedback();
        playedTimes++;
    }
   
    function defautltvalue() {
        chosenWord = (wordsArray[Math.floor(Math.random() * wordsArray.length)]);
        feedback = "Find the word before you die! ";
        correctLetters = [];
        inCorrectLetters = [];
        gussesLeft = 10;
        numberPattern = /^[0-9]$/;
        endAlert = " Press the Start-button to play again";
        $(".played-times").text("Games: " + playedTimes)
        $(".won-times").text("Won: " + wonTimes)
        $(".lost-times").text("Lost: " + lostTimes)
        $(".img").css('background-image', 'url(resource/img/Hangman_img_0.png)');
    }

    function setImg() {
        let triedTimes = 10 - gussesLeft;
        $(".img").css('background-image', 'url(resource/img/Hangman_img_' + triedTimes + '.png)');
    }

    function displayFeedback() {
        $(".feedback").text(feedback + " You have " + gussesLeft + " guesses left");
    }

    function hasWon() {
       for (let i = 0; i < chosenWord.length; i++) {
            if (!correctLetters.includes(chosenWord.charAt(i))) {
                return false;
            }
       }
       return true;
    }

    function hasLost() {
        return !hasWon() && gussesLeft == 0;
    }  
    
    function isCorrectLetter(singleLetter) {
        return chosenWord.includes(singleLetter);   
    }

    function displayWord(){
        let wordToDisplay = "";

        for (let i = 0; i < chosenWord.length; i++) {
            const LetterToCheck = chosenWord.charAt(i);
            if (correctLetters.includes(LetterToCheck)) {
                wordToDisplay += LetterToCheck;
            } else {
                wordToDisplay += "_";
            }
            wordToDisplay += " ";
        }
        return $(".word").text(wordToDisplay.toUpperCase());
    }

    function resetElement() {
        $(".give-up").removeClass("active");
        $(".counter-container").removeClass("active");
        $(".input-container").removeClass("active");
        $(".btn-container").show();
    
        if (hasWon()) {
            $(".img").removeClass("active");
            $(".word").addClass("winn");
            $(".feedback").text("Congrats! You have won!" + endAlert);
            wonTimes++;
        } else if (hasLost()) {
            $(".word").addClass("lost");
            $(".feedback").text("You lost! The correct word was " + chosenWord.toUpperCase() + endAlert);   
            lostTimes++;
        } else {
            $(".img").removeClass("active");
            $(".word").addClass("hide").removeClass("active");
            $(".feedback").text("Give up? " + endAlert);
            lostTimes++;
        }
    }

    function tryLetter() {
        const guess = $("#playerInput").val().toLowerCase();

        if (correctLetters.includes(guess) || inCorrectLetters.includes(guess)) {
        feedback = "You have already tried that letter. ";
        } else if (guess.length != 1 || numberPattern.test(guess)) { 
            feedback = "Write only ONE letter NOT two and NOT a number";
        } else {
            if (isCorrectLetter(guess)) {
            correctLetters.push(guess);
            feedback = "Good job! Letter is found!";
            } else {
                inCorrectLetters.push(guess);
                feedback = "That letter is not in the word. ";
                gussesLeft--;
            }
        }
    
        if (hasWon() || hasLost()) {
        resetElement();
        } else {
            displayFeedback();
        }
    
        displayWord();
        setImg();
        $("#playerInput").val('');
    }
 
    $(".play-btn").on("click", play);
    $(".give-up").on("click", resetElement);
    $("#tryLetter").on("click", tryLetter);
    
    $("#playerInput").keyup(function(e) {
        if (e.which === 13){
        $("#tryLetter").click();
        }
    });

});