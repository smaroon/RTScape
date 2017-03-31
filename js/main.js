var Runner = Runner || {};

Runner.game = new Phaser.Game(746, 420, Phaser.CANVAS, ''); // set to canvas to debug.. auto for prod

Runner.game.state.add('Boot', Runner.Boot);
Runner.game.state.add('Preload', Runner.Preload);
Runner.game.state.add('Splash', Runner.Splash);
Runner.game.state.add('Rules', Runner.Rules);
Runner.game.state.add('Game', Runner.Game);

Runner.game.state.start('Boot');