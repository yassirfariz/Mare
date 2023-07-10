/**
 * 
 * @param {HTMLCanvasElement} canvas 
 * @param {number} q 
 * @returns {[CanvasRenderingContext2D,number,number,number,number]}
 */

function initialize(canvas,q = 1.35){
    var ctx = canvas.getContext('2d');
    canvas.height = innerHeight*q;
    canvas.width = innerWidth*q;
    canvas.style = "width:100%;height:100%;"
    var centerX = canvas.width/2;
    var centerY = canvas.height/2;
    var unit = 38*centerX/centerY;
    var t = -4;
    return [ctx,unit,centerX,centerY,t]
}
/**
 * make controling general system variables
 */
function controls(dx=25,dz=5,dt=Math.PI/50){
    window.addEventListener("keydown",(e)=>{
        console.log(e.key)
        if (e.key == "x"){unit+=dz}
        if (e.key == "w"){unit-=dz}
        if (e.key == "d"){centerX-=dx}
        if (e.key == "q"){centerX+=dx}
        if (e.key == "z"){centerY+=dx}
        if (e.key == "s"){centerY-=dx}
        if (e.key == "e" ){t+=dt}
        if (e.key == "a" ){t-=dt}
        if (e.key == "r") {t = 0}
        if (e.key == "Shift"){centerX = canvas.width/2;centerY = canvas.height/2}
        if (e.key == "Control"){unit = 100}
        if (e.key == "Escape"){window.location.href="../../index.html"}
    })
}
class Text_{
    /**
     * 
     * @param {string} content 
     * @param {number[]} pos 
     * @param {string} font
     * @param {number} size
     */
    constructor(content="",pos=[0,0],font="Arial",size=24){
        this.str = content;
        this.pos = pos;
        this.font = font;
        this.size = size;
    }
    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     * @param {number} centerX 
     * @param {number} centerY 
     * @param {string} color 
     */
    draw(ctx,unit,centerX,centerY,color="rgb(255,255,255)"){
        ctx.beginPath()
        ctx.font = `${this.size*unit/60}px ${this.font}`;
        ctx.textAlign = "center";
        ctx.fillStyle = color;
        ctx.fillText(this.str,centerX+unit*this.pos[0],centerY-unit*this.pos[1])
        ctx.closePath()
    }
}