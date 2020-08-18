
var grid=[];
var stat=new gameStat();

function gameStat(){

    this.lbool=[];
    this.trial=0;
    this.myWins=0;
    this.cpuWins=0;
    this.reusedMemo=0;
    this.curStat=[0,0,0,0,0,0,0,0,0];
    this.emptyCell=[];
    this.inMemo=[];
    this.player1=false;
    this.player2=false;
    this.title="Game runnig";
    this.gameRunning=false;
    this.memo=0;
    this.inMemoStat=[];
}

function resetGame(){
   stat.trial++;
   stat.player1=true;
   for(i=0; i<9; i++){
      grid[i]=new unit();
   }

    var k=1;
    var o=1;
    for(i=0; i<9; i++){

        grid[i].x=102*k;
        grid[i].y=102*o;
        k++;
        if(k==4){
           k=1;
           o++;
        }
         grid[i].display();
     }

    stat.emptyCell=9;

}

function keyPressed(){
    resetGame();
}

function checkWinner(check){

    if(meWin(check)){
        stat.title="WIN!"
        stat.myWins++;
        updateMemory();

    }else if(cpuWin(check)){
        stat.title="LOSE"
        stat.cpuWins++;
    }
}

function cpuWin(check){

     if(  check[0]==2 && check[1]==2 && check[2]==2
        ||check[3]==2 && check[4]==2 && check[5]==2
        ||check[6]==2 && check[7]==2 && check[8]==2
        ||check[0]==2 && check[3]==2 && check[6]==2
        ||check[1]==2 && check[4]==2 && check[7]==2
        ||check[2]==2 && check[5]==2 && check[8]==2
        ||check[0]==2 && check[4]==2 && check[8]==2
        ||check[2]==2 && check[4]==2 && check[6]==2 ){
        return true;
     }else{
        return false;
     }
}

function meWin(check){
     if(  check[0]==1 && check[1]==1 && check[2]==1
        ||check[3]==1 && check[4]==1 && check[5]==1
        ||check[6]==1 && check[7]==1 && check[8]==1
        ||check[0]==1 && check[3]==1 && check[6]==1
        ||check[1]==1 && check[4]==1 && check[7]==1
        ||check[2]==1 && check[5]==1 && check[8]==1
        ||check[0]==1 && check[4]==1 && check[8]==1
        ||check[2]==1 && check[4]==1 && check[6]==1 ){
        return true;
     }else{
        return false;
     }
}

function insideMemory(){
    var found=false
    for(var i=0; i<=stat.memo; i++){
       if(arraysEqual(stat.curStat,stat.inMemoStat[i])){
            stat.reusedMemo++;
            found=true;
            break;
        }
    }

    if(found==true){
        return stat.inMemo[i];
    }else{
        return null;
    }

}

function createMemory(){

    stat.memo++;
    stat.inMemo[stat.memo]=new Array(9)
    stat.inMemoStat[stat.memo]=new Array(9)
        for(var j=0; j<9; j++){
            stat.inMemo[stat.memo][j]=random(1,10);
            stat.inMemoStat[stat.memo][j]=stat.curStat[j];
            }
        return stat.inMemo[stat.memo];

}

function arraysEqual(a1,a2) {
    return JSON.stringify(a1)===JSON.stringify(a2);
}
 
function updateMemory(){
    for(var j=0; j<9; j++){
        stat.inMemo[stat.memo][j]=random(1,10);
    }
}

function chooseMemory(mymemo){

       var myarry=[];
       //console.log(mymemo);
       for(var j=0; j<9; j++){
          if(stat.curStat[j]==0)
            {
               myarry[j]=mymemo[j];
            }else
            {
               myarry[j]=0;
            }
           // console.log(myarry);
           // console.log(mymemo);
       }
       return myarry.indexOf(Math.max.apply(Math,myarry));
}

