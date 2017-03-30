var Runner = Runner || {};

Runner.Splash = function () {};

    this.backgroundMusic = null;
    this.playButton = null;

Runner.Splash.prototype = {

    create: function () {
        this.backgroundMusic = this.add.audio('music');
        this.backgroundMusic.loop = true;
        this.backgroundMusic.play();

        this.add.sprite(0, 0, 'splash');

        this.playButton = this.add.button(380, 330, 'playButton', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');
    },

    update: function() {

    },

    startGame: function (pointer) {
        this.state.start('Game');
    }
};