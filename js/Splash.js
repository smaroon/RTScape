var Runner = Runner || {};

Runner.Splash = function () {};

    this.backgroundMusic = null;
    this.playButton = null;
    this.musicButton = null;

Runner.Splash.prototype = {

    create: function () {
        var style1 = { font: "10px Arial", fill: "#161616"};
        this.song = this.game.add.text(610, 365, "Music: The Final Countdown", style1);
        this.backgroundMusic = this.add.audio('music');
        this.backgroundMusic.loop = true;
        this.backgroundMusic.play();

        this.add.sprite(0, 0, 'splash');

        this.playButton = this.add.button(420, 315, 'next', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');
        this.musicButton = this.add.button(650, 300, 'musicButton', this.selectMusic, this, 'buttonOver', 'buttonOut', 'buttonOver');
    },

    update: function() {
        this.refreshSongDisplay();
    },
    refreshSongDisplay: function(){
        this.song.text = this.song.text;
    },
    selectMusic: function (){
        this.backgroundMusic.stop();
        if (this.song.text == 'Music: The Final Countdown') {
            this.backgroundMusic = this.add.audio('music2');
            this.song.text = "Music: Benny Hill Theme";
        } else {
            this.backgroundMusic = this.add.audio('music1');
            this.song.text = "Music: The Final Countdown";
        }
        this.backgroundMusic.play();

    },
    startGame: function (pointer) {
        this.state.start('Rules');
    }
};