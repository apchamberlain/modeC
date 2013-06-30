var mC = modeC({mode: 3}, 'modeC');

var roygbiv = ['#FF0000',
	       '#FF7300',
	       '#FFFF00',
	       '#33FF00',
	       '#00FFE1',
	       '#0000FF',
	       '#9900FF'];

roygbiv.push('#888888');

var color = 0;
for (var startx = 0; startx < 40 ; startx += 5) {
    mC.color(color,roygbiv[color]);
    mC.setcolor(color);
    for (var x = startx; x < startx + 5; x++) {
	mC.line(x, 0, x, 24);
    }
    color++;
}
