var Runner = Runner || {};

Runner.Rules = function () {};

Runner.Rules.prototype = {

    preload : function() {
        var howto = "How to Play";
        var text = this.add.text(100, 65, howto, {font: "32px Arial", backgroundColor: 'rgba(0,255,0,0.25)' });
        var jump = "Jump by using the Up arrow";
        var text2 = this.add.text(120, 105, jump, {font:"24px Arial", fill: '#ffffff'});
        var score = "Scoring";
        var text3 = this.add.text(100, 165, score, {font: "32px Arial"});
        var points = "Rollback = +10 points\nManagers = +20 points\nGen4 = +50 points\nBeer = -1 point\nCoins = -3 points\nRFP = -5 points"
        var text4 = this.add.text(120, 205, points, {font:"24px Arial", fill: '#ffffff'});

        this.playButton = this.add.button(420, 330, 'playButton', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');
    },
    update : function() {

    },
    startGame : function() {
        this.state.start('Game');
    }
};