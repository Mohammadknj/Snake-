let cells = document.querySelectorAll("td");
let goingType = 'Right'
let cnt = 0;
let houses = [[], [], [], [], [], [], [], [], [], []];
for (let i = 0; i < 10; i++) {
   for (let j = 0; j < 10; j++) {
      houses[i][j] = cells[cnt];
      cnt++;
   }
}
function setFood(){
   while(true){
      let randomRow = Math.floor(Math.random()*10);
      let randomCol = Math.floor(Math.random()*10);
      console.log(randomRow + ' ' + randomCol)
      if(houses[randomRow][randomCol].classList==''){
         houses[randomRow][randomCol].classList = 'food'
         break
      }
   }
}
setFood()