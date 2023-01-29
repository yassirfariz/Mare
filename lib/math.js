function drawArrow(ctx, fromx, fromy, tox, toy, arrowWidth, color){
    //variables to be used when creating the arrow
    var headlen = 10;   // length of head in pixels
    var angle = Math.atan2(toy-fromy,tox-fromx);
 
    ctx.save();
    ctx.strokeStyle = color;
 
    //starting path of the arrow from the start square to the end square
    //and drawing the stroke
    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.lineWidth = arrowWidth;
    ctx.stroke();
 
    //starting a new path from the head of the arrow to one of the sides of
    //the point
    ctx.beginPath();
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),
               toy-headlen*Math.sin(angle-Math.PI/6));
 
    //path from the side point of the arrow, to the other side point
    ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/6),
               toy-headlen*Math.sin(angle+Math.PI/6));
 
    //path from the side point back to the tip of the arrow, and then
    //again to the opposite side point
    ctx.lineTo(tox, toy);
    ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),
               toy-headlen*Math.sin(angle-Math.PI/6));
 
    //draws the paths created above
    ctx.stroke();
    ctx.fill()
    ctx.restore();
}
/**
 * @class 2D plan 
 * a class that puts a relative to the origin (0,0)
 */
class Plan{
    /**
     * @param {number} xrange 
     * @param {number} theta
     */
    constructor (xrange,theta = 0){
        this.xrange = xrange   
        this.a = theta
    }
    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     * @param {number} unit 
     * @param {number} centerX 
     * @param {number} centerY 
     * @param {string} color
    */
    draw(ctx,unit,centerX,centerY,color = "rgb(255,255,255,1)"){
        drawArrow(ctx,centerX,centerY,centerX+this.xrange[1]*Math.cos(this.a)*unit,centerY-this.xrange[1]*Math.sin(this.a)*unit,2.5,color)
        drawArrow(ctx,centerX,centerY,centerX+this.xrange[1]*Math.cos(Math.PI/2+this.a)*unit,centerY-this.xrange[1]*Math.sin(Math.PI/2+this.a)*unit,2.5,color)
        drawArrow(ctx,centerX,centerY,centerX+this.xrange[0]*Math.cos(this.a)*unit,centerY-this.xrange[0]*Math.sin(this.a)*unit,2.5,color)
        drawArrow(ctx,centerX,centerY,centerX+this.xrange[0]*Math.cos(Math.PI/2+this.a)*unit,centerY-this.xrange[0]*Math.sin(Math.PI/2+this.a)*unit,2.5,color)
        ctx.closePath()
    }
}
class Plan3D{
    /**
     * @param {number} xrange 
     * @param {number} theta
     */
    
    
    constructor (xrange,theta = 0){
        this.a = theta
        this.xrange = xrange   
        this.i = new Vector(Math.cos(this.a),Math.sin(this.a));
        this.j = new Vector(-Math.cos(Math.PI/4+this.a),-Math.sin(Math.PI/4+this.a));
        this.k = new Vector(Math.cos(Math.PI/2),Math.sin(Math.PI/2));
    }
    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     * @param {number} unit 
     * @param {number} centerX 
     * @param {number} centerY 
     * @param {string} color
    */ 
    draw(ctx,unit,centerX,centerY,color = "rgb(255,255,255,1)"){
        drawArrow(ctx,centerX,centerY,centerX+this.xrange[1]*Math.cos(this.a)*unit,centerY-this.xrange[1]*Math.sin(this.a)*unit,2.5,color)
        drawArrow(ctx,centerX,centerY,centerX+this.xrange[1]*Math.cos(Math.PI/2)*unit,centerY-this.xrange[1]*Math.sin(Math.PI/2)*unit,2.5,color)
        drawArrow(ctx,centerX,centerY,centerX+(this.xrange[0])*Math.cos(this.a+Math.PI/4)*unit,centerY-(this.xrange[0])*Math.sin(this.a+Math.PI/4)*unit,2.5,color)
        ctx.closePath()
    }
}
/**
 * @class Vector 2D in a Plane
 * @param {number} x
 * @param {number} y
 */
