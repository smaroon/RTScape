var Runner = Runner || {};

Runner.Preload = function () {};

Runner.Preload.prototype = {
    //load game assets
    preload : function () {
        this.load.spritesheet('ra', 'assets/images/ra.png', 132, 132);
        this.load.spritesheet('jt', 'assets/images/jt.png', 132, 132);
        this.load.spritesheet('mh', 'assets/images/mh.png', 132, 132);
        this.load.spritesheet('mv', 'assets/images/mv.png', 132, 132);
        this.load.spritesheet('mv2', 'assets/images/mv2.png', 132, 132);
        this.load.spritesheet('er1', 'assets/images/er.png', 132, 115); // todo create non santa version
        this.load.spritesheet('jm', 'assets/images/jm.png', 132,132);
        //todo: add JM && ER

        this.load.image('floor', 'assets/images/floor.png');
        this.load.image('cabinet', 'assets/images/cabinet.png');
        this.load.image('background', 'assets/images/background.png');

        this.game.stage.backgroundColor = "#8f9fba";
    },
    create: function() {
        this.state.start('Game');
    }
};