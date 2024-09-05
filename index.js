let cells = document.querySelectorAll("td");
let goingType = "Right";
let continuing = true;
let seconds = [1000, 900, 800, 700, 600, 500, 400, 300, 200, 100];
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
      if (houses[foodRow][foodCol].classList == "") {
         houses[foodRow][foodCol].classList = "food";
         break;
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
   }
}
function go() {
   if (continuing) {
      head.style.backgroundImage = "";
      body[0].classList = "circle";
      if (goingType == "Right") {
         Col++;
         houses[Row][Col].classList = "head";
      } else if (goingType == "Left") {
         Col--;
         houses[Row][Col].classList = "head";
      } else if (goingType == "Up") {
         Row--;
         houses[Row][Col].classList = "head";
      } else if (goingType == "Down") {
         Row++;
         houses[Row][Col].classList = "head";
      }
      body.unshift(houses[Row][Col]);
      head = body[0];
      head.style.backgroundImage = `url(Pictures/SnakeHead${goingType}.png)`;
      if (Row == foodRow && Col == foodCol) {
         score.innerHTML++;
         setFood();
         secondsCounter = Math.floor(Number(score.innerHTML / 5));
      } else {
         tail = body.pop();
         tail.classList = "";
         tail = body[body.length - 1];
      }
      checkFinished();
      if (continuing) {
         cnt = 1;
         setTimeout(() => {
            //if (saved != "") goingType = saved;
            go();
            //saved = "";
         }, seconds[secondsCounter] * cnt);
         cnt++;
      }
   }
}
go();
function lose() {
   if (houses[Row - 1][Col] != body[0]) {
      continuing = false;
      head.style.backgroundImage = `url(Pictures/SnakeHead${goingType}.png)`;
   }
}
let goingTypeChanged = false;
let saved = "";
function goUp() {
   if (goingType == "Right" || goingType == "Left") {
      if (!goingTypeChanged) {
         goingType = "Up";
         //if (houses[Row - 1][Col].classList == "circle") lose();
         goingTypeChanged = true;
         falser();
      }else saved = "Up";
      // setTimeout(() => {
      // goingTypeChanged = false;
      // }, seconds[secondsCounter]);
      // } 
   }
}
function goRight() {
   if (goingType == "Up" || goingType == "Down") {
      if (!goingTypeChanged) {
         goingType = "Right";
         //if (houses[Row][Col + 1].classList == "circle") lose();
         goingTypeChanged = true;
         falser();
      }else saved = "Right";
      // setTimeout(() => {
      // goingTypeChanged = false;
      // }, seconds[secondsCounter]);
      // } 
   }
}
function goDown() {
   if (goingType == "Right" || goingType == "Left") {
      if (!goingTypeChanged) {
         goingType = "Down";
         //if (houses[Row + 1][Col].classList == "circle") lose();
         goingTypeChanged = true;
         falser();
      }else saved = "Down";
      //setTimeout(() => {
      //   goingTypeChanged = false;
      //}, seconds[secondsCounter]);
      //} 
   }
}
function goLeft() {
   if (goingType == "Up" || goingType == "Down") {
      if (!goingTypeChanged) {
         goingType = "Left";
         //if (houses[Row][Col - 1].classList == "circle") lose();
         goingTypeChanged = true;
         falser();
      }else saved = "Left";
      //setTimeout(() => {
      //   goingTypeChanged = false;
      //}, seconds[secondsCounter]);
      //} 
   }
}
function falser() {
   setTimeout(() => {
      goingTypeChanged = false;
      if(saved!='')
      goingType = saved
      saved = ''
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
      // changed =
   }
});
// while (continuing) {
//    // for (;;) {
//    cnt = 1;
//    setTimeout(() => {
//       go();
//    }, seconds[secondsCounter] * cnt);
//    cnt++;
//    // checkFinished()
//    if (cnt==100000) break;
// }
// //}
