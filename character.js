var character = function (spec, my) {
    var that;
    my = my || {};

    that = new Container();

    that.x = spec.x || 0;
    that.y = spec.y || 0;
    that.vx = spec.vx || 0;
    that.vy = spec.vy || 0;

    that.tick = function () {
        that.x += that.vx * frameTime / 1000;
        that.y += that.vy * frameTime / 1000;
        
        if (my.state) {
            my.state = my.state();
        }
    }
    
    return that;
}
