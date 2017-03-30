var Runner = Runner || {};

Runner.Game = function () {};

Runner.Game.prototype = {
    preload: function() {
        this.game.time.advancedTiming = true;
    },
    create : function () {
        // background and floor setup
        this.game.world.setBounds(0,0,2500, this.game.height);

        this.background = this.add.tileSprite(0, 0, 2500, this.game.height-20, "background");
        this.floor = this.add.tileSprite(0, this.game.height-20, this.game.world.width, 20, 'floor');

        // create player and animation
        this.player = this.game.add.sprite(this.game.width/2, this.game.height - 40, 'ra');
        this.player.animations.add('walk');

        //create managers
        this.generateManagers();
        // create manoj
        this.generationManoj();

        //create monitors
        this.generateMonitors();
        
        //create beers
        this.generateBeer();

        //create coins
        this.generateCoins();
        this.generateGen4();
        this.generateRfp();

        //create cloud platforms
        this.generateClouds();

        //create rollbacks
        this.generateRollbacks();

        // todo create other items (obstacles + rewards)

        // place items in proper order IE we want monitors on the floor not under it
        this.game.world.bringToTop(this.clouds);
        this.game.world.bringToTop(this.monitors);
        this.game.world.bringToTop(this.floor);

        //enable physics
        this.game.physics.arcade.enable(this.player);
        this.game.physics.arcade.enable(this.floor);
        this.game.physics.arcade.enable(this.monitors);
        this.game.physics.arcade.enable(this.clouds);
        this.game.physics.arcade.enable(this.beers);
        this.game.physics.arcade.enable(this.gen4);
        this.game.physics.arcade.enable(this.rfp);
        

        // add gravity to player
        this.player.body.gravity.y = 1000;
        // so we walk on the ground
        this.floor.body.immovable = true;

        this.player.standDimensions = {width: this.player.width, height: this.player.height};
        this.player.anchor.setTo(0.5, 1);

        //the camera will follow the player in the world
        this.game.camera.follow(this.player);

        //play the walking animation
        this.player.animations.play('walk', 3, true);

        //move player with cursor keys
        this.cursors = this.game.input.keyboard.createCursorKeys();

        //...or by swiping
        this.swipe = this.game.input.activePointer;

        // initialize some variables
        this.points = 90;
        this.wrapping = true;

        //stats
        var style1 = { font: "20px Arial", fill: "#161616"};
        var t1 = this.game.add.text(10, 20, "Days Until Retirement:", style1);
        t1.fixedToCamera = true;

        var style2 = { font: "26px Arial", fill: "#109901"};
        this.pointsText = this.game.add.text(250, 18, "", style2);
        this.refreshStats();
        this.pointsText.fixedToCamera = true;
    },

    update: function() {
        this.background.tilePosition.x = 1;

        //collision
        this.game.physics.arcade.collide(this.player, this.floor, null, null, this);
        this.game.physics.arcade.collide(this.player, this.monitors, null, null, this);
        //this.game.physics.arcade.collide(this.player, this.clouds, null, null, this);
        this.game.physics.arcade.collide(this.player, this.bar, null, null, this);
        this.game.physics.arcade.overlap(this.managers, this.player, this.playerHitMgr, this.refreshStats, this);
        this.game.physics.arcade.overlap(this.coins, this.player, this.collectCoin, this.refreshStats, this);
        this.game.physics.arcade.overlap(this.beers, this.player, this.collectBeer, this.refreshStats, this);
        this.game.physics.arcade.overlap(this.gen4, this.player, this.playerHitGen4, this.refreshStats, this);
        this.game.physics.arcade.overlap(this.rfp, this.player, this.collectRfp, this.refreshStats, this);
        this.game.physics.arcade.overlap(this.rollbacks, this.player, this.playerHitRollback, this.refreshStats, this);

        
        //only respond to keys and keep the speed if the player is alive
        if (this.player.alive) {

            this.player.body.velocity.x = 300;

            //We do a little math to determine whether the game world has wrapped around.
            //If so, we want to destroy everything and regenerate, so the game will remain random
            if (!this.wrapping && this.player.x < this.game.width) {
                //Not used yet, but may be useful to know how many times we've wrapped
                this.wraps++;

                //We only want to destroy and regenerate once per wrap, so we test with wrapping var
                this.wrapping = true;

                this.managers.destroy();
                this.generateManagers();
                
                this.mts.destroy();
                this.generationManoj();

                this.monitors.destroy();
                this.generateMonitors();

                this.generateBeer();
                this.beers.destroy();


                this.coins.destroy();
                this.generateCoins();
                this.clouds.destroy();
                this.bar.destroy();
                this.generateClouds();
                this.gen4.destroy();
                this.generateGen4();
                this.rfp.destroy();
                this.generateRfp();


                this.rollbacks.destroy();
                this.generateRollbacks();


                //put everything back in the proper order
                this.game.world.bringToTop(this.clouds);
                this.game.world.bringToTop(this.monitors);
                this.game.world.bringToTop(this.floor);
            }
            else if (this.player.x >= this.game.width) {
                this.wrapping = false;
            }

            //take the appropriate action for swiping up or pressing up arrow on keyboard
            //we don't wait until the swipe is finished (this.swipe.isUp),
            //  because of latency problems (it takes too long to jump before hitting an obstacle)
            if (this.swipe.isDown && (this.swipe.positionDown.y > this.swipe.position.y)) {
                this.playerJump();
            }
            else if (this.cursors.up.isDown) {
                this.playerJump();
            }

            //The game world is infinite in the x-direction, so we wrap around.
            //We subtract padding so the player will remain in the middle of the screen when
            //wrapping, rather than going to the end of the screen first.
            this.game.world.wrap(this.player, -(this.game.width/2), false, true, false);
        }
    },

    refreshStats : function() {
        this.pointsText.text = this.points;
        // todo additional stats???
    },
    playerHitMgr : function(player, manager) {
        this.points = this.points + 20;
        manager.kill();
    },
    playerHitRollback : function(player, rollback) {
        this.points = this.points + 10;
        rollback.kill();
    },
    playerHitGen4 : function(player, gen4) {
        this.points = this.points + 50;
        gen4.kill();
    },
    collectCoin : function(player, coin) {
        this.points = this.points - 3;
        coin.kill()
    },
    collectBeer : function(player, beer) {
        this.points = this.points - 1;
        beer.kill();
    },
    collectRfp : function(player, rfp) {
        this.points = this.points - 5;
        rfp.kill();
    },
    playerJump : function() {
        // since the ground is a sprite we have to test for touch
        if (this.player.body.touching.down) {
            this.player.body.velocity.y = -900;
        }
    },
    generateManagers : function() {
        this.managers = this.game.add.group();
        // enable physics
        this.managers.enableBody = true;
        var numManagers = this.game.rnd.integerInRange(0, 2);
        var manager;


        // this is the meat of manager gen.
        var x = this.game.rnd.integerInRange(this.game.width, this.game.world.width - this.game.width); // position horizontally
    
        manager = this.managers.create(x, this.game.height-170, 'jt');

        for (var i = 0; i < numManagers; i++) {
            var mgr = this.game.rnd.integerInRange(0,6);
            var x = this.game.rnd.integerInRange(this.game.width, this.game.world.width - this.game.width); // position horizontally
            // this is the meat of manager gen.
            switch (mgr) {
                case 0:
                    manager = this.managers.create(x, this.game.height-150, 'jt');
                    break;
                case 1:
                    manager = this.managers.create(x, this.game.height-110, 'mh');
                    break;
                case 2:
                    manager = this.managers.create(x, this.game.height-110, 'mv');
                    break;
                case 3:
                    manager = this.managers.create(x, this.game.height-140, 'mv2');
                    break;
                case 4:
                    manager = this.managers.create(x, this.game.height-120, 'er');
                    break;
                case 5:
                    manager = this.managers.create(x, this.game.height-120, 'er2');
                    break;
                case 6:
                    manager = this.managers.create(x, this.game.height-150, 'jm');
                    break;
            }
            manager.body.immovable = true;
        }

        // manager = this.managers.create(x, this.game.height-170, 'jt');
        this.managers.callAll('animations.add', 'animations', 'wave', [0,1], 4, true);
        this.managers.callAll('animations.play', 'animations', 'wave');

    },
    generationManoj : function() {
        this.mts = this.game.add.group();
        // enable physics
        this.mts.enableBody = true;
        var numMt = this.game.rnd.integerInRange(0, 1);
        var mt;
        var x = this.game.rnd.integerInRange(this.game.width, this.game.world.width - this.game.width); // position horizontally
        mt = this.mts.create(x, this.game.height-150, 'mt');
        this.mts.callAll('animations.add', 'animations', 'jump', [0,1], 4, true);
        this.mts.callAll('animations.play', 'animations', 'jump');
    },
    generateMonitors : function() {
        this.monitors = this.game.add.group();
        //enable physics
        this.monitors.enableBody = true;
        var numMonitors = this.game.rnd.integerInRange(0,3);
        var monitor;

        for (var i = 0; i < numMonitors; i++) {
            //add sprite within an area excluding the beginning and ending
            //  of the game world so items won't suddenly appear or disappear when wrapping
            var x = this.game.rnd.integerInRange(this.game.width, this.game.world.width - this.game.width);
            monitor = this.monitors.create(x, this.game.height-135, 'monitor');
            monitor.body.immovable = true;
            monitor.body.velocity.x = 0;
        }
    },
    generateCoins : function() {
        this.coins = this.game.add.group();
        // enable physics
        this.coins.enableBody = true;
        var numCoins = this.game.rnd.integerInRange(0, 3);
        var coin;
        // todo figure out generation.
        for (var i = 0; i < numCoins; i++) {
        	
        	var coinOps = this.game.rnd.integerInRange(0,3);
        	var x = this.game.rnd.integerInRange(this.game.width, this.game.world.width - this.game.width); // position horizontally
        	var y = this.game.rnd.integerInRange(this.game.height-120, this.game.height);    // position vertically
        	switch(coinOps) {
        		case 0:
        			coin = this.coins.create(x, y, 'coin1');
        			break;
        		case 1:
        			coin = this.coins.create(x, y, 'coin2');
        			break;
        		case 2:
        			coin = this.coins.create(x, y, 'coin3');
        			break;
        		case 3:
        			coin = this.coins.create(x, y, 'coin4');
        			break;
        	}
        	//coin = this.managers.create(x, this.game.height-170, 'jt');
        	this.coins.callAll('animations.add', 'animations', 'spin', [0,1,2,3], 4, true);
        	this.coins.callAll('animations.play', 'animations', 'spin');
        		
        }
    },  

    generateClouds : function() {
        this.clouds = this.game.add.group();
        this.bar = this.add.group();
        //enable physics
        this.clouds.enableBody = true;
        this.bar.enableBody = true;
        var numClouds = this.game.rnd.integerInRange(0,1);
        var cloud;
        var Bar;

        for (var i = 0; i < numClouds; i++) {
            var x = this.game.rnd.integerInRange(this.game.width, this.game.world.width - this.game.width);
            cloud = this.clouds.create(x, this.game.height-350, 'cloud');
            Bar = this.bar.create(x, this.game.height-310, 'bar');
            Bar.body.immovable = true;
            cloud.body.velocity.x = 0;
            this.clouds.callAll('animations.add', 'animations', 'aws', [0,1,2,3,4,5,6,7,8,9,10,11,12,13], 5, true);
            this.clouds.callAll('animations.play', 'animations', 'aws');
            
            this.bar.callAll('animations.add', 'animations', 'bar', [0,1], 5, true);
            this.bar.callAll('animations.play', 'animations', 'bar');
        }

    },
    generateGen4 : function() {
    	this.gen4 = this.game.add.group();
    	this.gen4.enableBody = true;
    	var numGen4 = this.game.rnd.integerInRange(0,2);
    	var noGen4;
    	
    	for (var i = 0; i <numGen4; i++) {
    		var x = this.game.rnd.integerInRange(this.game.width, this.game.world.width - this.game.width);
    		noGen4 = this.gen4.create(x, this.game.height-170,'gen4');
    		this.gen4.callAll('animations.add', 'animations', 'flash', [0,1], 4, true);
    		this.gen4.callAll('animations.play', 'animations', 'flash');
    	}
    },
    generateRfp : function() {
    	this.rfp = this.game.add.group();
    	this.rfp.enableBody = true;
    	var numRfp = this.game.rnd.integerInRange(0,2);
    	var RFP;
    	
    	for (var i = 0; i <numRfp; i++) {
    		var x = this.game.rnd.integerInRange(this.game.width, this.game.world.width - this.game.width);
    		RFP = this.rfp.create(x, this.game.height-170,'rfp');
    		this.rfp.callAll('animations.add', 'animations', 'st', [0,1,2], 4, true);
    		this.rfp.callAll('animations.play', 'animations', 'st');
    	}
    },
    generateRollbacks : function() {
        this.rollbacks = this.game.add.group();
        //enable physics
        this.rollbacks.enableBody = true;
        var numRollbacks = this.game.rnd.integerInRange(0,5);
        var rollback;

        for (var i = 0; i < numRollbacks; i++) {
            var x = this.game.rnd.integerInRange(this.game.width, this.game.world.width - this.game.width);
            rollback = this.rollbacks.create(x, this.game.height - 150, 'rollback');
            rollback.body.velocity.x = 0;
        }
    },
    generateBeer : function() {
        this.beers = this.game.add.group();
        // enable physics
        this.beers.enableBody = true;
        var numBeers = this.game.rnd.integerInRange(0, 2);
        var beer;
//        var x = this.game.rnd.integerInRange(this.game.width, this.game.world.width - this.game.width); // position horizontally
//        var y = this.game.rnd.integerInRange(this.game.height-320, this.game.height);
//        beer = this.beers.create(x, y, 'beer');
//        beer = this.beers.create(x, this.game.height-250, 'beer');
        for (var i = 0; i < numBeers; i++) {
            var x = this.game.rnd.integerInRange(this.game.width, this.game.world.width - this.game.width);
            beer = this.beers.create(x, this.game.height - 250, 'beer');
//            beer.body.velocity.x = 0;
        }

    }
};
