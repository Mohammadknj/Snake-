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
      //console.log(randomRow + " " + randomCol);
      if (houses[randomRow][randomCol].classList == "") {
         houses[randomRow][randomCol].classList = "food";
         break;
      }
   }
}
setFood();
let head = houses[6][4];
let tail = houses[6][2];
let Row = 6,
   Col = 4;
console.log(head)
console.log(tail)
function checkFinished(){
   if(Row==10||Col==10||Row==-1||Col==-1){
      continuing = false
   }
}
function go() {
   body[0].classList = "circle";
   if (goingType == "Right") {Col++
      houses[Row][Col].classList = "head";
   } else if (goingType == "Left") {Col--
      houses[Row][Col].classList = "head";
   } else if (goingType == "Up") {Row--
      houses[Row][Col].classList = "head";
   } else if (goingType == "Down") {Row++
      houses[Row][Col].classList = "head";
   }
   body.unshift(houses[Row][Col]);
   head = body[0];
   tail = body.pop();
   tail.classList = "";
   tail = body[body.length - 1];
   checkFinished()
}

//go()
// function findHead() {
//    let Row, Col;
//    for (let i = 0; i < 10; i++) {
//       for (let j = 0; j < 10; j++) {
//          if (houses[i][j] == body[0]) {
//             Row = i;
//             Col = j;
//             return [Row, Col];
//          }
//       }
//    }
// }
function goUp() {
   if (goingType == "Right" || goingType == "Left") {
      //let [Row, Col] = findHead();
      body[0].classList = "circle";
      houses[Row - 1][Col].classList = "head";
      houses[Row - 1][Col].style.backgroundImage =
         "url(Pictures/SnakeHeadUp.png)";
      body.unshift(houses[Row - 1][Col]);
      Row--;
      tail = body.pop();
      tail.classList = "";
      goingType = "Up";
   }
}
function goRight() {
   if (goingType == "Up" || goingType == "Down") {
      let [Row, Col] = findHead();
      body[0].classList = "circle";
      houses[Row][Col + 1].classList = "head";
      houses[Row][Col + 1].style.backgroundImage =
         "url(Pictures/SnakeHeadRight.png)";
      body.unshift(houses[Row - 1][Col]);
      Col++;
      tail = body.pop();
      tail.classList = "";
      goingType = "Right";
   }
}
document.addEventListener("keydown", (key) => {
   if (continuing) {
      if (key.code == "ArrowUp") {
         continuing = false
      } else if (key.code == "ArrowDown") {
         goDown();
      } else if (key.code == "ArrowLeft") {
         goLeft();
      } else if (key.code == "ArrowRight") {
         goRight();
      }
      go();
   }
});
cnt = 1;
while (continuing) {
   setTimeout(() => {
      go();
   }, seconds[secondsCounter] * cnt);
   cnt++;
   if(cnt==10000){
      break
   }
}