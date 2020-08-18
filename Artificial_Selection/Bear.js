

Bear = enchant.Class.create(enchant.Sprite, {

    initialize: function(prop) {


        this.body=new Sprite(32,32)
        this.body.x = 20;
        this.body.y = 20;
        this.body.image = game.assets['animal.png'];
        this.body.frame = 0;
        this.body.tailLength=prop.bscaleX;
        this.body.tailValue=0;

        this.head=new Sprite(32,32);
        this.head.x = this.body.x -5;
        this.head.y = this.body.y+this.body.height -10;
        this.head.scale( 1, prop.bscaleX);
        this.head.image=game.assets['animal.png'];
        this.head.frame=1;

        this.group=new Group();
        this.group.x=prop.x;
        this.group.y=prop.y;
        this.group.addChild(this.head);
        this.group.addChild(this.body);
        game.rootScene.addChild(this.group);

        this.body.addEventListener('touchend', function() {

          console.log(this.tailLength);
            this.tailValue=this.tailLength;

        });
    }
});