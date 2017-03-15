var Runner = Runner || {};

Runner.Preload = function () {};

Runner.Preload.prototype = {
    //load game assets
    preload : function () {
        this.load.spritesheet('ra', 'assets/images/ra.png', 132, 132);
        this.load.spritesheet('jt', 'assets/images/jt.png', 132, 132);
        this.load.spritesheet('mh', 'assets/images/mh.png', 132, 132);
        this.load.spritesheet('mv', 'assets/images/mv.png', 132, 132);
        //todo: add JM && ER

        this.load.image('floor', 'assets/images/floor.png');
        this.load.image('cabinet', 'assets/images/cabinet.png');

        this.game.stage.backgroundColor = "#8f9fba";
    },
    create: function() {
        this.state.start('Game');
    }
};