var canvas = document.getElementById("canvas")
var [ctx,unit,centerX,centerY,t]=initialize(canvas,1.3)
controls()
function r(x,d){
    return Math.round(x*10**d)/10**d
}
var p = []
t=0
var ct = t
/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {Point3D} o
 * @param {number} t 
 * @param {Plan3D} z 
 */
function cs(ctx,o,t,z) {
    ctx.beginPath()
    p.push([o.xr,o.yr,o.x,o.y,o.z])
    ctx.strokeStyle = "blue"
        ctx.lineWidth = 4
        if (p.length > 15) {
            for(let i=1;i<p.length;i+=1){
                ctx.moveTo(centerX+p[i-1][0]*unit,centerY-p[i-1][1]*unit)
                ctx.lineTo(centerX+p[i][0]*unit,centerY-p[i][1]*unit)
            }
        }
        ctx.stroke()
    ctx.closePath()
    if(t!=ct){
        for(let i=0;i<p.length;i+=1){
            var [x,y] = [p[i][2],p[i][3]]  
            p[i][0] = z.xr(x,y);
            p[i][1] = z.yr(x,y,p[i][4]);
        }
        ct=t
    }
}


var a = -10
controls(1,1,0.001)
function animate(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var p = new Plan3D([-5,5],t);
    var o = new Point3D(Math.cos(a),Math.sin(a),a/20,p);
    var txt = new Text_(`P(${r(o.x,2)},${r(o.y,2)},${r(o.z,2)})`,[-6,3],"Consolas",21);
    var txtx = new Text_(`P(cos a, sin a, a)`,[-6,2.5],"Consolas",21);
    var v = new Vector3(-o.y,o.x,1/20,o);
    cs(ctx,o,t,p);
    var Vectors = o.pvectors();
    Vectors[0].draw(ctx,unit,centerX,centerY,"rgba(255,0,255)")
    Vectors[1].draw(ctx,unit,centerX,centerY,"rgba(255,0,255)")
    Vectors[2].draw(ctx,unit,centerX,centerY,"rgba(255,0,255)")
    v.draw(ctx,unit,centerX,centerY)
    p.draw(ctx,unit,centerX,centerY,"rgba(255,255,255)")
    o.draw(ctx,unit,centerX,centerY,"rgba(255,255,255)")
    txt.draw(ctx,unit,centerX,centerY,"rgba(255,120,255,1)")
    txtx.draw(ctx,unit,centerX,centerY,"rgba(255,120,255,1)")
    requestAnimationFrame(animate); 
    a>=Math.PI*15?a=Math.PI*15:a+=0.07
}
animate()