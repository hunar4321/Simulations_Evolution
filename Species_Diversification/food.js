

Food = enchant.Class.create(enchant.Sprite, {

    initialize: function(prop) {
        this.body=new Sprite(32,32)
        this.body.x = prop.x;
        this.body.y = prop.y;
        this.body.scale(0.5, 0.5);
        this.body.image = game.assets['animal.png'];
        this.body.frame = 2;

        game.rootScene.addChild(this.body);

        this.speed=prop.r;
        this.bodyWidth=prop.ascaleX;
        this.bodyHeight=prop.ascaleY;
        this.power=prop.bscaleX;

        this.body.addEventListener('enterframe', function() {

        });
    }
});