var Runner = Runner || {};

Runner.Preload = function () {};

Runner.Preload.prototype = {
    //load game assets
    preload : function () {
        // Managers
        this.load.spritesheet('ra', 'assets/images/ra.png', 132, 132);
        this.load.spritesheet('jt', 'assets/images/jt.png', 132, 132);
        this.load.spritesheet('mh', 'assets/images/mh.png', 132, 132);
        this.load.spritesheet('mv', 'assets/images/mv.png', 132, 132);
        this.load.spritesheet('mv2', 'assets/images/mv2.png', 132, 132);
        this.load.spritesheet('er', 'assets/images/er.png', 132, 115);
        this.load.spritesheet('er2', 'assets/images/er2.png', 132, 115); // todo create non santa version
        this.load.spritesheet('jm', 'assets/images/jm.png', 132,132);
        this.load.spritesheet('mt', 'assets/images/mt.png', 132,132);

        // Splash and Rules screens
        this.load.image('splash', 'assets/images/RTScape!.png');
        this.load.image('playButton', 'assets/images/playbutton.png');
        this.load.image('next', 'assets/images/next.png');
        this.load.image('musicButton', 'assets/images/music.png');

        // Game fixtures
        this.load.image('floor', 'assets/images/floor.png');
        this.load.image('monitor', 'assets/images/monitors.png');
        this.load.image('background', 'assets/images/background.png');
        this.load.image('beer', 'assets/images/beer.png');
        this.game.stage.backgroundColor = "#8f9fba";
        this.game.load.audio('music', ['assets/audio/The Final Countdown.wav'], true);
        
        // Cloud platform
        this.load.spritesheet('cloud', 'assets/images/aws1.png', 480, 55);

        // Game items
        this.load.image('rollback', 'assets/images/rollback.png');
        this.load.spritesheet('coin1', 'assets/images/coin1.png', 43, 32);
        this.load.spritesheet('coin2', 'assets/images/coin2.png', 43, 32);
        this.load.spritesheet('coin3', 'assets/images/coin3.png', 43, 32);
        this.load.spritesheet('coin4', 'assets/images/coin4.png', 43, 32);
        
        this.load.spritesheet('cloud', 'assets/images/aws1.png', 480, 55);
        this.load.spritesheet('bar', 'assets/images/cloud_base.png', 480, 5);
        
        this.load.spritesheet('gen4', 'assets/images/gen4.png', 48, 64);
        this.load.spritesheet('rfp', 'assets/images/RFP.png', 24, 32);

        this.game.stage.backgroundColor = "#8f9fba";

        this.game.load.audio('music', ['assets/audio/The Final Countdown.wav'], true);
        this.game.load.audio('music2', ['assets/audio/The Benny Hill Show.wav'], true);

    },
    create: function() {
        this.state.start('Splash');
    }
};