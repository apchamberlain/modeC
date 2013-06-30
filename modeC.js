//   modeC
//
//   Microlibrary for 8-bit style graphics programming with the HTML5 canvas
//
//
//   Copyright (C) 2013  Alexander Park Chamberlain
//
//   Author: Alex Chamberlain <apchamberlain@gmail.com>
//   Version: 0.1
//
//   This program is free software; you can redistribute it and/or modify
//   it under the terms of the GNU General Public License as published by
//   the Free Software Foundation, either version 3 of the License, or
//   (at your option) any later version.

//   This program is distributed in the hope that it will be useful,
//   but WITHOUT ANY WARRANTY; without even the implied warranty of
//   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//   GNU General Public License for more details.

//   You should have received a copy of the GNU General Public License
//   along with this program.  If not, see <http://www.gnu.org/licenses/>.


function modeC(init, divname) {
    // divname = name of div in which to create a canvas.  if none,
    // assume "modeC".  This allows for multiple "screens" per web
    // page.  init = an object containing init info (graphics mode,
    // etc.)  If none, assume no init yet, just return an object
    // containing member functions as closures.

    // Get the size of the div and insert a canvas element.
    divname = divname || "modeC";
    init = init || { mode: 3 };

    var resolution;
    if (init.mode) {
	switch (init.mode) {
	case 3: resolution = { x: 40, y: 25 }; break;
	case 5: resolution = { x: 80, y: 50 }; break;
	case 7: resolution = { x: 160, y: 100 }; break;
	case 8: resolution = { x: 320, y: 200 }; break;
	}
    } else {
	resolution = init.resolution;
    }

    var ourDiv = document.getElementById(divname);
    var ourRect = ourDiv.getBoundingClientRect();
    var ourWidth = ourRect.width;
    var ourHeight = ourRect.height;

    var ourCanvas = document.createElement('canvas');
    ourCanvas.width = ourWidth;
    ourCanvas.height = ourHeight;
    ourDiv.appendChild(ourCanvas);

    // Variables for closures.
    var context = ourCanvas.getContext('2d');
    var registers = [];
    var colors = [];
    var currentRegister;
    // xScale and yScale conveniently are also the size of our pixel.
    var xScale = Math.ceil(ourWidth / resolution.x);
    var yScale = Math.ceil(ourHeight / resolution.y);

    var modeCobj = { color: function(register, rgb) { registers[register] = rgb; },
		     setcolor: function(register) { currentRegister = register; },
		     plot: function(x, y) {
			 context.fillStyle = registers[currentRegister];
			 context.fillRect(xScale * x, yScale * y, xScale, yScale);
		     },
		     line: function(x1, y1, x2, y2) {
			 context.fillStyle = registers[currentRegister];
			 if (x1 === x2 || y1 === y2) {
			     context.fillRect(xScale * x1, yScale * y1,
					      xScale * Math.abs(x1 - x2 + 1),
					      yScale * Math.abs(y1 - y2 + 1));
			 } else {
			     /* TODO */
			 }
		     }
		   };

    return modeCobj;
}
