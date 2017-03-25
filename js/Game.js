var Runner = Runner || {};

Runner.Game = function () {};

Runner.Game.prototype = {
    preload: function() {
        this.game.time.advancedTiming = true;
    },
    create : function () {
        // background and floor setup
        this.game.world.setBounds(0,0,2500, this.game.height);

        this.background = this.add.tileSprite(0, 0, 2500, this.game.height+70, "background");
        this.floor = this.add.tileSprite(0, this.game.height-70, this.game.world.width, 70, 'floor');

        // create player and animation
        this.player = this.game.add.sprite(this.game.width/2, this.game.height - 90, 'ra');
        this.player.animations.add('walk');

        //create managers
        this.generateManagers();
        // create file cabinets
        this.generateCabinets();
        //todo create other items (obstacles + rewards)

        // place items in proper order IE we want cabinets on the floor not under it

        this.game.world.bringToTop(this.cabinets);
        this.game.world.bringToTop(this.floor);

        //enable physics
        this.game.physics.arcade.enable(this.player);
        this.game.physics.arcade.enable(this.floor);
        this.game.physics.arcade.enable(this.cabinets);

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
        this.points = 365;
        this.wrapping = true;
        this.maxCollisions = 5;

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
        this.game.physics.arcade.collide(this.player, this.floor, this.playerHit, null, this);
        this.game.physics.arcade.collide(this.player, this.cabinets, null, null, this);
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
                this.cabinets.destroy();
                this.generateCabinets();

                //put everything back in the proper order

                this.game.world.bringToTop(this.cabinets);
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
    playerHit : function(player, blockedLayer) {
        if (player.body.touching.right) {
            // todo add functionality to obstacles
        }
    },
    collect : function(player, item) {
        // todo add collection of $$ or challenge coins etc
    },
    playerJump : function() {
        // since the ground is a sprite we have to test for touch
        if (this.player.body.touching.down) {
            this.player.body.velocity.y = -700;
        }
    },
    generateManagers : function() {
        this.managers = this.game.add.group();
        // enable physics
        this.managers.enableBody = true;
        var numManagers = this.game.rnd.integerInRange(0, 2);
        var manager;
        // todo figure out generation.

        // this is the meat of manager gen.
        var x = this.game.rnd.integerInRange(this.game.width, this.game.world.width - this.game.width); // position horizontally
        manager = this.managers.create(x, this.game.height-170, 'jt');
        this.managers.callAll('animations.add', 'animations', 'wave', [0,1], 4, true);
        this.managers.callAll('animations.play', 'animations', 'wave');

    },
    generateCabinets : function() {
        this.cabinets = this.game.add.group();
        //enable physics
        this.cabinets.enableBody = true;
        var numCabinets = this.game.rnd.integerInRange(0,3);
        var cabinet;

        for (var i = 0; i < numCabinets; i++) {
            //add sprite within an area excluding the beginning and ending
            //  of the game world so items won't suddenly appear or disappear when wrapping
            var x = this.game.rnd.integerInRange(this.game.width, this.game.world.width - this.game.width);
            cabinet = this.cabinets.create(x, this.game.height-195, 'cabinet');
            cabinet.body.immovable = true;
            cabinet.body.velocity.x = 0;
        }
    }

};
