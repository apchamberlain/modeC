var roygbiv = ['#FF0000',
	       '#FF7300',
	       '#FFFF00',
	       '#33FF00',
	       '#00FFE1',
	       '#0000FF',
	       '#9900FF'];

var other_colors = { sky: '#D8DFE6', buildings: 'Gray', windows: '#3D4C4C'};

var xmax = 500;
var ymax = Math.floor(xmax/1.6);
var mC = modeC({ resolution: {x: xmax, y: ymax}, divname: 'modeC' });

var x, y;


// It's another rainy day in Portland!
// Draw a blue-gray sky...

mC.color('sky', other_colors.sky);   // Color table indices don't have to be numbers.
mC.setcolor('sky');
var sky_y = Math.round(ymax * 9 / 12);
for (x = 0; x < xmax - 1; x++) {
    mC.line(x, 0, x, sky_y);
}



// and a pretty rainbow...

var centerx = Math.round(Math.random() * xmax * 9/12 + xmax * 1/12 + 1);
var centery = sky_y;
var outer_radius = Math.round(sky_y * .95);
var band_thickness = Math.round(outer_radius / 4 / roygbiv.length);
for (var stripe_color = 0; stripe_color < roygbiv.length; stripe_color++) {
    mC.color(stripe_color,roygbiv[stripe_color]);
}
for (stripe_color = 0; stripe_color < roygbiv.length; stripe_color++) {
    mC.setcolor(stripe_color);
    for (var t = 0; t < band_thickness; t++) {
	mC.circle(centerx, centery, outer_radius - t, 3);
    }
    outer_radius -= band_thickness;
}


// ...and a city skyline.

mC.color('buildings', other_colors.buildings);
mC.color('windows', other_colors.windows);
x = 0;
var sky_height = ymax - sky_y;
var building_height = Math.round(Math.random() * sky_height + sky_height);
var delta_building_height = 0;
var building_width, border_width, window_size, window_gap, window_x, window_y, i;

do {
    building_width = Math.round(Math.random() * xmax * 1/10 + xmax * 1/20 + 1);
    mC.setcolor('buildings');
    mC.rectangle(x, ymax - building_height, x + building_width, ymax - 1);

    border_width = Math.round(building_width / 10);
    var window_size_x = border_width;
    var window_size_y = Math.round(window_size_x * 3/2);
    window_gap = Math.round(window_size_x / 2);

    mC.setcolor('windows');
//    console.log(x, window_size_x, border_width, window_gap, window_size_y);
     for (window_x = x + border_width; window_x + window_size_x + window_gap < x + building_width;
	  window_x += window_size_x + window_gap) {
     	mC.rectangle(window_x, ymax - building_height + border_width,
     		     window_x + window_size_x, ymax - building_height + border_width + window_size_y);
     }

    x += building_width;
    do {
	delta_building_height = Math.round(Math.random() * sky_height) * 2 - sky_height;
	building_height += delta_building_height;
    } while (building_height < sky_height || building_height > xmax * 3/4);
} while (x < xmax);
