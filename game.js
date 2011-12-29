var canvas; // main canvas element
var frameTime; // length of last frame in milliseconds
var keyDown = []; // array containing true for currently held keys
var keyPressed = []; // array containing true for keys pressed in the last tick
var pc; // player character
var stage; // main stage
var world; // the world the character interacts with

var KEYMAP = { // key bindings
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    jump: 32,
};

var init = function () {
    canvas = document.getElementById("game");
    stage = new Stage(canvas);
    
    // Initialise player character and world
    pc = player({
        x: 0,
        y: 7,
    });
    stage.addChild(pc);
    world = world({
        width: 16,
        height: 8,
    });
    stage.addChild(world);
    
    // Resize canvas to fit in window and set callbacks so it stays fitted
    resize();
    window.addEventListener('resize', resize, false);
    window.addEventListener('orientationchange', resize, false);
    
    Ticker.addListener(window);
};

var resize = function () {
    var screenWidth = window.innerWidth; // width of stage in screen coordinates
    var screenHeight = window.innerHeight; // height of stage in screen coordinates
    
    // Constrain canvas to aspect ratio given by world coordinates
    var targetAspect = world.width/world.height; // desired aspect ratio
    var windowAspect = screenWidth/screenHeight; // aspect ratio of window
    if(windowAspect > targetAspect) {
        // window is too wide
        screenWidth = screenHeight * targetAspect;
    } else {
        // window is too high
        screenHeight = screenWidth / targetAspect;
    }
    
    // Set canvas to constrained width & height
    canvas.width = screenWidth;
    canvas.height = screenHeight;
    
    stage.scaleX = screenWidth/world.width;
    stage.scaleY = screenHeight/world.height;
};

var tick = function (elapsedTime) {
    frameTime = elapsedTime;
    stage.x = (3 - pc.x)*stage.scaleX;
    stage.update();

    for (key in keyPressed) {
        delete keyPressed[key];
    }
};


// Handle key events
window.onkeydown = function (e) {
    for (key in KEYMAP) {
        if(e.keyCode === KEYMAP[key]){
            e.preventDefault();
            
            if (!keyDown[e.keyCode]) {
                keyPressed[e.keyCode] = true;
            }
            
            keyDown[e.keyCode] = true;
            
            return;
        }
    }
};
window.onkeyup = function (e) {
    for (key in KEYMAP) {
        if(e.keyCode === KEYMAP[key]){
            e.preventDefault();
            delete keyDown[e.keyCode];
        }
    }
};
