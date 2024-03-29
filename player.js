var player = function (spec, my) {
    var that;
    my = my || {};

    var anim;
    
    that = character(spec, my);
    
    var img = new Image();
    img.onload = function () {
	var sprite = new SpriteSheet({
	    images: [img],
	    frames: {width: 64, height: 64},
	    animations: {
		standing: 0,
                walk: [1,20,'walk'],
                running: [21,40,'running'],
                jump: [41,49],
                fall: [50,58],
                land: [59,60,'stand'],
                run: [61,63,'running'],
                stop: {
                    frames: [63,62,61],
                    next: 'walk',
                },
                crouch: [64,67,'jump'],
                stand: {
                    frames: [67,66,65,64],
                    next: 'standing',
                },
	    }
	});
        
        anim = new BitmapAnimation(sprite);
        anim.scaleX = 1/64;
        anim.scaleY = 1/64;
        anim.regX = 0;
        anim.regY = 0;
        anim.gotoAndPlay('walk');
        that.addChild(anim);
    };
    img.src = "player.png";

    var maxSpeed = 3;
    var walkSpeed = 1;
    var gravity = 9.8
    var accel = 2;
    
    var prejump = function () {
        if(anim && !anim.paused) {
            return prejump;
        } else {
            that.vy = -6;
            return jumping;
        }
    }

    var jumping = function () {
        if (that.vy > 0) {
                if(anim) {
                    anim.gotoAndPlay('fall');
                }

                return falling;
        }            

        that.vy += gravity * frameTime / 1000;
        return jumping;
    }
    
    var falling = function () {
        if (that.y >= 7) {
            that.vy = 0;
            that.y = 7;

            if ((that.vx < 0 && keyDown[KEYMAP.left]) || (that.vx > 0 && keyDown[KEYMAP.right])) {
                if(anim) {
                    anim.gotoAndPlay('run');
                }

                return running;
            } else {
                if(anim) {
                    anim.gotoAndPlay('land');
                }
                
                that.vx = 0;
                return standing;
            }
        }

        that.vy += gravity * frameTime / 1000;
        return falling;
    }

    var standing = function () {
        if (keyDown[KEYMAP.jump]) {
            if(anim) {
                anim.gotoAndPlay('crouch');
            }

            return prejump;
        }
        if (!keyDown[KEYMAP.left]) {
            if(anim) {
                anim.gotoAndPlay('walk');
            }

            return walking;
        }
        return standing;
    }

    var walking = function () {
        if (keyDown[KEYMAP.jump]) {
            if(anim) {
                anim.gotoAndPlay('crouch');
            }

            return prejump;
        }

        if (keyDown[KEYMAP.left]) {
            that.vx -= accel * frameTime / 1000;
            if(that.vx < 0) {
                if(anim) {
                    anim.gotoAndPlay('standing');
                }

                that.vx = 0;
                return standing
            }
        } else {
            that.vx += accel * frameTime / 1000;
            if (that.vx > walkSpeed) {
                if (keyDown[KEYMAP.right]) {
                    if (anim) {
                        anim.gotoAndPlay('run');
                    }

                    return running;
                }
                
                that.vx = walkSpeed;
            }
        }
        
        return walking;
    }
    
    var running = function () {
        if (keyDown[KEYMAP.jump]) {
            if(anim) {
                anim.gotoAndPlay('jump');
            }

            return prejump;
        }
        
        if (!keyDown[KEYMAP.right]) {
            that.vx -= accel * frameTime / 1000;
            if(that.vx <= walkSpeed) {
                if(anim) {
                    anim.gotoAndPlay('stop');
                }

                return walking
            }
        } else {
            that.vx += accel * frameTime / 1000;
            if (Math.abs(that.vx) > maxSpeed) {
                that.vx = maxSpeed;
            }
        }
        return running;
    }
        
    my.state = walking;
    
    return that;
}
