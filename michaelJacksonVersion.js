/*
variables: typingMode (bool), numCharUsed(num), typedFirst (Arr), answer (arr), typingMessage (str),displayedText, continuedSpot (num), coverText (str), typedLast(str)

-
set the value of displayedText equal to the typedFirst array + the answer array all converted to a string.
-
if a the period button is pressed
  if typing mode is false
    set typing mode to true

  if typing mode is true
    set typing mode to false
-

-
if typing mode is false and a button is pressed 
  if answer is false and what's typed is the space button, a letter, a number or a symbol (except period)->  ------------- 
    (Test1: console log what's typed)-------------
    If they havent started creating an answer yet append the character to the typedFirst array otherwise, append to the last array ------------- 
    (Test2: console.log the typedFirst array)-----------
  if answer is false and backspace is pressed
    Test3: console.log that backspace was pressed------------
    If they havent started typing an answer yet, pop the character at the end of typedFirst, otherwide, remove (pop) the last item of the typedLast array--------
    Test4: console.log typedFirst--------------
  set displayedText equal to the typedFirst array joined into a string ------------
  (Test5: console.log displayedText)----------------
  set the input line to show the displayedText. 
  (Test6: console.log displayedText) 
  if answer is true -> 
    append the new character to typedLast string
    set the input line to show displayText + new input text 
-

-
if typing mode is true and a button is pressed
  append the new character to the answer array
  set continuedSpot equal to typedFirst.length  +  answer.length
  set coverText equal to typingMessage [typedFirst.length] through typingMessage[continuedSpot] 
  set displayText equal to typedFirst + coverText
  set the input line  to show displayText
*/

