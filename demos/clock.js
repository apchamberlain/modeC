var colors = { body: '#ffd700', hands: '686868', face: '#f0f0f8'};

var xmax = 250,
    ymax = xmax;
var mC = modeC({ resolution: {x: xmax, y: ymax}, divname: 'modeC' });

var centerx = Math.round(xmax / 2),
    centery = centerx;
var outer_radius = Math.round((xmax / 2) * .8);
var body_thickness = Math.round(outer_radius / 20 );

mC.color('body', colors.body);   // Color table indices don't have to be numbers.
mC.setcolor('body');

for (var t = outer_radius; t > outer_radius - body_thickness; t--) {
    mC.circle(centerx, centery, t, 3);
}

mC.color('face', colors.face);
mC.setcolor('face');

for (; t > 0; t--) {
    mC.circle(centerx, centery, t, 3);
}

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

mC.color('hands', colors.hands);
mC.setcolor('hands');

drawHands(mC, centerx, centery, (outer_radius - body_thickness) * .9, 'hands', 0, 0);



(function loopWrapper() {
    var hourangle,
	minuteangle,
	oldhourangle,
	oldminuteangle;

    hourangle = 0;
    minuteangle = 0;

    var currtime;

    var oldtime = new Date();

    var runClock = function()
    {
	console.log("runClock");
	currtime = new Date();
	if (currtime - oldtime >= 60 * 1000) { // A minute has passed.
	    console.log("\tupdate");
	    oldtime = currtime;
	    oldhourangle = hourangle;
	    oldminuteangle = minuteangle;
	    minuteangle = degToRad((currtime.getMinutes() / 60) * 360) - Math.PI / 2;
	    hourangle = degToRad(((currtime.getHours() % 12 ) / 12) * 360) + minuteangle/12  - Math.PI / 2;
	    console.log("\t\tnew hour = " + currtime.getHours() + ", angle = " + hourangle);
	    console.log("\t\tnew minute = " + currtime.getMinutes() + ", angle = " + minuteangle);
	    // erase old hands
	    drawHands(mC, centerx, centery, (outer_radius - body_thickness) * .9,
		      'face', oldhourangle, oldminuteangle);
	    // draw new ones
	    drawHands(mC, centerx, centery, (outer_radius - body_thickness) * .9,
		      'hands', hourangle, minuteangle);
	}
    };

    setInterval(runClock, 5000);
})();
