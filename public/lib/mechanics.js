/**
 * @class Constants for mechanics
 * @property {number} g - gravity acc constant
 * @property {number} G - G constant
 * @property {number} pi - C/D constant
 * @property {number} e - euler constant
 */
class Constants{
    static g = 9.81;
    static G = 6.67430e-11;
    static pi = Math.PI;
    static e = Math.E;
}
class Shapes{
    static Cercle = class {
        /**
         * 
         * @param {number} x 
         * @param {number} y 
         * @param {number} r 
         */
        constructor(x,y,r){
            this.x = x
            this.y = y
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
            ctx.lineWidth = 3.5
            ctx.strokeStyle = color 
            ctx.ellipse(centerX+unit*this.x,centerY-unit*this.y,
                        this.r*unit,this.r*unit,0,0,2*Math.PI,false)
            ctx.stroke()
            ctx.closePath()
        }
        /**
         * @returns Point has Center of Gravity
         */
        getCenterG(){
            return new Point(this.x,this.y)
        }
        colBox(){
            return 
        }
        
    }
    static Rect = class Rect {
       /**
         * 
         * @param {number} x 
         * @param {number} y 
         * @param {number} r 
         */
       constructor(x,y,w,h){
        this.x = x
        this.y = y
        this.w = w
        this.h = h

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
        ctx.lineWidth = 3.5
        ctx.fillStyle = color 
        ctx.rect(centerX+unit*(2*this.x-this.w)/2,centerY-unit*(2*this.y+this.h)/2,
                    this.w*unit,this.h*unit)
        ctx.fill()
        ctx.closePath()
    }
    /**
     * @returns Point has Center of Gravity
     */
    getCenterG(){
        return new Point(this.x,this.y)
    }
     
    }
}

/**
 * @class Entity
 */
class Entity{
    /**
     * 
     * @param {Shapes} shape 
     * @param {number} mass 
     */
    constructor(shape,mass){
        this.shape = shape
        this.mass = mass
    }
    draw(ctx,unit,centerX,centerY,color){
        this.shape.draw(ctx,unit,centerX,centerY,color)
    }
    weightF(){
        return new Force(new Vector(0,-1,this.shape.getCenterG()),this.mass*Constants.g)
    }
    /**
     * @param {Entity} en2 
     */
    collides(en2){
        switch (this.shape) {
            case Shapes.Cercle:
                if (en2.shape){

                }
                break;
            case Shapes.Rect:
                break;
            default:
                break;
        }
    }

}

/**
 * @class mechanics as a force-based engine 
 * using newton's laws of motions
 */
class Force{
    /**
     * 
     * @param {Vector} Vector
     * @param {number} scaler 
     */
    constructor(Vector,scaler){
        this.forceV = Vector
        this.intensity = Vector.norm()*scaler
        this.scaled =this.forceV.scale(this.intensity)
    }
    /**
     * 
     * @param {number} da 
     * @returns {Vector[]} vx,vy are the x and y components
     */
    projection(da){
        var vx = new Vector(Math.cos(da)*this.forceV.norm()*Math.cos(da-Math.atan(this.forceV.y/this.forceV.x)),Math.sin(da)*this.forceV.norm()*Math.cos(da-Math.atan(this.forceV.y/this.forceV.x)))
        var vy = this.force.sub(vx)
        return [vx,vy]
    }
    /** 
     * 
     * @param {Entity} ent
     * @param {number} t
     * 
     */
    exercice(ent,t){ 
        ent.shape.x += t * 1/2*this.forceV.x/ent.mass 
        ent.shape.y += t * 1/2*this.forceV.y/ent.mass 
    }
}