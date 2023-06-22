# Mare
A graphing program that simulates geometry objects (Vectors , Points , Vector fields ...)
# Note that this project is not fully completed and it will be supported until Q4 2025
## Rendering 
#### Graphics is being renderd using 2d canvas context wich is so powerfull 
but not as fast as pure WebGl wich uses GLSL for shaders rendering
it may come in future updates as an option 
### Vectors
#### this simulation library provides an easy to use Vector system in 2d space
it uses this syntaxe
`
var vector = new Vector(x,y,p);
A.draw(ctx,unit,centerX,centerY)
`
where 
x : is the x coordinates of the Vector 
y : is the y coordinates of the Vector
p : is the origin of the vector it's a Point.
ctx : the 2D canvas context
unit : unit for scaling
centerX and centerY : center of the window

### Points 
#### Points in this library provides an easy to manage and use them
it uses this syntaxe : 
`
var A = new Vector(x,y);
A.draw(ctx,unit,centerX,centerY)
`
where `
x : is the x coordinates of the Point 
y : is the y coordinates of the Point
ctx : the 2D canvas context
unit : unit for scaling
centerX and centerY : center of the window
`
## For more details:
https://graphical-sim.web.app/
https://graphical-sim.firebaseapp.com
