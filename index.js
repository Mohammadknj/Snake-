let cells = document.querySelectorAll("td");
let goingType = "Right";
let continuing = true;
let seconds = [800, 700, 600, 500, 400, 300, 200, 100];
let secondsCounter = 0;
let cnt = 0;
let houses = [[], [], [], [], [], [], [], [], [], []];
for (let i = 0; i < 10; i++) {
   for (let j = 0; j < 10; j++) {
      houses[i][j] = cells[cnt];
      cnt++;
   }
}
let body = [houses[6][4], houses[6][3], houses[6][2]];
let foodRow, foodCol;
function setFood() {
   while (true) {
      foodRow = Math.floor(Math.random() * 10);
      foodCol = Math.floor(Math.random() * 10);
      if (foodRow > 0 && foodRow < 9 && foodCol > 0 && foodCol < 9) {
         if (houses[foodRow][foodCol].classList == "") {
            houses[foodRow][foodCol].classList = "food";
            break;
         }
      }
   }
}
setFood();
let score = document.querySelector(".score > h2");
let head = houses[6][4];
let tail = houses[6][2];
let Row = 6,
   Col = 4;
function checkFinished() {
   if (Row == 9 || Col == 9 || Row == 0 || Col == 0) {
      continuing = false;
      ShowMessage();
   }
}
function go() {
   if (continuing) {
      if (goingType == "Right") {
         Col++;
         if (houses[Row][Col].classList == "circle") {
            lose();
            return;
         } else houses[Row][Col].classList = "head";
      } else if (goingType == "Left") {
         Col--;
         if (houses[Row][Col].classList == "circle") {
            lose();
            return;
         } else houses[Row][Col].classList = "head";
      } else if (goingType == "Up") {
         Row--;
         if (houses[Row][Col].classList == "circle") {
            lose();
            return;
         } else houses[Row][Col].classList = "head";
      } else if (goingType == "Down") {
         Row++;
         if (houses[Row][Col].classList == "circle") {
            lose();
            return;
         } else houses[Row][Col].classList = "head";
      }
      head.style.backgroundImage = "";
      body[0].classList = "circle";
      body.unshift(houses[Row][Col]);
      head = body[0];
      head.style.backgroundImage = `url(Pictures/SnakeHead${goingType}.png)`;
      if (Row == foodRow && Col == foodCol) {
         score.innerHTML++;
         if (score.innerHTML == 78) {
            win();
            return;
         }
         setFood();
         if (score.innerHTML < 35)
            secondsCounter = Math.floor(Number(score.innerHTML / 5));
         else secondsCounter = 7;
      } else {
         tail = body.pop();
         tail.classList = "";
         tail = body[body.length - 1];
      }
      checkFinished();
      if (continuing) {
         cnt = 1;
         setTimeout(() => {
            go();
         }, seconds[secondsCounter] * cnt);
         cnt++;
      }
   }
}
go();
function ShowMessage() {
   setTimeout(() => {
      document.querySelector(".blacker").style.display = "inline-block";
      document.querySelector(".message").style.display = "flex";
   }, 1000);
}
function lose() {
   continuing = false;
   head.style.backgroundImage = `url(Pictures/SnakeHead${goingType}.png)`;
   ShowMessage();
}
function win() {
   continuing = false;
   document.querySelector(".message > h1").innerHTML = "Hooora!!";
   document.querySelector(".message > h2").innerHTML =
      "Congratulation, Nobody can reach this level.<br> Try again?";
   ShowMessage();
}
let goingTypeChanged = false;
let saved = "";
function goUp() {
   if (goingType == "Right" || goingType == "Left") {
      if (!goingTypeChanged) {
         goingType = "Up";
         goingTypeChanged = true;
         falser();
      } else saved = "Up";
   }
}
function goRight() {
   if (goingType == "Up" || goingType == "Down") {
      if (!goingTypeChanged) {
         goingType = "Right";
         goingTypeChanged = true;
         falser();
      } else saved = "Right";
   }
}
function goDown() {
   if (goingType == "Right" || goingType == "Left") {
      if (!goingTypeChanged) {
         goingType = "Down";
         goingTypeChanged = true;
         falser();
      } else saved = "Down";
   }
}
function goLeft() {
   if (goingType == "Up" || goingType == "Down") {
      if (!goingTypeChanged) {
         goingType = "Left";
         goingTypeChanged = true;
         falser();
      } else saved = "Left";
   }
}
function falser() {
   setTimeout(() => {
      goingTypeChanged = false;
      if (saved != "") goingType = saved;
      saved = "";
   }, seconds[secondsCounter]);
}
document.addEventListener("keydown", (key) => {
   if (continuing) {
      if (key.code == "ArrowUp") {
         goUp();
      } else if (key.code == "ArrowDown") {
         goDown();
      } else if (key.code == "ArrowLeft") {
         goLeft();
      } else if (key.code == "ArrowRight") {
         goRight();
      }
   }
});
document.getElementById("Retry").addEventListener("click", () => {
   setTimeout(() => {
      location.reload();
   }, 500);
});
