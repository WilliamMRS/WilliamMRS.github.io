/*jslint devel: true */

/*
Game design:

Castle Defense with turrets and units.
waves of enemies.

gamemodes:
start one and one wave.
survival.

possible to save games and return to them at a later time.
get permament upgrades after doing some challenges.
*/

/*

WELCOME BACK!

Things to do:

add touch compatibility.

Update User Interface. Shops, health bars, items, spells, wave numbers, upgrades, armor and weapons. 
add medieval font to menu and UI.

make castle modular and upgradeable. Build barracks and stuffs.

make Zombie 2 and 3 appear at wave 5 and 10 respectively.

Start working on being able to buy units yourself that protect the castle. - Barracks.

Create rewards system for killing monsters. Usable in the shop.

First units are positioned in front of the castle with somewhere to see amount and health up right. Knights.

Remember to reduce file size of sprites. Over 3GB right now. (now at 1.8GB reduce further)

create new types of monsters and pre-sets for waves.

create animation-engine for all possible animations, like running, attacking, getting hurt etc.

*/

function loadGame() {
    //sets game-resolution
    widthRes = 1920;
    heightRes = 1080;
    gameHasStarted = false;
    mX = 0;
    mY = 0;
    unitNumber = 0;
    //gets HTML objects
    mainContent = document.getElementById("mainContent");

    mainMenu = document.getElementById("mainMenu");

    //loads assets into js
    loadAssets();
    loadGameWindow();

    //activates mouse interactivity
    window.onmousedown = function (e) {
        //scales mouse coords to know where on canvas resolution mouse was clicked
        widthScale = widthRes/gameWindow.getBoundingClientRect().width;
        heightScale = heightRes/gameWindow.getBoundingClientRect().height;
        mX = (e.pageX * widthScale).toFixed(0);
        mY = (e.pageY * heightScale).toFixed(0);
        click = true;

    };
    click = false;
    console.log('game loaded!');
    console.log("Welcome inspector :) The newest version of the project with all its resources is avaliable at github.com/williammrs. Suggestions are welcome!");
}
window.onload = loadGame;

loadAssets = function(){
    //access texture pool (empty)
    texturePool = document.getElementById('texturePool');

    dagger1Txt = document.getElementById('dagger1');
}

loadGameWindow = function(){
    gameWindow = document.getElementById("gameWindow");
    ctx = gameWindow.getContext("2d");
    gameWindow.height = heightRes;
    gameWindow.width = widthRes;
    updateUI();
    //draws frame
    drawSquare({ctx: ctx, x: 0, y: 0, height: heightRes, width: widthRes, color: "black",});
}

updateUI = function(){
    let gameWindowWidth = gameWindow.getBoundingClientRect().width; //not in use
    let gameWindowHeight = gameWindow.getBoundingClientRect().height;
    mainMenu.style.paddingTop =  gameWindowHeight/2 - (mainMenu.getBoundingClientRect().height/2) + 'px';
}

createID = function(){ //creates an unique ID for units. Useful for texture identifiers etc.
    unitNumber = (unitNumber + 1);
    return unitNumber;
}

