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
function setFood() {
   while (true) {
      let randomRow = Math.floor(Math.random() * 10);
      let randomCol = Math.floor(Math.random() * 10);
      console.log(randomRow + " " + randomCol);
      if (houses[randomRow][randomCol].classList == "") {
         houses[randomRow][randomCol].classList = "food";
         break;
      }
   }
}
setFood();
// function going(){
//    if(continuing){
//       if(goingType=='Right'){

//       }else if(goingType=='Left'){

//       }else if(goingType=='Up'){

//       }else if(goingType=='Down'){

//       }
//    }
// }
// let rcnt = 0
// while (rcnt<3) {
//    setTimeout(() => {
//       let head = body[0];
//       head.classList = "circle";

//       let tail = body.pop();
//       tail.classList = "";
//    }, seconds[secondsCounter]*rcnt);rcnt++
// }
let counter = 1;
function go() {
   //setTimeout(() => {
   body[0].classList = "circle";
   houses[6][4 + counter].classList = "head";
   body.unshift(houses[6][4 + counter]);
   counter++;
   let tail = body.pop();
   tail.classList = "";
   //}, seconds[secondsCounter]);
}

for (let index = 1; index <= 3; index++) {
   setTimeout(() => {
      go();
   }, seconds[secondsCounter] * index);
   // if(index==2)secondsCounter++
}

function goUp() {
   if (goingType == "Right" || goingType == "Left") {
      let Row, Col;
      for (let i = 0; i < 10; i++) {
         for (let j = 0; j < 10; j++) {
            if (houses[i][j] == body[0]) {
               Row = i;
               Col = j;
            }
         }
      }
      body[0].classList = "circle";
      houses[Row-1][Col].classList = "head";
      body.unshift(houses[Row-1][Col]);
      Row--;
      let tail = body.pop();
      tail.classList = "";
   }
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
