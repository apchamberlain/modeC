modeC
=====

**Microlibrary for 8-bit style graphics programming in an HTML5 canvas**

There are probably a hundred different
[JavaScript game libraries](http://jster.net/category/game-engines),
including a couple meant specifically for writing retro 8-bit-style
games.  This is not one of them.  It is a very small (barely 3Kb even
without being minified) library for simulating relatively low-res
graphics without the conceptual overhead of the entire HTML5 `canvas`
apparatus.

##Usage##

You must have a `div` in your HTML code earmarked to contain a
`canvas` element.  Call the `mCode` function like this:

	var mC = mCode({x: 200, y: 100}, 'mcdiv');

the return value is your interface to a suite of functions that will
act on a `canvas` element created by the call to `mCode()`:

	mC.color(register, rgb) - set color register "register" to color "rgb"

	mc.setcolor(register) - set color in register "register" for subsequent drawing calls

	mc.plot(x, y) - plot pixel at (x, y) in last set color.  (0, 0) is at top left

	mc.line(x1, y1, x2, y2) - draw line from (x1, y1) to (x2, y2) in last set color

See `demos` folder for examples.

##To do##

Sprites, then collision detection.

##License##

[GPL v3](http://www.gnu.org/licenses/quick-guide-gplv3.html)
