/**
 * @class Constants for mechanics
 * @property {number} g - gravity acc constant
 * @property {number} G - G constant
 * @property {number} pi - C/D constant
 * @property {number} e - euler constant
 */
class Constants{
    static g = 9.8;
    static G = 6.67430e-11;
    static pi = Math.PI;
    static e = Math.E;
}/**
 * @class Object 
 */
class obj{
    /**
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} unit
     * @param {object} center has x and y
     * 
     * @param {number} shape 0 rectangle 1 for ellipse
     * @param {JSON} args
     * @param {number} mass in Kg
     */
    object
    mass
    constructor (unit,center,shape,args,mass){
        this.mass = mass
        this.object = {}
        if(shape == 0){
            this.object = {type:0,x:args.x*unit+center.x,y:args.y*-unit+center.y,w:args.w*unit,h:args.h*unit}
        }else {
            this.object = {type:1,x:args.x*unit+center.x,y:args.y*-unit+center.y,rx:args.rx,ry:args.ry}
        }
    }
    /**
     * @function drawobj
     * @param {CanvasRenderingContext2D} ctx 
     * @param {string} color
     */
    drawobj(ctx,color){
        if (this.object.type == 1){
            ctx.beginPath()
            ctx.ellipse(this.object.x,this.object.y,this.object.rx,this.object.ry,0,0,Math.PI*2)
            ctx.fillStyle = color
            ctx.fill()
            ctx.closePath()
        }
        else{
            ctx.beginPath()
            ctx.rect(this.object.x,this.object.y,this.object.w,this.object.h)
            ctx.fillStyle = color
            ctx.fill()
            ctx.closePath()
        }
    }
    /**
     * center of gravity
     */
    CenterG(){
        if (this.object.type == 1){
            return new Point((this.object.x-centerX)/unit,-(this.object.y-centerY)/unit)
        }
        else {
            return new Point((this.object.x+this.object.w/2)/unit,(this.object.y+this.object.h/2)/unit)
        }
    }
    /**
     * @return {number} w in N
     */
    weight = 0
    Weight(){
        this.weight = this.mass*Constants.g
        return this.weight
    }
}
/**
 * @class mechanics as a force-based engine 
 * using newton's laws of motions
 *
 */
class Force{
    /**
     * 
     * @param {Vector} Vector
     * @param {number} scaler 
     */
    constructor(Vector,scaler){
        this.force = Vector
        this.intensity = Vector.norm()*scaler
    }
    /**
     * 
     * @param {number} da 
     * @returns {Vector[]} vx,vy are the x and y components
     */
    projection(da){
        var vx = new Vector(Math.cos(da)*this.force.norm()*Math.cos(da-Math.atan(this.force.y/this.force.x)),Math.sin(da)*this.force.norm()*Math.cos(da-Math.atan(this.force.y/this.force.x)))
        var vy = this.force.sub(vx)
        return [vx,vy]
    }
    /**
     * 
     * @param {obj} object 
     */
    exercice(object){
        this.vx += this.force.x/object.mass
        this.vy += this.force.y/object.mass
        object.object.x += this.vx*this.intensity
        object.object.y -= this.vy*this.intensity
    }
}

