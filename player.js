var player = function (spec, my) {
    var that;
    my = my || {};
    
    that = character(spec, my);
    
    (function () {
        var g = new Graphics();
        g.setStrokeStyle(0.2);
        g.beginStroke(Graphics.getRGB(255,255,255));
        g.drawCircle(0.5,0.5,0.4);
        var sprite = new Shape(g);
        that.addChild(sprite);
    }());

    var maxSpeed = 5;
    var gravity = 9.8
    var accel = 5;
    
    var running = function () {
        if (keyDown[KEYMAP.jump]) {
            that.vy = -10;
            return jumping;
        }
        
        var speed = Math.abs(that.vx);
        if (speed === 0) {
            that.vx = 0;
            return standing;
        }
        
        var dir = that.vx / speed;
            
        if ((that.vx < 0 && !keyDown[KEYMAP.left]) || (that.vx > 0 && !keyDown[KEYMAP.right])) {
            that.vx -= dir * accel * frameTime / 1000;
            if(that.vx*dir < 0) {
                that.vx = 0;
                return standing
            }
        } else {
            that.vx += dir * accel * frameTime / 1000;
            if (Math.abs(that.vx) > maxSpeed) {
                that.vx = dir * maxSpeed;
            }
        }
        return running;
    }
    
    var jumping = function () {
        if (that.y >= 15) {
            that.vy = 0;
            that.y = 15;

            if ((that.vx < 0 && keyDown[KEYMAP.left]) || (that.vx > 0 && keyDown[KEYMAP.right])) {
                return running;
            } else {
                that.vx = 0;
                return standing;
            }
        }

        that.vy += gravity * frameTime / 1000;
        return jumping;
    }
    
    var standing = function () {
        if (keyDown[KEYMAP.jump]) {
            that.vy = -10;
            return jumping;
        }
        if (keyDown[KEYMAP.left]) {
            that.vx = -1 * accel * frameTime / 1000;
            return running;
        }
        if (keyDown[KEYMAP.right]) {
            that.vx = accel * frameTime / 1000;
            return running;
        }
        return standing;
    }
    
    my.state = standing;
    
    return that;
}