let gameEngine = {
    initializers: {
        'startNewGame': function(){
        mainMenu.style.display = 'none'; //hides menu
        document.getElementById('gameUI').style.display = 'block'; //shows in-game UI
        setInterval(gameEngine.render.frame, 1000/30); //Starts game at 30 FPS
        gameHasStarted = true;
        }
    },
    render: {
        'frame': function(){
            ctx.clearRect(0, 0, widthRes, heightRes);//clears frame
            //draws background (placeholder)
            drawFilledSquare({ctx: ctx, x: 0, y: 1080, height: 500, width: 1920, color: "green",});
            drawFilledSquare({ctx: ctx, x: 0, y: 580, height: 580, width: 1920, color: "lightblue",});

            //draws castle
            gameEngine.castle.render();
            /*
            Manages enemy wave spawning
            */

            //check if next wave is pressed, and check prepared units. Spawn accordingly.
            if(gameEngine.waveManager.nextWavePressed === true){
                gameEngine.waveManager.nextWavePressed = false;

                //checks zombie1 cache
                let preparedZ1 = gameEngine.waveManager.preparedUnits.zombie1;
                console.log("prepared zombies : " + gameEngine.waveManager.preparedUnits.zombie1);
                if(preparedZ1 > 0){
                    for(i = 0; i < preparedZ1; i += 1){
                        gameEngine.waveManager.liveUnits.zombie1[i] = new Zombie(ctx, 1, 0 + (i*100), 850 - randomNumber(350), createID());
                        gameEngine.waveManager.liveUnits.zombie1[i].spawn();
                        gameEngine.waveManager.preparedUnits.zombie1 -= 1;
                    }
                }
            }

            if(gameEngine.waveManager.liveUnits.zombie1.length >= 1){
                for(y = 0; y < gameEngine.waveManager.liveUnits.zombie1.length; y += 1){
                    if(gameEngine.waveManager.liveUnits.zombie1[y]){
                        if(gameEngine.waveManager.liveUnits.zombie1[y].alive === true){ 
                            gameEngine.waveManager.liveUnits.zombie1[y].render();
                        }
                    }
                }
            }
            /*
            Development area
            */

            //draws screen-frame
            drawSquare({ctx: ctx, x: 0, y: 0, height: heightRes, width: widthRes, color: "black",});
            //draws castle hitbox
            //drawSquare({ctx: ctx, x: 350, y: 1080, height: -heightRes, width: 1, color: "Red",});

            /*
            End of development area
            */

            //draw player attack animations
            if(click === true && gameHasStarted === true && gameEngine.player.attackActive === false){
                gameEngine.player.clickAniStep = gameEngine.player.attackDuration*30;
                gameEngine.player.maxSteps = 90/gameEngine.player.clickAniStep; //maxsteps used for animationscaling so weapons always move 90 degrees.
                gameEngine.player.attackCoordinates[0] = Number(mX) - 120;
                gameEngine.player.attackCoordinates[1] = Number(mY) - 76;
                gameEngine.player.attackActive = true;
            }
            if(gameEngine.player.clickAniStep > 0){
                drawRotatedImage(gameEngine.player.attackCoordinates[0], gameEngine.player.attackCoordinates[1], dagger1Txt, 180 - gameEngine.player.clickAniStep * gameEngine.player.maxSteps);
                gameEngine.player.clickAniStep += -1;
                if(gameEngine.player.clickAniStep < 1){
                    gameEngine.player.attackActive = false;
                }
            }

            //Resets necessary data before next frame
            click = false;
        }
    },
    waveManager:{
        'nextWavePressed': false,
        'allDead': true,
        'waveNumber': 0,
        'nextWave': function(){
            if(gameEngine.waveManager.allDead === true && unitNumber === 0){
                //prepares next wave, spawns units and sends them out according to a certain roadmap for that wave. Random y axis placements.
                //delete previous wave data
                texturePool.innerHTML = '';
                gameEngine.waveManager.liveUnits.zombie1 = [];
                gameEngine.waveManager.waveNumber += 1;
                console.log('next wave coming in!' + ' Wave number ' + gameEngine.waveManager.waveNumber + '!');
                gameEngine.waveManager.preparedUnits.zombie1 = gameEngine.waveManager.waveNumber;
                gameEngine.waveManager.nextWavePressed = true;
                unitNumber = 0;
                document.getElementById('nextWave').style.backgroundColor = 'grey';
                allDead = false;
            }else{
                //do nothing
            }
        },
        'preparedUnits':{ //Cache of units to spawn! The render and wavemanager uses these to keep track of units left to create.
            'zombie1': 0,
        },
        'liveUnits':{
            'zombie1': [],
        }
    },
    player:{
        'clickDamage': 1,
        'clickAniStep': 0,
        'maxSteps': 0, //maximum anisteps. Used for animation
        'attackDuration': 0.4, //measured in seconds
        'attackCoordinates': [],
        'attackActive': false,
        'chosenWeapon': 'dagger1', //default weapon
        'unlockedWeapons': ['dagger1'],
    },
    castle:{
        'hitpoints': 100,
        'x': 0,
        'y': 1080,
        'height': 1080,
        'width': 350 ,
        'render': function(){
            ctx.drawImage(document.getElementById('castleCoreTexture'), 220, 650); //Castlecore
        }
    }
}

