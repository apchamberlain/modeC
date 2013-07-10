// Setup

var colors = { body: 'a0522d', chrome: '#ffd700', hands: '686868', face: '#f0f0f8'};

var xmax = 250,
    ymax = xmax;

var mC = modeC({ resolution: {x: xmax, y: ymax}, divname: 'modeC' });

var centerx = Math.round(xmax / 2),
    centery = centerx;
var outer_radius = Math.round((xmax / 2) * .8);
var chrome_thickness = Math.round(outer_radius / 20 );

mC.color('body', colors.body);   // Color table indices don't have to be numbers.
mC.color('chrome', colors.chrome);
mC.color('hands', colors.hands);
mC.color('face', colors.face);


function degToRad(deg) {
    return (deg / 360) * 2 * Math.PI;
}

function polarToCartesian(p) {
    return {x: p.r * Math.cos(p.t), y: p.r * Math.sin(p.t)};
}

function drawHands(modeCobj, centerx, centery, length, color, hourangle, minuteangle) {
    modeCobj.setcolor(color);
    var hour_tip = polarToCartesian({r: length * 2/3, t: hourangle});
    hour_tip.x += centerx;
    hour_tip.y += centery;
    var minute_tip = polarToCartesian({r: length, t: minuteangle});
    minute_tip.x += centerx;
    minute_tip.y += centery;
    modeCobj.line(centerx, centery, Math.round(hour_tip.x), Math.round(hour_tip.y));
    modeCobj.line(centerx, centery, Math.round(minute_tip.x), Math.round(minute_tip.y));
}

// Draw static elements

mC.setcolor('body');

mC.rectangle(0, 0, xmax - 1, ymax - 1);

mC.setcolor('chrome');

for (var t = outer_radius; t > outer_radius - chrome_thickness; t--) {
    mC.circle(centerx, centery, t, 3);
}

// Hour markers
for (var a = 0; a < 360; a += 30) {
    drawHands(mC, centerx, centery, outer_radius,
	  'hands', degToRad(a), degToRad(a));
}

mC.setcolor('face');

for (; t > 0; t--) {
    mC.circle(centerx, centery, t, 3);
}



(function loopWrapper() {
    // Sometimes it makes sense to minimize passing parameters around
    // but avoid polluting the global namespace by declaring a bunch
    // of closures that all act on a set of variables global to them
    // and only them.

    var hourangle,
	minuteangle,
	oldhourangle,
	oldminuteangle;

    var currtime = new Date();
    var oldtime = currtime;

    var getHandAngles = function() {
	minuteangle = degToRad((currtime.getMinutes() / 60) * 360)
	    - Math.PI / 2;
	hourangle = degToRad(((currtime.getHours() % 12 ) / 12) * 360)
	    + minuteangle/12  - Math.PI / 2;
    };

    getHandAngles();

    // draw hands in initial position
    drawHands(mC, centerx, centery, (outer_radius - chrome_thickness) * .9,
	      'hands', hourangle, minuteangle);

    var runClock = function()
    {
	currtime = new Date();
	if (currtime - oldtime >= 60 * 1000) { // A minute has passed.
	    oldtime = currtime;
	    oldhourangle = hourangle;
	    oldminuteangle = minuteangle;
	    getHandAngles();
	    // erase old hands
	    drawHands(mC, centerx, centery, (outer_radius - chrome_thickness) * .9,
		      'face', oldhourangle, oldminuteangle);
	    // draw new ones
	    drawHands(mC, centerx, centery, (outer_radius - chrome_thickness) * .9,
		      'hands', hourangle, minuteangle);
	}
    };

    setInterval(runClock, 5000);
})();
