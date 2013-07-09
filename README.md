modeC
=====

**Microlibrary for 8-bit-style graphics programming in an HTML5 canvas**

There are probably a hundred different
[JavaScript game libraries](http://jster.net/category/game-engines),
including a couple meant specifically for writing retro 8-bit-style
games.  This is not one of them.  It is a small library (about  1K
minified!)  for simulating relatively low-res graphics without the
conceptual overhead of the entire HTML5 `canvas` apparatus.

See it in action at [http://foolsmate.net/demos/modeC](http://foolsmate.net/demos/modeC)

(Infrequently Asked Question: "How should I pronounce 'modeC'?"  Answer:
Like "mode sea," not "Moe-deck.")


##Usage##

You must have a `div` in your HTML code with `width` and `height` CSS
properties defined for the size of your output "screen."  This will be
replaced with a `canvas` element by the setup code when you call the
`modeC` function like this:

	var mC = modeC({x: 200, y: 100}, 'mcdiv');

`x` and `y` define the resolution of the virtual screen you want,
which will be scaled up to fit your `div`.  (Beware of non-square
pixels!)  The return value is your interface to a suite of functions
that will act on the new `canvas`:

	mC.color(register, rgb) - set color register "register" to color "rgb"

	mC.setcolor(register) - set color in register "register" for subsequent drawing calls

	mC.plot(x, y) - plot pixel at (x, y) in last set color.  (0, 0) is at top left

	mC.line(x1, y1, x2, y2) - draw line from (x1, y1) to (x2, y2) in last set color

	mC.rectangle(x0, y0, x1, y1)  - draw solid rectangle, top left at (x1, y1) and bottom right at (x2, y2) in last set color

	mC.circle(x, y, r) - circle centered at (x,y) with radius r

See `demos` folder for examples.

##To do (roughly in order)##

* Bresenham's algorithm for diagonal lines.  **Done!**

* Clock and Kaleidescope demos.

* Change all identifiers to camelCase.  I've been doing a lot of
  Python programming lately and keep using underscores in variable
  names...

* Arc primitives.

* Fill irregular shapes (i.e., given a point inside an enclosed shape,
  fill outward in all directions until you hit a specified color).
  (Atari nerds know this as `XIO 18`.)

* A Qix demo.

* Pixelicious text routines.

* Sprites&mdash;first just moving them without changing the background, then
  collision detection.

* A sprite demo!

##License##

[GPL v3](http://www.gnu.org/licenses/quick-guide-gplv3.html)
