enchant();
window.onload = function() {
    game = new Game(500, 500);
    game.preload('animal.png');

    function getRandom(min, max) {
        return Math.random() * (max - min)  + min;
    }

    xpos = [50, 450]
    ypos = [50, 450]

    genProp= function(){
        prop={
            x: Math.floor(getRandom(xpos[0], xpos[1])),
            y: Math.floor(getRandom(ypos[0], ypos[1])),
            bscaleX: getRandom(1,1.01)
        }
        return prop;
    };

    inhertProp=function(obj){
        prop={            y: Math.floor(getRandom(0, ypos)),

            x: Math.floor(getRandom(xpos[0], xpos[1])),
            y: Math.floor(getRandom(ypos[0], ypos[1])),
            bscaleX: obj.body.tailLength + getRandom(-0.2,0.2)
        }
        return prop;
    };

    game.onload = function() {
        var num=20;
        bear=[];
        for(i=0; i<num; i++){
            bear[i]=new Bear(genProp());
        }


        game.rootScene.addEventListener('touchend', function() {
            var count=0;
            for(var i=0; i<bear.length; i++) {

                if (bear[i].body.tailValue > 0) {
                    myobj = bear[i];
                    count++;
                }
            }
            if(count>1) {
                for (var i = 0; i < bear.length; i++) {
                    //   console.log("number"+i +bear[i].body.tailValue);
                    propi = inhertProp(myobj);                 //
                    game.rootScene.removeChild(bear[i].group);
                    bear[i] = new Bear(propi);


                }
            }

        });
    };

    game.start();
};