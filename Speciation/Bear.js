

Bear = enchant.Class.create(enchant.Sprite, {

    initialize: function(prop) {

        this.body=new Sprite(32,32)
        this.body.x = 20;
        this.body.y = 20;
        this.body.scale(prop.bodyX,prop.bodyY);
        this.body.image = game.assets['animal.png'];
        this.body.frame = 0;

        this.eye=new Sprite(32,32);
        this.eye.x = this.body.x;
        this.eye.y = this.body.y-this.body.height-2;
        this.eye.scale(prop.eyeX,prop.eyeY);
        this.eye.image=game.assets['animal.png'];
        this.eye.frame=2;

        this.ear=new Sprite(32,32);
        this.ear.x = this.body.x;
        this.ear.y = this.body.y-this.body.height;
        this.ear.scale(prop.earX,prop.earY);
        this.ear.image=game.assets['animal.png'];
        this.ear.frame=5;

        this.head=new Sprite(32,32);
        this.head.x = this.body.x-2;
        this.head.y = this.body.y-this.body.height;
        this.head.scale(prop.headX,prop.headY);
        this.head.image=game.assets['animal.png'];
        this.head.frame=1;

        this.limb=new Sprite(32,32);
        this.limb.x = this.body.x;
        this.limb.y = this.body.y+this.body.height/2;
        this.limb.scale(prop.limbX,prop.limbY);
        this.limb.image=game.assets['animal.png'];
        this.limb.frame=3;

        this.wing=new Sprite(32,32);
        this.wing.x = this.body.x-4;
        this.wing.y = this.body.y;
        this.wing.scale(prop.wingX,prop.wingY);
        this.wing.image=game.assets['animal.png'];
        this.wing.frame=6;

        this.arm=new Sprite(32,32);
        this.arm.x = this.body.x-4;
        this.arm.y = this.body.y-6;
        this.arm.scale(prop.armX,prop.armY);
        this.arm.image=game.assets['animal.png'];
        this.arm.frame=7;

        this.nose=new Sprite(32,32);
        this.nose.x = this.body.x+2;
        this.nose.y = this.body.y-this.body.height;
        this.nose.scale(prop.noseX,prop.noseY);
        this.nose.image=game.assets['animal.png'];
        this.nose.frame=8;

        this.group=new Group();
        this.group.x=prop.x;
        this.group.y=prop.y;
        this.group.addChild(this.ear);
        this.group.addChild(this.head);
        this.group.addChild(this.wing);
        this.group.addChild(this.limb);
        this.group.addChild(this.body);
        this.group.addChild(this.arm);
        this.group.addChild(this.nose);
        this.group.addChild(this.eye);
        game.rootScene.addChild(this.group);


        this.headY=prop.headY;
        this.headX=prop.headX;
        this.bodyX=prop.bodyX;
        this.bodyY=prop.bodyY;
        this.eyeX=prop.eyeX;
        this.eyeY=prop.eyeY;
        this.earX=prop.earX;
        this.earY=prop.earY;
        this.limbX=prop.limbX;
        this.limbY=prop.limbY;
        this.armX=prop.armX;
        this.armY=prop.armY;
        this.noseX=prop.noseX;
        this.noseY=prop.noseY;
        this.wingX=prop.wingX;
        this.wingY=prop.wingY;


        // bird +eye +nose +wing*2 -bodyY*2 -limb*2 -ear
        // man  +eye +nose +limbY -bodyY +armY
        // ape +eye +nose +limbY*1/2 -bodyY +armY*2 +armX +ear

        this.bird = this.eyeX+this.eyeY+this.noseX + this.noseY + this.wingX*2+this.wingY -this.bodyX*2 - this.bodyY*2-this.limbX*2-this.limbY*2-this.earX-this.earY+this.headX*0.5 +this.headY*0.5;
        this.man= this.eyeX*0.5+this.eyeY*0.5-this.noseX*0.1 + this.noseY *0.5+this.limbY*1.5 -this.bodyY*0.5 + this.armY +this.armX*0.3 +this.headX*0.5 +this.headY*0.5;
        this.ape= this.eyeX+this.eyeY+this.noseX + this.noseY +this.limbY*0.5 -this.bodyY + this.armY*2 +this.armX +this.earX +this.earY;

        this.group.targetX=Math.floor(Math.random()*500);
        this.group.targetY=Math.floor(Math.random()*500);

        this.group.addEventListener('enterframe', function() {


            this.dx = this.targetX - this.x;
            this.dy = this.targetY - this.y;
            this.distanceToTarget =Math.floor( Math.sqrt((this.dx * this.dx) + (this.dy * this.dy)));

            this.tward = Math.atan2(this.targetY - this.y, this.targetX - this.x);
            this.x += Math.cos(this.tward)*prop.speed;
            this.y += Math.sin(this.tward)*prop.speed;
            //  }

            if(this.distanceToTarget<10 || this.hit==true){
                this.targetX=Math.floor(Math.random()*500);
                this.targetY=Math.floor(Math.random()*500);
            }


        });
    }
});