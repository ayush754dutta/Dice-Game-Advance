"use strict";

// 1. select elements:

const rollBtn = document.querySelector(".btn--roll");
const img = document.querySelector(".dice");
const player1Score = document.querySelector("#score--0");
const player2Score = document.querySelector("#score--1");
const holdBtn = document.querySelector(".btn--hold");
const newBtn = document.querySelector(".btn--new");

// game scores and player
let activePLayer = 0;
let score = 0;
const totalScore = [0, 0];
let playing = true;

player1Score.textContent = player2Score.textContent = score;
// 2. generate random no.
let random = Math.trunc(Math.random() * 6) + 1;

// 3. remove image from document flow
img.classList.add("hidden");

// 4. fn for img display

const displayImg = function () {
  random = Math.trunc(Math.random() * 6) + 1;
  img.src = `./dice-${random}.png`;
  img.classList.remove("hidden");
};

// 5. roll btn event
rollBtn.onclick = (e) => {
  if (playing) {
    displayImg();

    if (random !== 1) {
      score += random;
      totalScore[activePLayer] += score;
      document.querySelector(`#score--${activePLayer}`).textContent = score;
      document.querySelector(`#current--${activePLayer}`).textContent =
        totalScore[activePLayer];
    } else {
      document
        .querySelector(`.player--${activePLayer}`)
        .classList.toggle("player--active");

      // 6.  switching active player
      activePLayer = activePLayer === 0 ? 1 : 0;

      document
        .querySelector(`.player--${activePLayer}`)
        .classList.toggle("player--active");
      score = 0;
      document.querySelector(`#score--${activePLayer}`).textContent = 0;
    }

    const winner = () => {
      if (totalScore[activePLayer] > 36) {
        document
          .querySelector(`.player--${activePLayer}`)
          .classList.add("player--winner");
        playing = false;
      }
    };
    winner();
  }
};

// 7. hold btn event

holdBtn.onclick = (e) => {
  document
    .querySelector(`.player--${activePLayer}`)
    .classList.toggle("player--active");
  activePLayer = activePLayer === 0 ? 1 : 0;
  score = 0;
  document.querySelector(`#score--${activePLayer}`).textContent =
    totalScore[activePLayer];
  document
    .querySelector(`.player--${activePLayer}`)
    .classList.toggle("player--active");
};

console.log(document.querySelector(`.score--${activePLayer}`));

// 8. new btn event

newBtn.onclick = (e) => {
  document
    .querySelector(`.player--${activePLayer}`)
    .classList.remove("player--winner");
  playing = true;
  score = 0;
  totalScore[0] = totalScore[totalScore.length - 1] = score;
  activePLayer = 0;
  document.querySelector(".player--0").classList.add("player--active");
  document.querySelector(".player--1").classList.remove("player--active");
  document.querySelector("#score--0").textContent = totalScore[0];
  document.querySelector("#score--1").textContent =
    totalScore[totalScore.length - 1];
  document.querySelector("#current--0").textContent = score;
  document.querySelector("#current--1").textContent = score;
  img.classList.add("hidden");
};