class Vector{
    /**
     * the Class constructor
     * @param {number} x 
     * @param {number} y 
     * @param {Point} origin
     */
    constructor(x, y,origin=new Point(0,0)){
        this.x = x;
        this.y = y;
        this.origin = origin;
        this.xr;
        this.yr;
    }
    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     * @param {number} unit 
     * @param {number} centerX 
     * @param {number} centerY 
     * @param {string} color
    */
    draw(ctx,unit,centerX,centerY,color = "rgb(255,255,255,1)"){
        drawArrow(ctx,centerX+this.origin.x*unit,centerY+this.origin.y*-unit
            ,centerX+this.x*unit+this.origin.x*unit,
            centerY+this.y*-unit+this.origin.y*-unit,1.75,color);   
    }
    /**
     * @version 1.0
     * @param {Vector} v a vector object parameter
     * @returns {Vector} a result function of the vectors sum
     */
    add(v,origin=this.origin){
        this.xr = this.x+v.x;
        this.yr = this.y+v.y;
        return new Vector(this.xr, this.yr,origin);
    }
    /**
     * @version 1.0
     * @param {Vector} v a vector object parameter
     * @returns {Vector} a result function of the vectors difference
     */
    sub(v,origin = this.origin) {
        this.xr =this.x- v.x;
        this.yr =this.y- v.y;
        return new Vector(this.xr, this.yr,origin);
    }
    /**
     * @version 1.0
     * @param {Vector} v a vector object from the inital vector
     * @returns {number} distance or the norm of the vector
     */
    norm(){
        //uses the pythagorean theorem to calculate the distance between two null vectors (points)
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }
    /**
     * @version 1.0
     * @param {Vector} v second vector
     * @returns {bool}
     * 
     */
    colin(v){
        // use determinant matrix methode
        var det = this.x*v.y - this.y*v.x
        if (det == 0){
            return true
        }
        else{ return false}
    }
    /**
     * @version 1.0
     * @param {Vector} v a vector object from the inital vector
     * @returns {Vector} the inverse of the previus one 
     */
    inverse(){
        return new Vector(-this.x, -this.y);
    }
    /**
     * @version 1.0
     * @param {Vector} v a vector object from the inital vector
     * @returns {Vector} the dotproduct of them
     */
    dprod(v){
        return this.x*v.x+this.y+v.y;
    }
    /**
     * @version 1.0
     * a vector object from the inital vector
     * @param {number} scalar a number to be multiplied by the vector
     * @returns {Vector} the result of the multiplication
     */
    scale(scalar){
        return new Vector(this.x*scalar, this.y*scalar,this.origin);
    }
    /**
     * 
     * @param {number} theta angle in radians
     * @returns {[Vector,Vector]} the two components of the vector projected onto 
     * the tilted line
     */
    project(theta){
        var vx = new Vector(Math.cos(theta)*this.norm()*Math.cos(theta-Math.atan(this.y/this.x)),
        Math.sin(theta)*this.norm()*Math.cos(theta-Math.atan(this.y/this.x)),this.origin);
        var vy = this.sub(vx)
        return [vx,vy]
    }
}
/**
 * @class Vector3
 * @extends Vector
 */
class Vector3{
    /**
     * the Class constructor
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @param {Point3D} origin
     * @property {number} xr
     * @property {number} yr
     */
    yr
    xr
    constructor(x, y, z, origin = new Point3D(0,0,0,new Plan3D([-3,3],t))) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.origin = origin;
        this.xd = this.x * origin.space.i.x
    }
    draw(ctx,unit,centerX,centerY,color="rgba(255,255,255,1)"){
        drawArrow(ctx,centerX,centerY,this.xd,this.yd,1.75,color)
        ctx.closePath();
    }
}
/**
 * @class Point class 
 * @param {number} x
 * @param {number} y
 */
class Point{                                                                              
    /**
     * the Class constructor 
     * @param {number} x
     * @param {number} y
     * a point as a normal coodiates system as (x;y)
     */
    constructor (x,y){
        this.x = x
        this.y = y
    }
    /**
     * @version 1.0
     * @param {Point} p a point object parameter
     * draws a cercle centered on the point's coordinates to represente it
     */
    draw(ctx,unit,CenterX,CenterY,color="rgba(255,255,255,1)"){
        ctx.beginPath()
        ctx.fillStyle= color
        ctx.ellipse(CenterX+this.x*unit,CenterY+this.y*-unit,5,5,0,0,2*Math.PI)
        ctx.fill();
        ctx.closePath()

    }
}
/**
 * @class Point3D
 */
