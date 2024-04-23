(function () {
  var hourHTML = document.querySelector(".hour");
  var minHTML = document.querySelector(".mins");
  var secHTML = document.querySelector(".sec");

  var startButtonHTML = document.querySelector(".start");
  var stopButtonHTML = document.querySelector(".stop");
  var resetButtonHTML = document.querySelector(".reset");

  var countDownTimer = null;

  startButtonHTML.addEventListener("click", () => {
    if (hourHTML.value == 0 && minHTML.value == 0 && secHTML.value == 0) return;

    function startTimer() {
      startButtonHTML.style.display = "none";
      stopButtonHTML.style.display = "initial";

      // Idea is to run the timer function every one second
      countDownTimer = setInterval(() => {
        timer();
      }, 1000);
    }

    startTimer();
  });

  stopButtonHTML.addEventListener("click", () => {
    stopTimer("pause");
  });

  resetButtonHTML.addEventListener("click", () => {
    hourHTML.value = 0;
    minHTML.value = 0;
    secHTML.value = 0;

    stopTimer();
  });

  function timer() {
    // Validation for invalid data
    if (secHTML.value > 60) {
      minHTML.value++;
      secHTML.value = parseInt(secHTML.value) - 59;
    }
    if (minHTML.value > 60) {
      hourHTML.value++;
      minHTML.value = parseInt(minHTML.value) - 60;
    }

    if (hourHTML.value == 0 && minHTML.value == 0 && secHTML.value == 0) {
      hourHTML.value = "";
      minHTML.value = "";
      secHTML.value = "";
      stopTimer();
    }
    // Second Timer Logic
    else if (secHTML.value != 0) {
      secHTML.value = `${secHTML.value <= 10 ? "0" : ""}${secHTML.value - 1}`;
    }
    // Second is zero but min is not 0
    else if (minHTML.value != 0 && secHTML.value == 0) {
      secHTML.value = 59; // We are going to start the second timer again
      minHTML.value = `${minHTML.value <= 10 ? "0" : ""}${minHTML.value - 1}`;
    }
    // Same thing for the hour
    else if (hourHTML.value != 0 && minHTML.value == 0) {
      minHTML.value = 60; // We are going to start the second timer again
      hourHTML.value = `${hourHTML.value <= 10 ? "0" : ""}${
        hourHTML.value - 1
      }`;
    }
  }

  function stopTimer(state = null) {
    state === "pause"
      ? (startButtonHTML.innerHTML = "Continue")
      : (startButtonHTML.innerHTML = "Start");

    startButtonHTML.style.display = "initial";
    stopButtonHTML.style.display = "none";
    clearInterval(countDownTimer);
  }
})();
