//
//
const lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};
const hardWords = [
  "Code",
  "Town",
  "City",
  "Hose",
  "Door",
  "Hello",
  "Github",
  "Calculation",
  "Parent",
  "Hacking",
  "Welcome",
  "Amazing",
  "Twitter",
  "Youtube",
  "Pattern",
  "Algorithmic",
  "Facebook",
  "Linkedin",
  "Cleaning",
  "Beautiful",
  "Marketing",
  "Javascript",
  "Programming",
  "Mathematics",
];
const normalWords = hardWords.slice(0, 16);
const easyWords = hardWords.slice(0, 8);

let currentWordsArr = [];

// selectors
let startBtn = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");

let levelSelector = document.querySelector(".levels-selector");

levelSelector.onchange = () => {
  changingTextInfo();
};

function changingTextInfo() {
  let scoreTotal = document.querySelector(".score .total");

  if (levelSelector.value == "Easy") {
    scoreTotal.innerHTML = easyWords.length;
    currentWordsArr = [...easyWords];
  } else if (levelSelector.value == "Normal") {
    scoreTotal.innerHTML = normalWords.length;
    currentWordsArr = [...normalWords];
  } else {
    scoreTotal.innerHTML = hardWords.length;
    currentWordsArr = [...hardWords];
  }

  lvlNameSpan.innerHTML = levelSelector.value;
  secondsSpan.innerHTML = `${lvls[levelSelector.value]}`;
  timeLeftSpan.innerHTML = `${lvls[levelSelector.value]}`;
  scoreGot.innerHTML = 0;
}
changingTextInfo();

input.onpaste = () => false;

startBtn.addEventListener("click", () => {
  levelSelector.setAttribute("disabled", "");
  startBtn.style.display = "none";
  input.focus();

  setWordsFirstly();
  generateWords();
});

function setWordsFirstly() {
  upcomingWords.innerHTML = "";
  for (let i = 0; i < currentWordsArr.length; i++) {
    let div = `<div class="${currentWordsArr[i]}">${currentWordsArr[i]}</div>`;
    upcomingWords.innerHTML += div;
  }
}

function generateWords() {
  let randomWord =
    currentWordsArr[Math.trunc(Math.random() * currentWordsArr.length)];
  let indexWord = currentWordsArr.indexOf(randomWord);
  currentWordsArr.splice(indexWord, 1);
  theWord.innerHTML = randomWord;
  document.querySelector(`.${randomWord}`).remove();

  startPlay();
}

function startPlay() {
  timeLeftSpan.innerHTML = lvls[levelSelector.value];
  let counter = setInterval(() => {
    timeLeftSpan.innerHTML--;
    let isMatch =
      theWord.innerHTML.toLowerCase() == input.value.toLowerCase().trim();

    if (timeLeftSpan.innerHTML == 0 || isMatch) {
      clearInterval(counter);
      isMatch ? checkComingWord() : endGame(false);
    }
  }, 1000);
}

function checkComingWord() {
  scoreGot.innerHTML++;
  input.value = "";

  if (currentWordsArr.length > 0) {
    generateWords();
  } else {
    endGame(true);
  }
}

function endGame(isWinner) {
  let score = document.querySelector(".score").textContent.trim();
  let finish = document.querySelector(".finish");
  let span = document.querySelector(".finish .box span");
  setTimeout(() => {
    document.querySelector(".finish .box").style.display = "block";
  }, 200);
  finish.classList.add("show");
  span.innerHTML = score;

  let color = isWinner ? "#70e17b" : "#d54309";
  let mass = isWinner ? "CONGRATULATIONS" : "GAME OVER!!";
  span.nextElementSibling.innerHTML = mass;
  span.nextElementSibling.style.color = color;

  theWord.innerHTML = "";
  localStorage.setItem(Date.now(), score);
  checkToPlayAgain();
}

function checkToPlayAgain() {
  let checkBtn = document.querySelector(".check-btn");

  checkBtn.addEventListener("click", () => {
    document.querySelector(".finish").classList.remove("show");
    document.querySelector(".finish .box").style.display = "none";
    input.value = "";
    changingTextInfo();
    startBtn.style.display = "block";
    levelSelector.removeAttribute("disabled");
  });
}
