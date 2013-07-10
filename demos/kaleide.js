(function loopWrapper() {

    var roygbiv = ['#FF0000',
		   '#FF7300',
		   '#FFFF00',
		   '#33FF00',
		   '#00FFE1',
		   '#0000FF',
		   '#9900FF'];

    // Setup

    var xmax = 50,
	ymax = xmax;

    var mC = modeC({ resolution: {x: xmax, y: ymax}, divname: 'modeC' });

    for (var i = 0; i < roygbiv.length; i++) {
	mC.color(i, roygbiv[i]);
    }

    var centerx = Math.round(xmax / 2),
	centery = centerx;

    // And now for something completely different: use the functional
    // constructs in Underscore.js with modeC.

    function offsetForCenter(point) {
	return [point[0] + centerx, point[1] + centery];
    }

    function reflectPoint(point) {
	var x = point[0];
	var y = point[1];
	return [[x, y], [x, -y], [-x, -y], [-x, y]];
    }

    var runKaleide = function()
    {
    	var line = [[Math.round((Math.random() * xmax / 2)),
    		     Math.round((Math.random() * ymax / 2))],
    		    [Math.round((Math.random() * xmax / 2)),
    		     Math.round((Math.random() * ymax / 2))]];
	var x_and_y_reflected_list = _.map(line, function(l) {return _.map(reflectPoint(l), offsetForCenter);});
	var klines = _.zip(x_and_y_reflected_list[0], x_and_y_reflected_list[1]);

    	mC.setcolor(Math.round(Math.random() * roygbiv.length));

    	_.each(klines, function(l) {
    	    mC.line(l[0][0], l[0][1], l[1][0], l[1][1]);
    	});
    };

    setInterval(runKaleide, 250);
})();
