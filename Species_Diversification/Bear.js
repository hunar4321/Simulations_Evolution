

Bear = enchant.Class.create(enchant.Sprite, {

    initialize: function(prop) {
        this.body=new Sprite(32,32)
        this.body.x = prop.x;
        this.body.y = prop.y;
        this.body.scale(prop.ascaleX, prop.ascaleY);
        this.body.image = game.assets['animal.png'];
        this.body.frame = 0;
        this.body.rotate(prop.rot)

        game.rootScene.addChild(this.body);

        this.body.targetX=Math.floor(Math.random()*500);
        this.body.targetY=Math.floor(Math.random()*500);
        this.body.age=0;

        this.speed=prop.r;
        this.bodyWidth=prop.ascaleX;
        this.bodyHeight=prop.ascaleY;
        this.power=prop.bscaleX;

        this.survival=(prop.bscaleX/prop.ascaleX);


        this.body.addEventListener('enterframe', function() {

            this.age++;

            this.dx = this.targetX - this.x;
            this.dy = this.targetY - this.y;
            this.distanceToTarget =Math.floor( Math.sqrt((this.dx * this.dx) + (this.dy * this.dy)));


            this.tward = Math.atan2(this.targetY - this.y, this.targetX - this.x);

            this.rotation+=Math.cos(this.tward)*prop.r;

            this.x += Math.cos(this.tward)*prop.r/prop.ascaleX;
            this.y += Math.sin(this.tward)*prop.r/prop.ascaleX;
            //  }
            //this.rotate(Math.cos(this.tward)*prop.r/prop.ascaleX);

            if(this.distanceToTarget<10 || this.hit==true){
                this.targetX=Math.floor(Math.random()*500);
                this.targetY=Math.floor(Math.random()*500);
            }


        });
    }
});