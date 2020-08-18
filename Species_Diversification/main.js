enchant();
window.onload = function() {
    game = new Game(500, 500);
    game.preload('animal.png');

    function getRandomInt(min, max) {
        return Math.random() * (max - min)  + min;
    }

    genProp= function(){
        prop={
            x: Math.floor(Math.random()*450+50),
            y: Math.floor(Math.random()*450+50),
            r: Math.random()*10,
            ascaleX: getRandomInt(1,1.1),
            ascaleY: this.ascaleX,
            bscaleX: 0,
            rot: Math.floor(Math.random()*360)
        }
        return prop;
    };

    inhertProp=function(obj){
        prop={
            x: Math.floor(Math.random()*500),
            y: Math.floor(Math.random()*500),
            r: obj.speed + getRandomInt(-0.1,0.1),
            ascaleX: obj.bodyWidth + getRandomInt(-0.1,0.1),
            ascaleY: this.ascaleX,
            bscaleX: 0,
            rot: Math.floor(Math.random()*360)

        }
        return prop;
    };


    game.onload = function() {
        var num=50;         //make it 100 or 50
        bear=[];
        for(i=0; i<num; i++){
            bear[i]=new Bear(genProp());
        }

        var num=100;         //make it 100
        food=[];
        for(i=0; i<num; i++){
            food[i]=new Food(genProp());
        }

        ageLimit=100;
        powerLimit=1;


        game.rootScene.addEventListener('enterframe', function() {

            //console.log(bear[1].power==powerLimit,bear[1].body.age<ageLimit)
            console.log(bear[1].power==powerLimit && bear[1].body.age<ageLimit)

            for(var i=0; i<bear.length; i++) {
                for (var j = 0; j < food.length; j++) {
                    if (bear[i].body.intersect(food[j].body)) {
                        game.rootScene.removeChild(food[j].body);
                        food[j] = new Food(genProp());
                        bear[i].power++;
                    }
                }
            }
            for(var i=0; i<bear.length; i++){

                        if (bear[i].power>powerLimit) {

                            propi=inhertProp(bear[i]);
                              //
                              if(bear[i].body.age<ageLimit){
                                  game.rootScene.removeChild(bear[i].body);
                                  bear[i]=new Bear(propi);
                                 // mybear1=new Bear(propi);
                                 // mybear2=new Bear(propi);
                                 //
                                 // bear.push(mybear1);
                                 // bear.push(mybear2);

                              }else{
                                  game.rootScene.removeChild(bear[i].body);
                                  bear[i]=new Bear(genProp());
                              }


                        }

            }

        });
    };

    game.start();
};