function train(){

   for(var i=0; i<10000; i++){
        if(stat.player1==true){
            if(insideMemory()==null){
                look=createMemory();
            }else{
                look=insideMemory();
            }
            choice=chooseMemory(look);
               if(grid[choice].answer==0){
                  grid[choice].answer=2;
                  stat.player1=false;
                  stat.emptyCell--;
                  stat.player2=true;

               }
        }else if (stat.player2==true){
            if(insideMemory()==null){
                look=createMemory();
            }else{
                look=insideMemory();
            }
            choice=chooseMemory(look);
             if(grid[choice].answer==0){
                grid[choice].answer=1;
                stat.player2=false;
                stat.emptyCell--;
                stat.player1=true;
            }
        }
        checkWinner(checkGame());
   }
   console.log('training_finished');

}


function mousePressed(){

   for(var i=0; i<9; i++){

        stat.lbool[i]= mouseX>grid[i].x
        && mouseY>grid[i].y
        && mouseX<grid[i].x+grid[i].xWidth
        && mouseY<grid[i].y+grid[i].yWidth;

        if(stat.lbool[i]==true && stat.player1==true ){
             grid[i].answer=1;
        }
    }
        stat.player1=false;
        stat.emptyCell--;
        stat.player2=true;
        checkWinner(checkGame());
        cpuTurn(); 
        // console.log(checkGame());
        console.log(stat.inMemo);

}

function cpuTurn(){

        if(stat.player2==true){
            look=insideMemory();
            if(look==null){
                look=createMemory();
            }
             choice=chooseMemory(look);
             if(grid[choice].answer==0){
                grid[choice].answer=2;
                stat.player2=false;
                stat.emptyCell--;
                stat.player1=true;
            }
        }
}

function checkGame(){
    if(stat.emptyCell<=0){
        stat.title="Game Over";
        resetGame();
    }
    for(i=0; i<9; i++){
      stat.curStat[i]=grid[i].answer;
    }
    return stat.curStat;
}

function gameloop(){

    textSize(20);
    fill(200,200,200);
    text(stat.title,200,20);
    myW="ME:"+stat.myWins;
    cpuW="CP:"+stat.cpuWins;
    text(myW,20,20);
    text(cpuW,20,50);

   for(i=0; i<9; i++){
        grid[i].display();
    }

}


function unit(){

    this.answer=0;
    this.x=10;
    this.y=10;
    this.xWidth=100;
    this.yWidth=100;

    this.display=function(){

    	if(this.answer==0){

			fill(200);
			rect(this.x,this.y, this.xWidth,this.yWidth);

    	}else if (this.answer==1){
    		fill(200);
    	    rect(this.x,this.y, this.xWidth,this.yWidth);
    	    fill(200);
    	    strokeWeight(2);
    	    stroke(10);
    		ellipse(this.x+50,this.y+50,80,80);
    	}else if(this.answer==2){

    		fill(200);
    	    rect(this.x,this.y,100,100);
    	    fill(200);
    	    strokeWeight(2);
    	    stroke(10);
    		line(this.x+30,this.y+30,this.x+70,this.y+70);
    	    line(this.x+70,this.y+30,this.x+30,this.y+70);

    	}

    };

}


// function mousePressed(){

//    for(var i=0; i<9; i++){

//         stat.lbool[i]= mouseX>grid[i].x
//         && mouseY>grid[i].y
//         && mouseX<grid[i].x+grid[i].xWidth
//         && mouseY<grid[i].y+grid[i].yWidth;

//         if(stat.lbool[i]==true && stat.player1==true ){
//             createMemory();
//             insideMemory();
//              grid[i].answer=1;
//              stat.player1=false;
//              stat.emptyCell--;
//              stat.player2=true;
//         }else if(stat.lbool[i]==true && stat.player2==true){
//              createMemory();
//              insideMemory();
//             grid[i].answer=2;
//             stat.player2=false;
//             stat.emptyCell--;
//             stat.player1=true;
//         }

//     }
//     // console.log(checkGame());
//     checkWinner(checkGame());

// }