class Point3D{
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @param {Plan3D} space
     * @property {number} xr 
     * @property {number} yr 
     * @property space
     */
    xr
    yr
    space
    constructor(x,y,z,space) {
        this.x = x; this.y = y; this.z = z;this.t = space.a;this.space = space;
        this.xr = x*Math.cos(space.a)-Math.cos(space.a+Math.PI/4)*y;
        this.yr = x*Math.sin(space.a)+z-Math.sin(space.a+Math.PI/4)*y;
    }
    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     * @param {number} unit 
     * @param {number} centerX 
     * @param {number} centerY 
     * @param {string} color 
     */
    draw(ctx,unit,centerX,centerY,color){
        
        ctx.ellipse(centerX+this.xr*unit,centerY+this.yr*-unit,5,5,0,0,2*Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }
    /**
     * 
     * @returns {Vector[]} vectors
     */
    pvectors(){
        var v1 = new Vector(-this.y*Math.cos(this.t+Math.PI/4),-this.y*Math.sin(this.t+Math.PI/4),new Point(this.x*Math.cos(this.t),this.x*Math.sin(this.t)))
        var v3 = new Vector(this.x*Math.cos(this.t),this.x*Math.sin(this.t),new Point(v1.x,v1.y)) 
        var v2 = new Vector(0,this.z,new Point(this.xr,this.yr-this.z))
        return [v1,v2,v3]
    }
    /**
     * 
     * @returns {Vector3} vector
     */
    posV(){
        return new Vector3(this.x,this.y,this.z)
    }
}
/**
 * @class Point class 
 * @param {Function} f 
 * @param {boolean} linear
 */
 class Func{
    /**
     * the Class constructor 
     * @param {Function} f
     * @param {boolean} linear
     * @param {Int16Array} range 
     * @param {number} performance
     * @param {string} color in the form of rgba(r,g,b,transparency)
     * r:a value from 0 to 255
     * g:a value from 0 to 255
     * b:a value from 0 to 255
     * a:a value from 0 to 1
     * a function draw algorithm
     */
    constructor (f,linear,range = [-3,3],performance = 1,color="rgba(255,255,255,1)"){
        this.f = f || function(x,y){return x}
        this.linear = linear
        this.range = range
        this.per = performance 
        this.color = color
        this.c = this.f(0)
        this.a = this.f(2)-this.f(1)
    }
    /**
     * @version 1.0
     * @param {Point} p a point object parameter
     * draws a cercle centered on the point's coordinates to represente it
     * @param {CanvasRenderingContext2D} ctx
     */
    draw(ctx,u,CenterX,CenterY){
        ctx.beginPath()
        ctx.strokeStyle = this.color
        ctx.lineWidth = 4;
        if(this.linear){
            ctx.moveTo(CenterX+this.range[0]*u,CenterY-u*this.f(this.range[0]))
            ctx.lineTo(CenterX+this.range[1]*u,CenterY-u*this.f(this.range[1]))
            
        }else{
            for (let i=this.range[0];i<=this.range[1];i+=1/(this.per*2*u)){
                ctx.moveTo(CenterX+i*u,CenterY-this.f(i)*u)
                ctx.lineTo(CenterX+(i+1/(this.per*u))*u,CenterY-this.f(i+1/(this.per*u))*u)
            }
        }
        ctx.stroke()
        ctx.closePath()
    }
    /**
     * @param {Func} g
     */
    intersection(g){
        var x = (g.c-this.c)/(this.a-g.a) 
        if (this.f(x)==g.f(x))
            return new Point(x,this.f(x))
        else {return new Point(x,g.f(x))}
    }
}
class FuncV {
    /**
     * 
     * @param {Vector} V 
     * @param {Point} P 
     * @param {number[]} xrange
     */
    constructor (V,P,xrange,linear){
        this.V = V
        this.P = P
        this.xrange = xrange
        this.l = linear
    }
    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     * @param {number} unit 
     * @param {string} color 
     * @param {number} centerX
     * @param {number} centerX
     */
    draw(ctx,unit,centerX,centerY,color){
        if (this.l){
            this.#dL(ctx,unit,centerX,centerY,color)
        }
    }
    #dL(ctx,unit,centerX,centerY,color){
        ctx.beginPath()
        ctx.strokeStyle = color
        ctx.lineWidth = 4;
        ctx.moveTo(centerX+this.xrange[0]*this.V.x*unit,centerY+this.xrange[0]*this.V.y*-unit)
        ctx.lineTo(centerX+this.xrange[1]*this.V.x*unit,centerY+this.xrange[1]*this.V.y*-unit)
        ctx.stroke()
    }
    #dQ(ctx,unit,color){}
}
/**
 * @class VectorField
 */
class VectorField{
    /**
    * @param {Int16Array} xrange
    * @param {Int16Array} yrange
    * @param {Function} f1 xfunction for the individual vector
    * @param {Function} f2 yfunction for the individual vector
    * @param {number} cr
    */
    constructor (xrange=[-2,2],yrange=[-2,2],f1,f2,cr=1){
        this.xrange = xrange
        this.yrange = yrange
        this.f1 = f1
        this.f2 = f2
        this.cr = cr
    }
    draw(ctx,unit,centerX,centerY){
        for (let i=this.xrange[0];i<=this.xrange[1];i+=this.cr){
            for (let j=this.yrange[0];j<=this.yrange[1];j+=this.cr){
                var p = new Point(i,j);
                p.draw(ctx,unit,centerX,centerY)
                var V = new Vector(this.f1(i,j),this.f2(i,j),p);
                V = V.scale((this.cr-this.cr/20)/(V.norm()))
                V.draw(ctx,unit,centerX,centerY)
            }
        }
    }   

}
/**
 * @class Transform
 * a transformation class that has all the necessary tools
 * to perform the transformation
 */
class Trans{
    /**
     * @param {Vector} tvect translation vector
     * @param {Point} origin a point 
     */
    translation(tvect,origin) {
        return new Vector(tvect.x,tvect.y,origin)
    } 
    /**
     * 
     * @param {Point} P
     * @param {Vector} V
     * @param {number} k 
     * on considère l'homtétie de centre A et de rapport K
     */
    dialation(P,V,k){
        V.origin = P
        return new Vector(-k*(V.x),-k*(V.y),P)
    }
    
}