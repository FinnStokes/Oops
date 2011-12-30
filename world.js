var obstacle = function (spec, my) {
    var that;
    my = my || {};

    that = new Container();

    that.x = spec.x || (world.width - (stage.x / stage.scaleX));
    that.y = spec.y || 7;

    that.tick = function () {
        if (that.x + (stage.x / stage.scaleX) < -1) {
            world.removeChild(that);
        }

        if (pc.x + 1 > that.x &&
            pc.x < that.x + 1 &&
            pc.y + 1 > that.y) {
            world.removeChild(that);
        }
    }

    return that;
}

var table = function (spec, my) {
    var that;
    my = my || {};

    that = obstacle(spec, my);

    (function () {
        var g = new Graphics();
        g.setStrokeStyle(0.2);
        g.beginStroke(Graphics.getRGB(0,0,0));
        g.drawCircle(0.5,0.5,0.4);
        var sprite = new Shape(g);
        that.addChild(sprite);
    }());

    return that;
}

var vase = function (spec, my) {
    var that;
    my = my || {};

    that = obstacle(spec, my);

    (function () {
        var g = new Graphics();
        g.setStrokeStyle(0.2);
        g.beginStroke(Graphics.getRGB(0,0,0));
        g.drawRect(0.1,0.1,0.8,0.8);
        var sprite = new Shape(g);
        that.addChild(sprite);
    }());

    return that;
}

var world = function (spec, my) {
    var that;
    my = my || {};

    that = new Container();

    that.width = spec.width || 1;
    that.height = spec.height || 1;

    var nextSpawn = 0;

    that.tick = function () {
        var spawnX = that.width - (stage.x / stage.scaleX);
        if (spawnX >= nextSpawn) {
            nextSpawn += Math.floor(Math.random() * 8) + 5;

            var o;

            if(Math.random() < 0.5) {
                o = table({x: nextSpawn});
            } else {
                o = vase({x: nextSpawn});
            }

            that.addChild(o);
        }
    };
    
    return that;
}
