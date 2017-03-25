var Runner = Runner || {};

Runner.Boot = function () {};

Runner.Boot.prototype = {
    preload: function() {

    },
    create: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        //center game area
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        //resize screen automatically
        this.scale.setScreenSize(true);

        //Phaser physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //begin preload
        this.state.start('Preload');
    }
}
