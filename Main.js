var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
ctx.imageSmoothingEnabled = false;
var canvasWidth = c.width;
var canvasHeight = c.height;

var textures = new Map();
Array.from(document.images).forEach(i => {
    textures.set(i.id,i);
});

var gameState;
var inputs = Inputs.empty();
inputs.attachInput("ENTER",'Enter');

document.addEventListener('keydown', (e) => {
    inputs.update(e.key,true);
});
document.addEventListener('keyup', (e) => {
    inputs.update(e.key,false);
});

let mySongData = zzfxM(...bgMusicSong);
let myAudioNode = zzfxP(...mySongData);
myAudioNode.loop = true;
myAudioNode.start();
var musicToggle = true;
var soundToggle = true;

var paused = false;

var playing = false;


function draw(ctx){
    ctx.clearRect(0,0,canvasWidth,canvasHeight);
    if(!this.paused && !gameState.gameOver){
        gameState.update(inputs.getInputs(),soundToggle);
    }
    ctx.save();
    gameState.draw(ctx);
    ctx.restore();
    if(this.paused){
        ctx.textAlign = 'left'
        ctx.font = "99px Courier New";
        ctx.fillStyle = rgbToHex(50,50,50);
        ctx.fillText("PAUSED",canvasWidth*0.32,canvasHeight*0.4);
        ctx.font = "100px Courier New";
        ctx.fillStyle = rgbToHex(0,0,0);
        ctx.fillText("PAUSED",canvasWidth*0.32 - 3,canvasHeight*0.4);
    }
    ctx.textAlign = 'left'
    ctx.font = "15px Courier New";
    ctx.fillStyle = rgbToHex(0,0,0);
    ctx.fillText("Toggle M",canvasWidth*0.01,canvasHeight*0.92);
    if(soundToggle){
        ctx.font = "23px Courier New";
        ctx.fillText("🔊",canvasWidth*0.01,canvasHeight*0.98);
    }
    if(musicToggle){
        ctx.font = "40px Courier New";
        ctx.fillText("♬",canvasWidth*0.05,canvasHeight*0.98);
    }
    
    if(!inputs.prevStates.includes("ESC") && inputs.getInputs().includes("ESC")){
        if(gameState.inShop){
            gameState.inShop = false;
            gameState.shopCutscene = false;
        } else {
            if(!gameState.spawnBoss){
                this.paused = !this.paused;
            }
        }
    }
    
    if(!inputs.prevStates.includes("RESTART") && inputs.getInputs().includes("RESTART")){
        var coins = localStorage.getItem("AJSNDJNSAJKJNDSKJMirroriaCoinsYRYRBHJASKWA");
        var weapon = JSON.parse(localStorage.getItem("AJSNDJNSAJKJNDSKJMirroriaWeaponYRYRBHJASKWA"));
        gameState=GameState.initial(coins,weapon,gameState.lastShopNum);
    }

    if(!inputs.prevStates.includes("CLEARSTORAGE") && inputs.getInputs().includes("CLEARSTORAGE")){
        gameState.coins = 0;
        gameState.equipedWeapon = makeStartWeapon(gameState.playerSize);
        localStorage.setItem("AJSNDJNSAJKJNDSKJMirroriaCoinsYRYRBHJASKWA",0);
        localStorage.setItem("AJSNDJNSAJKJNDSKJMirroriaWeaponYRYRBHJASKWA",JSON.stringify(gameState.equipedWeapon));
    }

    if(!inputs.prevStates.includes("MUTE") && inputs.getInputs().includes("MUTE")){
        if(musicToggle && soundToggle){
            soundToggle = !soundToggle;
        } else if(musicToggle && !soundToggle){
            musicToggle = !musicToggle;
        } else if(!musicToggle && !soundToggle){
            soundToggle = !soundToggle;
        } else if(!musicToggle && soundToggle){
            musicToggle = !musicToggle;
        }

        if(!musicToggle){
            myAudioNode.disconnect();
        } else {
            myAudioNode.connect(zzfxX.destination);
        }
    }

    if(!playing){
        ctx.fillStyle = rgbToHexAlpha(0,0,0,220);
        ctx.fillRect(0,0,canvasWidth,canvasHeight);
        var scale = 5;
        ctx.drawImage(textures.get("MirroriaImg"),(canvasWidth/2) - ((118*scale)/2),canvasHeight*0.05,118*scale,33*scale);
        ctx.fillStyle = rgbToHex(250,250,250);
        ctx.font = "20px Courier New";
        ctx.textAlign = 'center';
        ctx.fillText("WASD to Move.",canvasWidth/2,canvasHeight*0.45);
        ctx.fillText("Left and Right Arrow Keys to Attack.",canvasWidth/2,canvasHeight*0.55);
        ctx.fillText("Q and E to Switch Item.",canvasWidth/2,canvasHeight*0.65);
        ctx.fillText("Shift to Use Item.",canvasWidth/2,canvasHeight*0.75);
        ctx.font = "24px Courier New";
        ctx.fillText("Press Enter to Start.",canvasWidth/2,canvasHeight*0.85);
        if(inputs.getInputs().includes("ENTER")){
            playing = true;
            inputs.attachInputs();
        }
    }

    inputs.prevStates = inputs.getInputs();
}

var loadedImages = false;
var loadChecker;
loadChecker = setInterval(() => {
    if(loadedImages){
        clearInterval(loadChecker);
        var coins = localStorage.getItem("AJSNDJNSAJKJNDSKJMirroriaCoinsYRYRBHJASKWA");
        var weapon = JSON.parse(localStorage.getItem("AJSNDJNSAJKJNDSKJMirroriaWeaponYRYRBHJASKWA"));
        gameState = GameState.initial(coins,weapon,-1);
        gameState.update([],soundToggle);
        setInterval(() => draw(ctx),50);
    } else {
        loadedImages = true;
        ctx.fillStyle = rgbToHex(0,0,0);
        ctx.fillText("Loading",canvasWidth/2,canvasHeight/2);
        Array.from(textures.keys()).forEach(i => {
            if(!textures.get(i).complete){
                loadedImages = false;
            }
        })
    }
},50);
