enchant();
window.onload = function() {
    game = new Game(500, 500);
    game.preload('animal.png');

    function getRandomInt(min, max) {
        return Math.random() * (max - min)  + min;
    }

    xpos = [50, 450]
    ypos = [50, 450]
    genSpeed=3;
    genProp= function(){
        prop={
            x: Math.floor(getRandomInt(xpos[0], xpos[1])),
            y: Math.floor(getRandomInt(ypos[0], ypos[1])),
            headX:getRandomInt(0.5,0.51),
            headY:getRandomInt(0.5,0.51),
            bodyX:getRandomInt(1,1.01),
            bodyY:getRandomInt(2,2.01),
            eyeX:getRandomInt(0.5,0.51),
            eyeY:getRandomInt(0.5,0.51),
            earX:getRandomInt(1,1.01),
            earY:getRandomInt(1,1.01),
            limbX:getRandomInt(1,1.01),
            limbY:getRandomInt(0.5,0.51),
            armX:getRandomInt(1,1.01),
            armY:getRandomInt(0.2,0.21),
            noseX:getRandomInt(0.5,0.51),
            noseY:getRandomInt(0.5,0.51),
            wingX:getRandomInt(1,1.01),
            wingY:getRandomInt(1,1.01),
            speed: genSpeed
        }
        return prop;
    };

    inhertProp= function(obj){
        prop={
            x: Math.floor(getRandomInt(xpos[0], xpos[1])),
            y: Math.floor(getRandomInt(ypos[0], ypos[1])),
            headX:obj.headX+getRandomInt(-0.01,0.01),
            headY:obj.headY+getRandomInt(-0.01,0.01),
            bodyX:obj.bodyX+getRandomInt(-0.01,0.01),
            bodyY:obj.bodyY+getRandomInt(-0.01,0.01),
            eyeX:obj.eyeX+getRandomInt(-0.01,0.01),
            eyeY:obj.eyeY+getRandomInt(-0.01,0.01),
            earX:obj.earX+getRandomInt(-0.01,0.01),
            earY:obj.earY+getRandomInt(-0.01,0.01),
            limbX:obj.limbX+getRandomInt(-0.01,0.01),
            limbY:obj.limbY+getRandomInt(-0.01,0.01),
            armX:obj.armX+getRandomInt(-0.01,0.01),
            armY:obj.armY+getRandomInt(-0.01,0.01),
            noseX:obj.noseX+getRandomInt(-0.01,0.01),
            noseY:obj.noseY+getRandomInt(-0.01,0.01),
            wingX:obj.wingX+getRandomInt(-0.01,0.01),
            wingY:obj.wingY+getRandomInt(-0.01,0.01),
            speed:genSpeed
        }
        return prop;
    };


    game.onload = function() {
        var num=20;
        bear=[];
        for(i=0; i<num; i++){
            bear[i]=new Bear(genProp());
        }

        game.rootScene.addEventListener('enterframe', function() {

            console.log(bear.length);
            for(var i=0; i<bear.length; i++){
                for(var j=0; j<bear.length; j++){
                    if(i!=j){
                        if (bear[i].body.intersect(bear[j].body)) {


                            propi=inhertProp(bear[i]);
                            propj=inhertProp(bear[j]);

                              if(bear[i].bird > bear[j].bird){
                                  game.rootScene.removeChild(bear[j].group);
                                  bear[j]=new Bear(propi);

                              }else{
                                  game.rootScene.removeChild(bear[i].group);
                                  bear[i]=new Bear(propj);
                              }

                            //game.rootScene.removeChild(bear[i].group);
                            //game.rootScene.removeChild(bear[j].group);
                            //
                            //bear[i]=new Bear(genProp());
                            //bear[j]=new Bear(genProp());


                        }
                    }
                }
            }

        });
    };

    game.start();
};