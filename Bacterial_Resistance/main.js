
var number=500;
var bac=[];
var thresh=10;
var mymax=10;
var inherit=1;

function setup(){

	createCanvas(700,700);
	background(200);
    frameRate(5);
    var inher=1;

    for(var i=0; i<number; i++){
        bac[i]=new organism();
  }
}

function mousePressed(){

    background(200);
    addAnti();
    inherit+=1;
    for(var i=0; i<bac.length; i++){ 
        if(bac[i].alive==true){
            bac[i]=new organism();
        }
    }  

}

function addAnti(){
    for(var i=0; i<bac.length; i++){
        if(bac[i].prop.wall<thresh){
            bac[i].alive=false;
        }
    }
}

function organism(){
    
    this.alive=true;
    this.prop=new generate();
    this.prop.display();   

}

function generate(){

    this.x=random(0,700);
    this.y=random(0,700);
    this.wall=random(inherit,inherit+mymax);
    this.display=function(){
         strokeWeight(this.wall*0.2);
         stroke(0,100,50);
         fill(150,200,150);
         ellipse(this.x,this.y, 20,20);       
     }
 console.log(this.wall)
}

function keyPressed(){

  for(var i=0; i<20; i++){
    temp=new organism();
    bac.push(temp);
  }

}