class Zombie{
	constructor(ctx,type,x,y, id){
        this.type = type;
		this.x = x + widthRes;
        this.y = y;  
        this.ctx = ctx;
        //hitbox
        this.width = 115;
        this.height = 190;
        //placeholder for animationInterval
        this.alive = false;
        this.aniStep = 0;
        this.id = id;
        this.unitName = 'zombie';
        
        //create unique texture resource in html
        texturePool.innerHTML += '<img id ="z1WT' + this.id + '" src="resources/Sprites/enemies/zombies/PNG/Zombie1/animation/Walk1.png" style = "display:none" alt="">';
        if(this.type === 1){
            this.health = 10;
            this.movespeed = -1;
            this.attackDamage = 1;
        }else if(type === 2) {
            this.health = 100;
            this.movespeed = -2;
            this.attackDamage = 2;
        }else if(type === 3){
            this.health = 1000;
            this.movespeed = -0,5;
            this.attackDamage = 3;
        }
        this.texture = document.getElementById('z1WT' + this.id);
    }
    spawn(){ // goes into a one time function
        this.alive = true;
        this.aniStep = randomNumber(29);
        //console.log('spawned zombie:' + JSON.stringify(gameEngine.waveManager.liveUnits.zombie1[(this.id-1)]));
    }
    render(){
        //animates using anistep and framerate.
        if(this.aniStep <= 69){ //plays walking animation
            this.aniStep += 1;
        }
        if(this.aniStep >= 30 && this.health >= 1){ //resets walking animation
            this.aniStep = 0;
        }

        switch(this.aniStep) {
                case 0:
                document.getElementById('z1WT' + this.id).src = 'resources/Sprites/enemies/zombies/PNG/Zombie1/animation/Walk1.png';
                break;
                case 5:
                document.getElementById('z1WT' + this.id).src = 'resources/Sprites/enemies/zombies/PNG/Zombie1/animation/Walk2.png';
                break;
                case 10:
                document.getElementById('z1WT' + this.id).src = 'resources/Sprites/enemies/zombies/PNG/Zombie1/animation/Walk3.png';
                break;
                case 15:
                document.getElementById('z1WT' + this.id).src = 'resources/Sprites/enemies/zombies/PNG/Zombie1/animation/Walk4.png';
                break;
                case 20:
                document.getElementById('z1WT' + this.id).src = 'resources/Sprites/enemies/zombies/PNG/Zombie1/animation/Walk5.png';
                break;
                case 25:
                document.getElementById('z1WT' + this.id).src = 'resources/Sprites/enemies/zombies/PNG/Zombie1/animation/Walk6.png';
                break;
                case 30:
                document.getElementById('z1WT' + this.id).src = 'resources/Sprites/enemies/zombies/PNG/Zombie1/animation/Dead1.png';
                break;
                case 35:
                document.getElementById('z1WT' + this.id).src = 'resources/Sprites/enemies/zombies/PNG/Zombie1/animation/Dead2.png';
                break;
                case 40:
                document.getElementById('z1WT' + this.id).src = 'resources/Sprites/enemies/zombies/PNG/Zombie1/animation/Dead3.png';
                break;
                case 45:
                document.getElementById('z1WT' + this.id).src = 'resources/Sprites/enemies/zombies/PNG/Zombie1/animation/Dead4.png';
                break;
                case 50:
                document.getElementById('z1WT' + this.id).src = 'resources/Sprites/enemies/zombies/PNG/Zombie1/animation/Dead5.png';
                break;
                case 55:
                document.getElementById('z1WT' + this.id).src = 'resources/Sprites/enemies/zombies/PNG/Zombie1/animation/Dead6.png';
                break;
                case 60:
                document.getElementById('z1WT' + this.id).src = 'resources/Sprites/enemies/zombies/PNG/Zombie1/animation/Dead7.png';
                break;
                case 65:
                document.getElementById('z1WT' + this.id).src = 'resources/Sprites/enemies/zombies/PNG/Zombie1/animation/Dead8.png';
                break;
                case 70:
                document.getElementById('z1WT' + this.id).src = '';
                this.alive = false;
                this.deSpawn();
                break;
            default:
            //do nothing
        }
        this.texture = document.getElementById('z1WT' + this.id);
        //checks if enemy is clicked during this frame
        if(click === true && gameEngine.player.attackActive === false){
            if(mX >= this.x && mX <= (this.x + this.width) && mY >= this.y && (mY <= this.y + this.height)){
                this.health += -gameEngine.player.clickDamage;
            }
        }
        if(this.x < 350){
            this.movespeed = 0;
            gameEngine.castle.hitpoints += -this.attackDamage/30
            console.log(gameEngine.castle.hitpoints);
            //animate attack
        }
        this.x = this.x + this.movespeed; //moves zombie
        //checks if zombie is alive
        if(this.aniStep <= 69){
            this.ctx.drawImage(this.texture, this.x, this.y);
        }
    }
    deSpawn(){ //despawns object
        this.texture = '';
        this.alive = false;
        let myId = this.id-1;
        delete gameEngine.waveManager.liveUnits.zombie1[myId];
        unitNumber -= 1;
        //checks if current wave is dead (can be checked every second, or every time a unit dies)
        console.log(unitNumber);
        if(unitNumber === 0){
            document.getElementById('nextWave').style.backgroundColor = 'yellow';
            gameEngine.waveManager.allDead = true;
        }
    }
    renderHitbox(){ //renders hitbox --- goes into rendering engine --- debugging purposes
        drawSquare({ctx: ctx, x: this.x, y: this.y, height: this.height, width: this.width, color: "red",});
    }
}

class Orc extends Zombie{
	constructor(ctx,type,x,y){
        super(ctx, type, x, y);
        this.width = 250;
        this.height = 300;
	}
}