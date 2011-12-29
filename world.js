var world = function (spec, my) {
    var that;
    my = my || {};

    that = new Container();

    that.width = spec.width || 1;
    that.height = spec.height || 1;
    
    return that;
}