document.addEventListener("DOMContentLoaded", () => {
  const body = document.getElementById("body");
  const pageContent = document.getElementById("pageContent");
  const form = document.getElementById("answerForm");
  const ghost = document.getElementById("ghost");
  const scaryImage = document.getElementById("scaryImage");
  const petitionInput = document.getElementById("petition");
  const questionInput = document.getElementById("question");
  const answerDisplay = document.getElementById("answerDisplay");
  const resetButton = document.getElementById("resetButton");
  const hr = document.getElementById("hr");
  const dot1 = document.getElementById("dot1");
  const dot2 = document.getElementById("dot2");
  const dot3 = document.getElementById("dot3");
  const staticScreen = document.getElementById("static");

  const heeheeNoise = new Audio("./heehee.mp3");
  const heeheeNoiseFast = new Audio("./heehee.mp3");
  const heeheeNoiseFaster = new Audio("./heehee.mp3");

  const screamNoise = new Audio("./jumpScares.mp3");
  const trapNoise = new Audio("./trap.mp3");
  const ghostNoise = new Audio("./ghostBreathing.mp3");
  const trappedNoise = new Audio("./trapped.mp3");
  const scaryVoice1 = new Audio("./Scaryvoice1.mp3");
  const scaryVoice2 = new Audio("./Scaryvoice2.mp3");
  const gotEeemNoise = new Audio("./ha-got-eeem.mp3");

  let dot1FadeId;
  let dot2FadeId;
  let dot3FadeId;
  let animatingDots = false;

  const DOUBTFUL_RESPONSES = [
    "Your brain's on vacation.",
    "Even your aura looks lost.",
    "Future? Buy a clue first.",
    "Stars say 'Not worth it.'",
    "I see... nothing, like you.",
    "Your vibes are factory reset.",
    "Doubt me? Go Google it.",
    "Destiny blocked your number.",
    "You're the plot twist: lame.",
    "Magic says 'lol, nah.'",
    "Try again... but smarter.",
    "Ask Siri. I’m retired.",
    "Crystal ball says 'yawn.'",
    "Your energy? 404 not found.",
    "Bad vibes detected, bye.",
    "Tarot cards: 'do better.'",
    "Future's buffering...forever.",
    "You're a horoscope glitch.",
    "No belief? No answers. Bye.",
    "Even the spirits rolled eyes.",
  ];

  trapNoise.loop = true;
  ghostNoise.loop = true;
  heeheeNoise.loop = true;

  heeheeNoiseFast.playbackRate = 1.5; // Faster playback and higher pitch
  heeheeNoiseFast.playbackRate = 2; // Faster playback and higher pitch

  const ORIGINAL_FONT_SIZE = 40;
  const DECREMENT = 6;
  const GHOST_THRESHOLD_FONT_SIZE = 5;
  const ORIGINAL_BODY_BACKGROUND = "#f4f4f9";
  const ORIGINAL_PAGECONTENT_BACKGROUND = "#fff";
  let answerFontSize = ORIGINAL_FONT_SIZE;
  let timesAnswered = 0;
  let secretAnswer = ""; // Stores the secret answer
  let typingMode = false; // Determines if we're in "typing mode"
  let typedFirst = []; // Stores all characters before the 2nd period press.
  let answer = []; //stores the secret answer as an array
  let displayedText = ""; //input line on the question will show this variable
  let continuedSpot; //stores the value of the combined index of typedFirst and answer
  let coverTextArray = []; // stores the text being used to cover the answer while typing
  let coverText;
  let typedLast = []; // stores the last portion of text after the 2nd period press press
  let regularMode = true; // stores the status of the screen (ghost mode, regular mode, and traping mode, trapped mode)
  let ghostMode = false; // stores the status of the screen (ghost mode, regular mode and traping mode, trapped mode)
  let trappingMode = false; // stores the status of the screen (ghost mode, regular mode and traping mode, trapped mode)
  let trappedMode = false; // stores the status of the screen (ghost mode, regular mode and traping mode, trapped mode)
  const typingMessage = "Peter please answer the following question I have about life in today's society";
  const typingMessageArray = typingMessage.split("");
  let messageIndex = 0; // Tracks current character in the typing message
  let timesPlayed = 0; // keeps track of times played. Will reset to 0 every time page refreshes.

  // Hide reset button at the beginning
  resetButton.style.visibility = "hidden";

  // Listen for typing in the petition input
  petitionInput.addEventListener("keydown", (e) => {
    const key = e.key;

    if (e.key === ".") {
      // Toggle typing mode
      typingMode = !typingMode;
      e.preventDefault(); // Prevent the period from showing in the input
      return;
    }
    // console.log("typing mode: ", typingMode);
    // console.log("answer: ", answer);

    ///////////////////////////////////////////////
    if (typingMode == false) {
      //if the space button, a letter, a number, or a symbol (except period) was pressed
      if (/^[\s]$/.test(key) || /^[a-zA-Z]$/.test(key) || /^[0-9]$/.test(key) || /^[!@#$%^&*()_+\-=[\]{};':"\\|,<>/?`~]$/.test(key)) {
        //if the space button, a letter, a number, or a symbol (except period) was pressed
        // //test 1
        //console.log(`You pressed: ${key}`);

        if (answer == false) {
          // they havent started using the hidden feature yet
          typedFirst.push(key);
          // //test 2
          // console.log("typedFirst: ", typedFirst);
        } else {
          // they have already typed their answer
          typedLast.push(key);
          // console.log("typedLast: ", typedLast);
        }
      } else if (e.key === "Backspace") {
        // //test3
        //console.log("Backspace was pressed!");
        if (answer == false) {
          // they havent started using the hidden feature yet
          typedFirst.pop();
          // //test 2
          // console.log("typedFirst: ", typedFirst);
        } else {
          // they have already typed their answer
          typedLast.pop();
          // console.log("typedLast: ", typedLast);
        }
      }
    } else if (typingMode == true) {
      //if the space button, a letter, a number, or a symbol (except period) was pressed
      if (/^[\s]$/.test(key) || /^[a-zA-Z]$/.test(key) || /^[0-9]$/.test(key) || /^[!@#$%^&*()_+\-=[\]{};':"\\|,<>/?`~]$/.test(key)) {
        //set continuedSpot equal to typedFirst.length  +  answer.length
        //set coverText equal to typingMessage [typedFirst.length] through typingMessage[continuedSpot]
        answer.push(key);
        // //test ?
        // console.log("answer: ", answer);
        continuedSpot = typedFirst.length + answer.length;
        for (let i = typedFirst.length; i < continuedSpot; i++) {
          coverTextArray[i] = typingMessageArray[i];
        }

        console.log("coverTextArray: ", coverTextArray);
      } else if (e.key === "Backspace") {
        answer.pop();
        // //test ?
        // console.log("answer: ", answer);
        continuedSpot = typedFirst.length + answer.length;
        coverTextArray.pop();
        // for (let i = typedFirst.length; i < continuedSpot; i++) {
        //   coverTextArray[i] = typingMessageArray[i];
        // }
        // console.log("coverTextArray: ", coverTextArray);
      }
      coverText = coverTextArray.join("");
      // console.log("Cover text:", coverText);
    }

    /////////////////////////////////////////////////////////////////////////

    //setting and displaying typed text
    if (typingMode == false) {
      if (answer == false) {
        displayedText = typedFirst.join("");
      } else {
        displayedText = typedFirst.join("") + coverTextArray.join("") + typedLast.join("");
      }
    } else if (typingMode == true) {
      displayedText = typedFirst.join("") + coverText;
    }
    petitionInput.value = displayedText;
    e.preventDefault(); // Ensure no extra characters show up in input

    //test 5
    console.log("displayed text: ", displayedText);

    //   messageIndex = 0; // Reset message index whenever mode is toggled
    //   petitionInput.value = ""; // Clear the input to start fresh
    //   e.preventDefault(); // Prevent the period from showing in the input
    // } else if (typingMode) {
    //   e.preventDefault(); // Prevent the actual key from appearing in input

    //   // Show the next character in the typing message
    //   if (messageIndex < typingMessage.length) {
    //     petitionInput.value += typingMessage[messageIndex];
    //     messageIndex++;
    //   }

    //   // Accumulate secret answer if we're in typing mode
    //   secretAnswer += e.key;
  });

  // Form submission to show the answer
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const question = questionInput.value.trim();

    //Make Answer visible
    answerDisplay.style.display = "block";
    if (displayedText.length > 0) {
      if (answer.length > 0) {
        // Display the answer if the question and secretAnswer are not empty
        answerDisplay.textContent = `Answer: ${answer.join("")}`;

        //keep track of scary rounds
        timesAnswered++;

        //run scart static screen
        if ((timesAnswered == 2 || timesAnswered == 4) && timesPlayed < 1) {
          // Wait 10 seconds to show the div
          setTimeout(() => {
            staticScreen.style.display = "block";
            hr.style.display = "none";
            if (timesAnswered == 2) {
              scaryVoice1.play();
            } else {
              scaryVoice2.play();
            }
            // Wait 5 seconds after appearing to hide the div
            setTimeout(() => {
              staticScreen.style.display = "none";
              hr.style.display = "block";
            }, 5000);
          }, 5000);
        }
      } else {
        answerDisplay.textContent = DOUBTFUL_RESPONSES[Randomizer(0, DOUBTFUL_RESPONSES.length)];
      }
    } else {
      answerDisplay.textContent = "Please enter a question.";
    }

    //Disable the inputs until the page is reset
    petitionInput.disabled = true;
    questionInput.disabled = true;

    //make the reset button visible
    resetButton.style.visibility = "visible";
  });

  /////////////////////////////////////////////////////////////////////////
  //Reset the game using any key on the keyboard vs having to click a button on the screen
  document.addEventListener("keydown", function (event) {
    if (ghostMode == true) {
      ghostMode = false;
      regularMode = true;

      //reset times answered
      timesAnswered = 0;

      //reset answer font Size to original size
      answerFontSize = ORIGINAL_FONT_SIZE;
      answerDisplay.style.fontSize = `${answerFontSize}px`;

      //reset body and page content background colors
      body.style.backgroundColor = ORIGINAL_BODY_BACKGROUND;
      pageContent.style.backgroundColor = ORIGINAL_PAGECONTENT_BACKGROUND;

      // clear the inputs for the next round
      petitionInput.value = "";
      questionInput.value = "";
      answerDisplay.textContent = "";

      //reset all input variables
      answer = []; // Reset the secret answer
      typedFirst = [];
      coverTextArray = [];
      typedLast = [];

      typingMode = false; // Reset typing mode

      //make form visible again
      form.style.display = "block";
      scaryImage.style.display = "block";
      scaryImage.style.marginLeft = "auto";
      scaryImage.style.marginRight = "auto";
      //enable form inputs
      petitionInput.disabled = false;
      questionInput.disabled = false;

      //hide reset button
      resetButton.style.visibility = "hidden"; //hide the visibility button again

      //hide ghost div
      ghost.style.display = "none";

      //make beeping noise stop
      trappedNoise.pause(); // Pause the audio
      trappedNoise.currentTime = 0; // Reset the audio to the beginning

      //make song stop
      ghostNoise.pause(); // Pause the audio
      ghostNoise.currentTime = 0; // Reset the audio to the beginning

      //make michael jackon stop
      heeheeNoise.pause();
      heeheeNoise.currentTime = 0;

      //play gotEeem noise after first round
      if (timesPlayed == 1) {
        timesPlayed++;
        setTimeout(playGotEeemNoise, 2000);

        function playGotEeemNoise() {
          gotEeemNoise.play();
        }
      }
      //Set animating dots to false
      animatingDots = false;

      return;
    }
  });

  // Clear inputs for the next round
  resetButton.addEventListener("click", () => {
    //set ghost mode once font gets small enough
    if (answerFontSize <= GHOST_THRESHOLD_FONT_SIZE) {
      if (regularMode == true) {
        regularMode = false;
        ghostMode = true;
      } else if (ghostMode == true) {
        ghostMode = false;
        regularMode = true;

        //reset times answered
        timesAnswered = 0;

        //reset answer font Size to original size
        answerFontSize = ORIGINAL_FONT_SIZE;
        answerDisplay.style.fontSize = `${answerFontSize}px`;

        //reset body and page content background colors
        body.style.backgroundColor = ORIGINAL_BODY_BACKGROUND;
        pageContent.style.backgroundColor = ORIGINAL_PAGECONTENT_BACKGROUND;

        // clear the inputs for the next round
        petitionInput.value = "";
        questionInput.value = "";
        answerDisplay.textContent = "";

        //reset all input variables
        answer = []; // Reset the secret answer
        typedFirst = [];
        coverTextArray = [];
        typedLast = [];

        typingMode = false; // Reset typing mode

        //make form visible again
        form.style.display = "block";
        scaryImage.style.display = "block";
        scaryImage.style.marginLeft = "auto";
        scaryImage.style.marginRight = "auto";
        //enable form inputs
        petitionInput.disabled = false;
        questionInput.disabled = false;

        //hide reset button
        resetButton.style.visibility = "hidden"; //hide the visibility button again

        //hide ghost div
        ghost.style.display = "none";

        //make beeping noise stop
        trappedNoise.pause(); // Pause the audio
        trappedNoise.currentTime = 0; // Reset the audio to the beginning

        //make song stop
        ghostNoise.pause(); // Pause the audio
        ghostNoise.currentTime = 0; // Reset the audio to the beginning

        //make michael jackon stop
        heeheeNoise.pause();
        heeheeNoise.currentTime = 0;

        //play gotEeem noise after first round
        if (timesPlayed == 1) {
          timesPlayed++;
          setTimeout(playGotEeemNoise, 2000);

          function playGotEeemNoise() {
            gotEeemNoise.play();
          }
        }
        //Set animating dots to false
        animatingDots = false;

        return;
      }
    }

    //normal pre-ghost reset
    if (regularMode == true) {
      // clear the inputs for the next round
      petitionInput.value = "";
      questionInput.value = "";
      answerDisplay.textContent = "";

      //make font size of answer gradually smaller after a "pranked" round
      if (answer.length > 0 && timesPlayed < 1) {
        answerFontSize = answerFontSize - DECREMENT;
        answerDisplay.style.fontSize = `${answerFontSize}px`;
      }
      //reset all input variables
      answer = []; // Reset the secret answer
      typedFirst = [];
      coverTextArray = [];
      typedLast = [];

      typingMode = false; // Reset typing mode

      //enable form inputs
      petitionInput.disabled = false;
      questionInput.disabled = false;

      //hide reset button
      resetButton.style.visibility = "hidden"; //hide the visibility button again

      //animate scary dots
      if (answerFontSize < ORIGINAL_FONT_SIZE / 2 && animatingDots == false && timesPlayed < 1) {
        //animateDots();
      }
    } else if (ghostMode == true && timesPlayed < 1) {
      //make ghost visible
      makeGhostVisible();

      function makeGhostVisible() {
        timesPlayed++;
        //make body and page content background black
        body.style.backgroundColor = "black";
        pageContent.style.backgroundColor = "black";
        //make form contents dissapear
        form.style.display = "none";
        answerDisplay.style.display = "none";
        scaryImage.style.display = "none";
        //make ghost visible
        ghost.style.display = "block";
        ghost.src = "./michaeljackson.webp";
        ghost.style.width = "100%";
        //play scary noises
        ghostNoise.play();
        screamNoise.play();
        heeheeNoise.play();

        //stop changing the dot location
        clearInterval(dot1FadeId);
        clearInterval(dot2FadeId);
        clearInterval(dot3FadeId);

        //remove fader class from dots
        dot1.classList.remove("fader");
        dot2.classList.remove("fader");
        dot3.classList.remove("fader");

        //make dots invisible
        dot1.style.display = "none";
        dot2.style.display = "none";
        dot3.style.display = "none";
      }
    }
    // else if (trappingMode == true) {
    //   ghost.src = "../images/trapOpen.gif";
    //   ghost.style.width = "100%";
    //   trapNoise.play();
    // } else if (trappedMode == true) {
    //   ghost.src = "../images/trapClosed.gif";
    //   ghost.style.width = "100%";
    //   ghostNoise.pause(); // Pause the audio
    //   ghostNoise.currentTime = 0; // Reset the audio to the beginning
    //   trapNoise.pause(); // Pause the audio
    //   trapNoise.currentTime = 0; // Reset the audio to the beginning
    //   trappedNoise.play();
    // }
  });

  function animateDots() {
    //   // Calculate random position, ensuring the dot stays within screen bounds
    // let randomX = Randomizer(0, 500);
    // let randomY = Randomizer(0, 500);

    console.log("showing dots");
    //change the dots' position
    animatingDots = true;

    dot1FadeId = setInterval(changeDotLocation(dot1), 500);
    dot2FadeId = setInterval(changeDotLocation(dot2), 500);
    dot3FadeId = setInterval(changeDotLocation(dot3), 500);

    //make the dots visible
    dot1.style.display = "block";
    dot2.style.display = "block";
    dot3.style.display = "block";

    //add the fading class to the dots
    dot1.classList.add("fader");
    dot2.classList.add("fader");
    dot3.classList.add("fader");

    function changeDotLocation(dot) {
      dot.style.marginLeft = `${Randomizer(0, 500)}px`;
      dot.style.marginTop = `${Randomizer(0, 500)}px`;
    }
  }
  // function animateDot(dot, nextDot) {
  //   dot.style.animation = "scaryDots1 0.3s infinite";

  //   // Calculate random position, ensuring the dot stays within screen bounds
  //   let randomX = Randomizer(0, 50);
  //   let randomY = Randomizer(0, 30);

  //   // Update dot position
  //   dot.style.left = `${randomX}%`;
  //   dot.style.top = `${randomY}vh`;
  //   dot.addEventListener(
  //     "animationend",
  //     function () {
  //       dot.style.animation = ""; // Reset animation
  //       if (nextDot) {
  //         animateDot(
  //           nextDot,
  //           nextDot === dot3 ? dot1 : nextDot.nextElementSibling
  //         );
  //       }
  //     },
  //     { once: true }
  //   ); // Event listener fires once per animation cycle
  // }

  // // Start the first animation
  // animateDot(dot1, dot2);
});

// To generate a random integer between 2 integer values use (minInt - maxInt)
function Randomizer(min, max) {
  min = Math.ceil(min); // rounds a number up to the nearest whole number.
  max = Math.floor(max); // rounds a number down to the nearest whole number
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function removeFadeInAndOutClass(dot) {
  dot.classList.remove("fader");
}
// // Function to set random position
// function setRandomPosition(item) {
//   const screenWidth = window.innerWidth;
//   const screenHeight = window.innerHeight;

//   // Calculate random position, ensuring the dot stays within screen bounds
//   let randomX = Randomizer(0, 50);
//   let randomY = Randomizer(0, 30);

//   // Update dot position
//   item.style.left = `${randomX}%`;
//   item.style.top = `${randomY}vh`;
// }

// // Listen for animation iteration
// dot1.addEventListener("animationed", setRandomPosition(dot2));
// dot2.addEventListener("animationed", setRandomPosition(dot3));

// // Set initial position
// setRandomPosition(dot1);
