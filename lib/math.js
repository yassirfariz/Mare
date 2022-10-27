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
     */
    draw(ctx,unit,centerX,centerY){
        drawArrow(ctx,centerX+this.origin.x*unit,centerY+this.origin.y*-unit
            ,centerX+this.x*unit+this.origin.x*unit,
            centerY+this.y*-unit+this.origin.y*-unit,1.5,"white");   
    }
    /**
     * @version 1.0
     * @param {Vector} v a vector object parameter
     * @returns {Vector} a result function of the vectors sum
     */
    add(v){
        this.xr = this.x+v.x;
        this.yr = this.y+v.y;
        return new Vector(this.xr, this.yr);
    }
    /**
     * @version 1.0
     * @param {Vector} v a vector object parameter
     * @returns {Vector} a result function of the vectors difference
     */
    sub(v){
        this.xr =this.x- v.x;
        this.yr =this.y- v.y;
        return new Vector(this.xr, this.yr);
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
     * @param {Vector} v a vector object from the inital vector
     * @returns {Vector} the inverse of the previus one 
     */
    inverse(){
        return new Vector(-this.x, -this.y);
    }
    /**
     * @version 1.0
     * a vector object from the inital vector
     * @param {number} scalar a number to be multiplied by the vector
     * @returns {Vector} the result of the multiplication
     * @example new Vector(1,2).scale(2.5) => new Vector(2.5,5)
     */
    scale(scalar){
        return new Vector(this.x*scalar, this.y*scalar,this.origin);
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
     * a function draw algorithm
     */
    constructor (f,linear,range = [-3,3],performance = 1){
        this.f = f || function(x){return x}
        this.linear = linear
        this.range = range
        this.per = performance 
        this.c = this.f(0)
        this.x = Math.floor(Math.random()*5)
        this.y = Math.floor(Math.random()*5)
        this.aa = 2*(this.f(this.x))
        this.ab = this.f(2*this.x)
        this.ba =  this.f(this.x+this.y)
        this.bb = this.f(this.x)+this.f(this.y)
        if(this.aa==this.ab && this.ba==this.bb){this.linear=true}else{this.linear=false}
    }
    /**
     * @version 1.0
     * @param {Point} p a point object parameter
     * draws a cercle centered on the point's coordinates to represente it
     * @param {CanvasRenderingContext2D} ctx
     */
    draw(ctx,u,CenterX,CenterY){
        ctx.beginPath()
        ctx.strokeStyle = "rgba(255,255,255,1)"
        ctx.lineWidth = 3;
        if(this.linear){
            ctx.moveTo(CenterX+this.range[0]*u,CenterY-u*this.f(this.range[0]))
            ctx.lineTo(CenterX+this.range[1]*u,CenterY-u*this.f(this.range[1]))
            
        }else{
            for (let i=this.range[0];i<=this.range[1];i+=1/(this.per*u)){
                ctx.moveTo(CenterX+i*u,CenterY-this.f(i)*u)
                ctx.lineTo(CenterX+(i+1/(this.per*u))*u,CenterY-this.f(i+1/(this.per*u))*u)
            }
        }
        ctx.stroke()
        ctx.closePath()
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
                V = V.scale(this.cr/(V.norm()))
                V.draw(ctx,unit,centerX,centerY)
            }
        }
    }

}
