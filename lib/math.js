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
    constructor(x, y,origin){
        this.x = x;
        this.y = y;
        this.origin = origin || new Point(0,0);
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
            centerY+this.y*-unit+this.origin.y*-unit,1.5,"black");   
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
        return new Vector(this.x*scalar, this.y*scalar);
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
    draw(ctx,unit,centerX,centerY){
        ctx.beginPath()
        ctx.ellipse(centerX+this.x*unit,centerY+this.y*-unit,5,5,0,0,2*Math.PI)
        ctx.fillStyle = "black"
        ctx.fill()
        ctx.fillStyle= "white"
        ctx.closePath()
    }
}
