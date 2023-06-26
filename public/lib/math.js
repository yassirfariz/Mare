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
        this.xrange = xrange   
        this.a = theta
        this.i = new Vector(Math.cos(this.a),Math.sin(this.a));
        this.j = new Vector(-Math.cos(Math.PI/4+this.a),-Math.sin(Math.PI/4+this.a));
        this.k = new Vector(Math.cos(Math.PI/2),Math.sin(Math.PI/2));
        this.xr = (x,y)=>x * Math.cos(this.a) - Math.cos(this.a + Math.PI / 4) * y;
        this.yr = (x,y,z)=>x * Math.sin(this.a) + z - Math.sin(this.a+Math.PI/4) * y;
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
        drawArrow(ctx,centerX,centerY,centerX+(this.xrange[0]+0.25)*Math.cos(this.a+Math.PI/4)*unit,centerY-(this.xrange[0]+0.25)*Math.sin(this.a+Math.PI/4)*unit,2.5,color)
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
        return this.x*v.x+this.y*v.y;
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
     * @property {number} xd
     * @property {number} yd
     */
    constructor(x, y, z, origin = new Point3D(0,0,0,new Plan3D([-3,3],t))) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.origin = origin;
        this.r = {
            xr : (this.x+this.origin.x)*Math.cos(this.origin.t)-Math.cos(this.origin.t+Math.PI/4)*(this.y+this.origin.y),
            yr : (this.x+this.origin.x)*Math.sin(this.origin.t)+(this.origin.z+this.z)-Math.sin(this.origin.t+Math.PI/4)*(this.y+this.origin.y)
        }
    }
    draw(ctx,unit,centerX,centerY,color="rgba(255,255,255,1)"){
        drawArrow(ctx,centerX+this.origin.xr*unit,centerY+this.origin.yr*-unit,centerX+(this.r.xr)*unit,centerY+this.r.yr*-unit,1.75,color)
        ctx.closePath();
    }
    /**
     * @returns {number} 
     */
    norm(){
        return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
    }
    /**
     * @param {Vector3} other 
     * @returns {Vector3}
     */
    add(other){
        return Vector3(this.x + other.x, this.y + other.y,this.z+other.z,this.origin);
    }
    /**
     * @param {Vector3} other 
     * @returns {Vector3}
     */
    sub(other){
        return Vector3(this.x + other.x, this.y + other.y,this.z+other.z,this.origin);
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
     * @param {string} [color="rgba(255,255,255,1)"] 
     * @param {number} CenterX
     * @param {number} CenterY
     * @param {number} unit
     * @param {CanvasRenderingContext2D} ctx  
     */
    draw(ctx,unit,CenterX,CenterY,color="rgba(255,255,255,1)"){
        ctx.beginPath()
        ctx.fillStyle= color
        ctx.ellipse(CenterX+this.x*unit,CenterY+this.y*-unit,unit/45+1.25,unit/45+1.25,0,0,2*Math.PI)
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
     */
    constructor(x,y,z,space) {
        this.x = x; this.y = y; this.z = z;
        this.t = space.a;
        this.space = space; 
        this.xr = x*Math.cos(this.t)-Math.cos(this.t+Math.PI/4)*y;
        this.yr = x*Math.sin(this.t)+z-Math.sin(this.t+Math.PI/4)*y;   }
    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     * @param {number} unit 
     * @param {number} centerX 
     * @param {number} centerY 
     * @param {string} color 
     */
    draw(ctx,unit,centerX,centerY,color = "rgba(255,255,255)"){
        ctx.beginPath();
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
 * @class trigCercle
 */
class trigCercle{
    /**
     * @param {Point} origin
     * @param {number} r 
     */
    constructor (origin,r){
        this.origin = origin
        this.r = r
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
        ctx.beginPath()
        ctx.strokeStyle = color
        ctx.lineWidth = 3
        ctx.ellipse(centerX+unit*this.origin.x,centerY-unit*this.origin.y,this.r*unit,this.r*unit,0,0,Math.PI*2,false)
        for (let i=0; i<2*Math.PI;i+=Math.PI/6){
            // what i need to do draw a line tangente to the cercle at each (i)
            let xi = this.r*Math.cos(i)
            let dx = 5/unit*Math.cos(i) 
            ctx.moveTo(centerX+unit*(this.origin.x+xi-dx),centerY-unit*((xi-dx)*Math.tan(i)+this.origin.y))
            ctx.lineTo(centerX+unit*(this.origin.x+xi+dx),centerY-unit*((xi+dx)*Math.tan(i)+this.origin.y))
            console.log() 
        }
        ctx.stroke()
        ctx.closePath()
    }
} 
/**
*@class Func3D
*/
class Line3D{
    /**
    * @param {Vector3} v
    * @parma {number[]} Mrange
    * @param {number[]} mrange
    */
    constructor (v,Mrange,mrange){
        this.x0 = v.origin.space.xr(Mrange[0],Mrange[1])
        this.y0 = v.origin.space.yr(Mrange[0],Mrange[1],Mrange[2])
        this.x = v.origin.space.xr(mrange[0],mrange[1])
        this.y = v.origin.space.yr(mrange[0],mrange[1],mrange[2])
        console.log(this.x0,this.y0,this.x,this.y)
    }
    /**
    * @param {CanvasRenderingContext2D} ctx
    
    * @param {number} centerX
    * @param {number} centerY
    * @param {number} u
    * @param {string} color
    */     
    draw(ctx,centerX,centerY,u,color){
        ctx.moveTo(centerX+this.x0*u,centerY+this.y0*-u)
        ctx.lineTo(centerX+this.x*u,centerY+this.y*-u)
        ctx.strokeStyle = color
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.closePath()
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
    constructor (f,linear,range = [-3,3],performance = 1){
        this.f = f || function(x,y){return x}
        this.linear = linear
        this.range = range
        this.per = performance 
        this.c = this.f(0)
        this.a = this.f(2)-this.f(1)
    }
    /**
     * @version 1.0
     * @param {Point} p a point object parameter
     * draws a cercle centered on the point's coordinates to represente it
     * @param {CanvasRenderingContext2D} ctx
     */
    draw(ctx,u,CenterX,CenterY,color="rgba(255,255,255,1)"){
        ctx.beginPath()
        ctx.strokeStyle = color
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
    /**
     * 
     * @param {number} x 
     * @returns {Vector} Vector
     */
    getslopevec(x){
        function slope (f, x, dx) {
            dx = dx || .00000001;
            return (f(x+dx) - f(x)) / dx;
        }
        console.log(x*slope(this.f,x))
        let cv = new Vector(Math.abs(x),Math.abs(x)*slope(this.f,x),new Point(t,this.f(t)))
        return cv.scale(1/cv.norm())
    }
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
    /**
    * @param {Point} p
    * @param {number} s
    */
    Cfollowpoint(p,s){
        p.x += s*this.f1(p.x,p.y)/(60)
        p.y += s*this.f2(p.x,p.y)/(60)
    }
    /**
     * @param {Point} s
     */
    dv(s){
        return new Vector(this.f1(s.x,s.y),this.f2(s.x,s.y),
        s).scale(1/Math.sqrt(this.f1(s.x,s.y)**2+this.f2(s.x,s.y)**2))
    }
    /**
    * @param {CanvasRenderingContext2D} ctx
    * @param {number} x
    * @param {number} y
    * @param {Array} p
    * @param {number} q
    * @param {string} color 
    */
    dp(ctx,x,y,p,q,color){
        ctx.beginPath()
        p.push([x,y])
        ctx.strokeStyle = color
        ctx.lineWidth = 4
        if (p.length > 2) {
            for(let i=1;i<p.length;i+=q){
                ctx.moveTo(centerX+p[i-1][0]*unit,centerY-p[i-1][1]*unit)
                ctx.lineTo(centerX+p[i][0]*unit,centerY-p[i][1]*unit)
            }
        }
        ctx.stroke()
        ctx.closePath()
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
    Matrixee
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